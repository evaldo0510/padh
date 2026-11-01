
CREATE OR REPLACE FUNCTION private.admin_funnel_matrix(_since timestamp with time zone, _stage text DEFAULT NULL::text)
RETURNS TABLE(stage text, stage_order integer, users integer, conversion_from_prev numeric, conversion_from_top numeric)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_stages text[] := ARRAY['cadastro','checkin','bloco','etapa','retorno'];
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'access denied' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  WITH base_profiles AS (
    SELECT p.user_id AS id
    FROM public.profiles p
    WHERE p.created_at >= _since
  ),
  filtered AS (
    SELECT bp.id
    FROM base_profiles bp
    WHERE _stage IS NULL
       OR _stage = 'cadastro'
       OR EXISTS (
         SELECT 1 FROM public.user_events e
         WHERE e.user_id = bp.id AND e.stage = _stage
       )
  ),
  activity AS (
    SELECT e.user_id, (e.created_at AT TIME ZONE 'UTC')::date AS day
      FROM public.user_events e
      JOIN filtered f ON f.id = e.user_id
     WHERE e.created_at >= _since
    UNION
    SELECT dc.user_id, dc.checkin_date AS day
      FROM public.daily_checkins dc
      JOIN filtered f ON f.id = dc.user_id
     WHERE dc.checkin_date >= (_since AT TIME ZONE 'UTC')::date
  ),
  buckets AS (
    SELECT 'cadastro'::text AS stage, COUNT(*)::int AS users FROM filtered
    UNION ALL
    SELECT 'checkin', COUNT(DISTINCT e.user_id)::int
      FROM public.user_events e
      JOIN filtered f ON f.id = e.user_id
     WHERE e.stage = 'checkin' AND e.created_at >= _since
    UNION ALL
    SELECT 'bloco', COUNT(DISTINCT e.user_id)::int
      FROM public.user_events e
      JOIN filtered f ON f.id = e.user_id
     WHERE e.stage = 'bloco' AND e.created_at >= _since
    UNION ALL
    SELECT 'etapa', COUNT(DISTINCT e.user_id)::int
      FROM public.user_events e
      JOIN filtered f ON f.id = e.user_id
     WHERE e.stage = 'etapa' AND e.created_at >= _since
    UNION ALL
    SELECT 'retorno', COUNT(*)::int FROM (
      SELECT a.user_id
        FROM activity a
       GROUP BY a.user_id
      HAVING COUNT(DISTINCT a.day) >= 2
    ) r
  ),
  ordered AS (
    SELECT
      b.stage,
      array_position(v_stages, b.stage) AS stage_order,
      b.users,
      LAG(b.users) OVER (ORDER BY array_position(v_stages, b.stage)) AS prev_users,
      FIRST_VALUE(b.users) OVER (ORDER BY array_position(v_stages, b.stage)) AS top_users
    FROM buckets b
  )
  SELECT
    o.stage,
    o.stage_order,
    o.users,
    CASE
      WHEN o.prev_users IS NULL THEN NULL
      WHEN o.prev_users = 0 THEN NULL
      ELSE ROUND(o.users::numeric / o.prev_users, 4)
    END AS conversion_from_prev,
    CASE
      WHEN o.top_users IS NULL OR o.top_users = 0 THEN NULL
      ELSE ROUND(o.users::numeric / o.top_users, 4)
    END AS conversion_from_top
  FROM ordered o
  ORDER BY o.stage_order;
END;
$function$;

CREATE OR REPLACE FUNCTION private.admin_weekly_cohort(_since timestamp with time zone, _max_day integer DEFAULT 30, _stage text DEFAULT NULL::text)
RETURNS TABLE(week_start date, cohort_size integer, day_offset integer, retained integer, retention numeric)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO ''
AS $function$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'access denied' USING ERRCODE = '42501';
  END IF;

  IF _max_day IS NULL OR _max_day < 0 OR _max_day > 90 THEN
    RAISE EXCEPTION 'max_day must be between 0 and 90' USING ERRCODE = '22023';
  END IF;

  RETURN QUERY
  WITH base_profiles AS (
    SELECT p.user_id AS id, p.created_at
    FROM public.profiles p
    WHERE p.created_at >= _since
  ),
  filtered AS (
    SELECT bp.id, bp.created_at
    FROM base_profiles bp
    WHERE _stage IS NULL
       OR _stage = 'cadastro'
       OR EXISTS (
         SELECT 1
         FROM public.user_events e
         WHERE e.user_id = bp.id
           AND e.stage = _stage
       )
  ),
  cohorts AS (
    SELECT date_trunc('week', f.created_at)::date AS week_start,
           f.id AS user_id,
           f.created_at
    FROM filtered f
  ),
  offsets AS (
    SELECT generate_series(0, _max_day) AS d
  ),
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
    SELECT c.week_start,
           c.user_id,
           c.created_at,
           o.d AS day_offset,
           ((c.created_at AT TIME ZONE 'UTC')::date + o.d) AS target_day
    FROM cohorts c
    CROSS JOIN offsets o
  ),
  retained_rows AS (
    SELECT g.week_start,
           g.day_offset,
           count(DISTINCT g.user_id) FILTER (
             WHERE EXISTS (
               SELECT 1
               FROM activity a
               WHERE a.user_id = g.user_id
                 AND a.day = g.target_day
             )
           ) AS retained_count
    FROM grid g
    GROUP BY g.week_start, g.day_offset
  ),
  sizes AS (
    SELECT week_start, count(*)::integer AS n
    FROM cohorts
    GROUP BY week_start
  )
  SELECT r.week_start,
         s.n AS cohort_size,
         r.day_offset,
         r.retained_count::integer AS retained,
         CASE WHEN s.n > 0
              THEN round(r.retained_count::numeric / s.n, 4)
              ELSE NULL
         END AS retention
  FROM retained_rows r
  JOIN sizes s ON s.week_start = r.week_start
  ORDER BY r.week_start, r.day_offset;
END;
$function$;

-- ON DELETE SET NULL must be compatible with a nullable referencing column.
ALTER TABLE public.padh_agent_runs
  ALTER COLUMN requested_by DROP NOT NULL;
