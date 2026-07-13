
CREATE OR REPLACE FUNCTION public.admin_weekly_cohort(
  _since timestamptz,
  _max_day integer DEFAULT 30,
  _stage text DEFAULT NULL
)
RETURNS TABLE (
  week_start date,
  cohort_size integer,
  day_offset integer,
  retained integer,
  retention numeric
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'access denied' USING ERRCODE = '42501';
  END IF;

  IF _max_day < 0 OR _max_day > 90 THEN
    RAISE EXCEPTION 'max_day must be between 0 and 90';
  END IF;

  RETURN QUERY
  WITH base_profiles AS (
    SELECT p.id, p.created_at
    FROM public.profiles p
    WHERE p.created_at >= _since
  ),
  -- filtro opcional por etapa: restringe coorte a quem atingiu a etapa informada
  filtered AS (
    SELECT bp.id, bp.created_at
    FROM base_profiles bp
    WHERE _stage IS NULL
       OR _stage = 'cadastro'
       OR EXISTS (
         SELECT 1 FROM public.user_events e
         WHERE e.user_id = bp.id AND e.stage = _stage
       )
  ),
  cohorts AS (
    SELECT
      (date_trunc('week', f.created_at)::date) AS week_start,
      f.id AS user_id,
      f.created_at
    FROM filtered f
  ),
  offsets AS (
    SELECT generate_series(0, _max_day) AS d
  ),
  -- dias de atividade por usuário (união de eventos e check-ins)
  activity AS (
    SELECT e.user_id, (e.created_at AT TIME ZONE 'UTC')::date AS day
      FROM public.user_events e
      JOIN cohorts c ON c.user_id = e.user_id
    UNION
    SELECT dc.user_id, dc.checkin_date AS day
      FROM public.daily_checkins dc
      JOIN cohorts c ON c.user_id = dc.user_id
  ),
  grid AS (
    SELECT
      c.week_start,
      c.user_id,
      c.created_at,
      o.d AS day_offset,
      ((c.created_at AT TIME ZONE 'UTC')::date + o.d) AS target_day
    FROM cohorts c
    CROSS JOIN offsets o
  ),
  retained_rows AS (
    SELECT
      g.week_start,
      g.day_offset,
      COUNT(DISTINCT g.user_id) FILTER (
        WHERE EXISTS (
          SELECT 1 FROM activity a
          WHERE a.user_id = g.user_id AND a.day = g.target_day
        )
      ) AS retained_count
    FROM grid g
    GROUP BY g.week_start, g.day_offset
  ),
  sizes AS (
    SELECT week_start, COUNT(*)::int AS n
    FROM cohorts
    GROUP BY week_start
  )
  SELECT
    r.week_start,
    s.n AS cohort_size,
    r.day_offset,
    r.retained_count::int AS retained,
    CASE WHEN s.n > 0 THEN ROUND(r.retained_count::numeric / s.n, 4) ELSE NULL END AS retention
  FROM retained_rows r
  JOIN sizes s ON s.week_start = r.week_start
  ORDER BY r.week_start, r.day_offset;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) TO authenticated;
