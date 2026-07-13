
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
SET search_path = public
AS $$
DECLARE
  v_stages text[] := ARRAY['cadastro','checkin','bloco','etapa','retorno'];
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'access denied' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  WITH base_profiles AS (
    SELECT p.id
    FROM public.profiles p
    WHERE p.created_at >= _since
  ),
  -- filtro opcional: restringe base aos usuários que atingiram a etapa
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
$$;

REVOKE ALL ON FUNCTION public.admin_funnel_matrix(timestamptz, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_funnel_matrix(timestamptz, text) TO authenticated;
