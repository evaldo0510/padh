-- Analytics administrativos retornam somente métricas agregadas.
-- A autorização é sempre verificada no servidor pelo e-mail administrativo verificado.
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
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF NOT public.is_designated_admin() THEN
    RAISE EXCEPTION 'access denied' USING ERRCODE = '42501';
  END IF;
  IF _since IS NULL OR _max_day IS NULL OR _max_day < 0 OR _max_day > 90 THEN
    RAISE EXCEPTION 'since is required and max_day must be between 0 and 90';
  END IF;

  RETURN QUERY
  WITH current_day AS (
    SELECT (now() AT TIME ZONE 'UTC')::date AS day
  ),
  base_profiles AS (
    SELECT p.user_id, p.created_at
    FROM public.profiles AS p
    WHERE p.created_at >= _since
  ),
  filtered AS (
    SELECT bp.user_id, bp.created_at
    FROM base_profiles AS bp
    WHERE _stage IS NULL
       OR _stage = 'cadastro'
       OR EXISTS (
         SELECT 1
         FROM public.user_events AS e
         WHERE e.user_id = bp.user_id
           AND e.stage = _stage
       )
  ),
  cohorts AS (
    SELECT date_trunc('week', f.created_at AT TIME ZONE 'UTC')::date AS week_start,
           f.user_id,
           f.created_at
    FROM filtered AS f
  ),
  offsets AS (
    SELECT generate_series(0, _max_day) AS day_offset
  ),
  activity AS (
    SELECT e.user_id, (e.created_at AT TIME ZONE 'UTC')::date AS day
    FROM public.user_events AS e
    JOIN cohorts AS c ON c.user_id = e.user_id
    UNION
    SELECT dc.user_id, dc.checkin_date::date AS day
    FROM public.daily_checkins AS dc
    JOIN cohorts AS c ON c.user_id = dc.user_id
  ),
  grid AS (
    SELECT c.week_start,
           c.user_id,
           o.day_offset,
           ((c.created_at AT TIME ZONE 'UTC')::date + o.day_offset)::date AS target_day,
           cd.day AS today
    FROM cohorts AS c
    CROSS JOIN offsets AS o
    CROSS JOIN current_day AS cd
  ),
  retained_rows AS (
    SELECT g.week_start,
           g.day_offset,
           COUNT(DISTINCT g.user_id) FILTER (
             WHERE g.target_day <= g.today
               AND EXISTS (
                 SELECT 1
                 FROM activity AS a
                 WHERE a.user_id = g.user_id
                   AND a.day = g.target_day
               )
           )::integer AS retained_count,
           COUNT(DISTINCT g.user_id) FILTER (
             WHERE g.target_day <= g.today
           )::integer AS eligible_count
    FROM grid AS g
    GROUP BY g.week_start, g.day_offset
  ),
  sizes AS (
    SELECT c.week_start, COUNT(DISTINCT c.user_id)::integer AS cohort_size
    FROM cohorts AS c
    GROUP BY c.week_start
  )
  SELECT r.week_start,
         s.cohort_size,
         r.day_offset,
         r.retained_count,
         CASE WHEN r.eligible_count > 0
              THEN round(r.retained_count::numeric / r.eligible_count, 4)
              ELSE NULL
         END AS retention
  FROM retained_rows AS r
  JOIN sizes AS s ON s.week_start = r.week_start
  ORDER BY r.week_start, r.day_offset;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_funnel_matrix(
  _since timestamptz,
  _stage text DEFAULT NULL
)
RETURNS TABLE (
  stage text,
  stage_order integer,
  users integer,
  conversion_from_prev numeric,
  conversion_from_top numeric
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_stages text[] := ARRAY['cadastro','checkin','bloco','etapa','retorno'];
BEGIN
  IF NOT public.is_designated_admin() THEN
    RAISE EXCEPTION 'access denied' USING ERRCODE = '42501';
  END IF;
  IF _since IS NULL THEN
    RAISE EXCEPTION 'since is required';
  END IF;

  RETURN QUERY
  WITH base_profiles AS (
    SELECT p.user_id
    FROM public.profiles AS p
    WHERE p.created_at >= _since
  ),
  filtered AS (
    SELECT bp.user_id
    FROM base_profiles AS bp
    WHERE _stage IS NULL
       OR _stage = 'cadastro'
       OR EXISTS (
         SELECT 1
         FROM public.user_events AS e
         WHERE e.user_id = bp.user_id
           AND e.stage = _stage
       )
  ),
  activity AS (
    SELECT e.user_id, (e.created_at AT TIME ZONE 'UTC')::date AS day
    FROM public.user_events AS e
    JOIN filtered AS f ON f.user_id = e.user_id
    WHERE e.created_at >= _since
    UNION
    SELECT dc.user_id, dc.checkin_date::date AS day
    FROM public.daily_checkins AS dc
    JOIN filtered AS f ON f.user_id = dc.user_id
    WHERE dc.checkin_date >= (_since AT TIME ZONE 'UTC')::date
  ),
  buckets AS (
    SELECT 'cadastro'::text AS stage, COUNT(*)::integer AS users FROM filtered
    UNION ALL
    SELECT 'checkin', COUNT(DISTINCT e.user_id)::integer
    FROM public.user_events AS e
    JOIN filtered AS f ON f.user_id = e.user_id
    WHERE e.stage = 'checkin' AND e.created_at >= _since
    UNION ALL
    SELECT 'bloco', COUNT(DISTINCT e.user_id)::integer
    FROM public.user_events AS e
    JOIN filtered AS f ON f.user_id = e.user_id
    WHERE e.stage = 'bloco' AND e.created_at >= _since
    UNION ALL
    SELECT 'etapa', COUNT(DISTINCT e.user_id)::integer
    FROM public.user_events AS e
    JOIN filtered AS f ON f.user_id = e.user_id
    WHERE e.stage = 'etapa' AND e.created_at >= _since
    UNION ALL
    SELECT 'retorno', COUNT(*)::integer
    FROM (
      SELECT a.user_id
      FROM activity AS a
      GROUP BY a.user_id
      HAVING COUNT(DISTINCT a.day) >= 2
    ) AS returning_users
  ),
  ordered AS (
    SELECT b.stage,
           array_position(v_stages, b.stage) AS stage_order,
           b.users,
           lag(b.users) OVER (ORDER BY array_position(v_stages, b.stage)) AS prev_users,
           first_value(b.users) OVER (ORDER BY array_position(v_stages, b.stage)) AS top_users
    FROM buckets AS b
  )
  SELECT o.stage,
         o.stage_order,
         o.users,
         CASE WHEN o.prev_users IS NULL OR o.prev_users = 0 THEN NULL
              ELSE round(o.users::numeric / o.prev_users, 4)
         END AS conversion_from_prev,
         CASE WHEN o.top_users IS NULL OR o.top_users = 0 THEN NULL
              ELSE round(o.users::numeric / o.top_users, 4)
         END AS conversion_from_top
  FROM ordered AS o
  ORDER BY o.stage_order;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_funnel_matrix(timestamptz, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_funnel_matrix(timestamptz, text) TO authenticated;

CREATE OR REPLACE FUNCTION public.admin_retention_summary(
  _since timestamptz,
  _stage text DEFAULT NULL
)
RETURNS TABLE (
  cohort_size integer,
  d1 numeric,
  d7 numeric,
  d30 numeric
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF NOT public.is_designated_admin() THEN
    RAISE EXCEPTION 'access denied' USING ERRCODE = '42501';
  END IF;
  IF _since IS NULL THEN
    RAISE EXCEPTION 'since is required';
  END IF;

  RETURN QUERY
  WITH current_day AS (
    SELECT (now() AT TIME ZONE 'UTC')::date AS day
  ),
  base_profiles AS (
    SELECT p.user_id, p.created_at
    FROM public.profiles AS p
    WHERE p.created_at >= _since
  ),
  filtered AS (
    SELECT bp.user_id, bp.created_at
    FROM base_profiles AS bp
    WHERE _stage IS NULL
       OR _stage = 'cadastro'
       OR EXISTS (
         SELECT 1
         FROM public.user_events AS e
         WHERE e.user_id = bp.user_id
           AND e.stage = _stage
       )
  ),
  eligible AS (
    SELECT f.user_id,
           o.day_offset,
           ((f.created_at AT TIME ZONE 'UTC')::date + o.day_offset)::date AS target_day
    FROM filtered AS f
    CROSS JOIN (VALUES (1), (7), (30)) AS o(day_offset)
  ),
  activity AS (
    SELECT e.user_id, (e.created_at AT TIME ZONE 'UTC')::date AS day
    FROM public.user_events AS e
    JOIN filtered AS f ON f.user_id = e.user_id
    UNION
    SELECT dc.user_id, dc.checkin_date::date AS day
    FROM public.daily_checkins AS dc
    JOIN filtered AS f ON f.user_id = dc.user_id
  ),
  cohort_count AS (
    SELECT COUNT(DISTINCT f.user_id)::integer AS total
    FROM filtered AS f
  ),
  retention_counts AS (
    SELECT
      COUNT(DISTINCT e.user_id) FILTER (
        WHERE e.day_offset = 1 AND e.target_day <= cd.day
      )::integer AS d1_eligible,
      COUNT(DISTINCT e.user_id) FILTER (
        WHERE e.day_offset = 1 AND e.target_day <= cd.day
          AND EXISTS (SELECT 1 FROM activity AS a WHERE a.user_id = e.user_id AND a.day = e.target_day)
      )::integer AS d1_retained,
      COUNT(DISTINCT e.user_id) FILTER (
        WHERE e.day_offset = 7 AND e.target_day <= cd.day
      )::integer AS d7_eligible,
      COUNT(DISTINCT e.user_id) FILTER (
        WHERE e.day_offset = 7 AND e.target_day <= cd.day
          AND EXISTS (SELECT 1 FROM activity AS a WHERE a.user_id = e.user_id AND a.day = e.target_day)
      )::integer AS d7_retained,
      COUNT(DISTINCT e.user_id) FILTER (
        WHERE e.day_offset = 30 AND e.target_day <= cd.day
      )::integer AS d30_eligible,
      COUNT(DISTINCT e.user_id) FILTER (
        WHERE e.day_offset = 30 AND e.target_day <= cd.day
          AND EXISTS (SELECT 1 FROM activity AS a WHERE a.user_id = e.user_id AND a.day = e.target_day)
      )::integer AS d30_retained
    FROM eligible AS e
    CROSS JOIN current_day AS cd
  )
  SELECT cc.total,
         CASE WHEN rc.d1_eligible > 0 THEN round(rc.d1_retained::numeric / rc.d1_eligible, 4) ELSE NULL END,
         CASE WHEN rc.d7_eligible > 0 THEN round(rc.d7_retained::numeric / rc.d7_eligible, 4) ELSE NULL END,
         CASE WHEN rc.d30_eligible > 0 THEN round(rc.d30_retained::numeric / rc.d30_eligible, 4) ELSE NULL END
  FROM cohort_count AS cc
  CROSS JOIN retention_counts AS rc;
END;
$$;

REVOKE ALL ON FUNCTION public.admin_retention_summary(timestamptz, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_retention_summary(timestamptz, text) TO authenticated;
