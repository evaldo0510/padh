
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


-- NEXT SOURCE MIGRATION


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


-- NEXT SOURCE MIGRATION


-- 1) audit_logs: garantir que apenas service_role grave
REVOKE INSERT, UPDATE, DELETE ON public.audit_logs FROM anon, authenticated, PUBLIC;
GRANT ALL ON public.audit_logs TO service_role;

-- Policies explícitas restritivas: negar INSERT/UPDATE/DELETE a authenticated/anon
DROP POLICY IF EXISTS "No client writes to audit logs" ON public.audit_logs;
CREATE POLICY "No client writes to audit logs"
  ON public.audit_logs
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Re-permitir SELECT do próprio usuário (a policy PERMISSIVE existente + a RESTRICTIVE acima
-- ainda permite SELECT porque a RESTRICTIVE só bloqueia writes via WITH CHECK; ajustamos):
DROP POLICY IF EXISTS "No client writes to audit logs" ON public.audit_logs;
CREATE POLICY "No client inserts on audit logs"
  ON public.audit_logs AS RESTRICTIVE FOR INSERT TO anon, authenticated
  WITH CHECK (false);
CREATE POLICY "No client updates on audit logs"
  ON public.audit_logs AS RESTRICTIVE FOR UPDATE TO anon, authenticated
  USING (false) WITH CHECK (false);
CREATE POLICY "No client deletes on audit logs"
  ON public.audit_logs AS RESTRICTIVE FOR DELETE TO anon, authenticated
  USING (false);

-- 2) pwa_health_events: exigir authenticated e user_id = auth.uid()
DROP POLICY IF EXISTS "Anyone can report PWA events" ON public.pwa_health_events;
CREATE POLICY "Authenticated users insert own PWA events"
  ON public.pwa_health_events
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NOT NULL AND user_id = auth.uid());

-- 3) web_vitals: restringir INSERT a authenticated
DROP POLICY IF EXISTS "Anyone can insert validated web vitals" ON public.web_vitals;
CREATE POLICY "Authenticated users insert validated web vitals"
  ON public.web_vitals
  FOR INSERT
  TO authenticated
  WITH CHECK (
    metric_value >= 0
    AND metric_value < 600000
    AND length(COALESCE(page_url, '')) <= 2048
    AND length(COALESCE(user_agent, '')) <= 512
    AND length(COALESCE(session_id, '')) <= 128
  );
REVOKE INSERT ON public.web_vitals FROM anon;

-- 4) SECURITY DEFINER: revogar EXECUTE de anon/public em funções internas
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated; -- usada por RLS via SQL, mas RLS não depende de GRANT; mantemos p/ compatibilidade

REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_security_violation() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.audit_policy_check(uuid) FROM PUBLIC, anon, authenticated;

-- admin_* e get_tables_security: restringir a authenticated (guarda interna cuida do resto)
REVOKE EXECUTE ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.admin_funnel_matrix(timestamptz, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_funnel_matrix(timestamptz, text) TO authenticated;

-- get_tables_security: adicionar guarda has_role e restringir
CREATE OR REPLACE FUNCTION public.get_tables_security()
 RETURNS TABLE(tablename text, rowsecurity boolean, policies text[])
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
    IF NOT public.has_role(auth.uid(), 'admin') THEN
      RAISE EXCEPTION 'access denied' USING ERRCODE = '42501';
    END IF;

    RETURN QUERY
    SELECT 
        t.relname::TEXT as tablename,
        t.relrowsecurity as rowsecurity,
        ARRAY(
            SELECT p.policyname::TEXT 
            FROM pg_policies p 
            WHERE p.tablename = t.relname 
            AND p.schemaname = 'public'
        ) as policies
    FROM pg_class t
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE n.nspname = 'public'
    AND t.relkind = 'r'
    AND t.relname IN ('episode_favorites', 'episode_progress', 'exercise_responses', 'purchases', 'audit_logs');
END;
$function$;

REVOKE EXECUTE ON FUNCTION public.get_tables_security() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_tables_security() TO authenticated;


-- NEXT SOURCE MIGRATION

-- PADH: content catalog, courses, editorial workflow, agent execution audit.
-- Administrative authorization is enforced in PostgreSQL, not only in React routes.

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    _user_id = auth.uid()
    AND lower(COALESCE((SELECT u.email FROM auth.users u WHERE u.id = _user_id), '')) = 'mentefelizterapias@gmail.com'
    AND EXISTS (
      SELECT 1
      FROM public.user_roles ur
      WHERE ur.user_id = _user_id
        AND ur.role = _role
    );
$$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

CREATE OR REPLACE FUNCTION public.is_padh_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin'::public.app_role);
$$;

REVOKE ALL ON FUNCTION public.is_padh_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_padh_admin() TO authenticated;

CREATE TABLE IF NOT EXISTS public.padh_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  body_md text NOT NULL DEFAULT '',
  content_type text NOT NULL CHECK (content_type IN ('article','tool','exercise','lesson','video','resource')),
  author_name text NOT NULL,
  version text NOT NULL DEFAULT '1.0.0',
  access_level text NOT NULL DEFAULT 'members' CHECK (access_level IN ('public','members','paid','admin')),
  editorial_status text NOT NULL DEFAULT 'draft' CHECK (editorial_status IN ('draft','review','approved','published','archived')),
  references_json jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(references_json) = 'array'),
  reviewed_by text,
  reviewed_at timestamptz,
  published_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS padh_content_status_access_idx ON public.padh_content(editorial_status, access_level);
CREATE INDEX IF NOT EXISTS padh_content_updated_idx ON public.padh_content(updated_at DESC);
ALTER TABLE public.padh_content ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.padh_content FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.padh_content TO authenticated;
CREATE POLICY padh_content_read_published ON public.padh_content
  FOR SELECT TO authenticated
  USING (
    editorial_status = 'published'
    AND access_level IN ('public','members')
    OR public.is_padh_admin()
  );
CREATE POLICY padh_content_admin_insert ON public.padh_content
  FOR INSERT TO authenticated WITH CHECK (public.is_padh_admin());
CREATE POLICY padh_content_admin_update ON public.padh_content
  FOR UPDATE TO authenticated USING (public.is_padh_admin()) WITH CHECK (public.is_padh_admin());
CREATE POLICY padh_content_admin_delete ON public.padh_content
  FOR DELETE TO authenticated USING (public.is_padh_admin());

CREATE TABLE IF NOT EXISTS public.padh_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  access_level text NOT NULL DEFAULT 'members' CHECK (access_level IN ('public','members','paid','admin')),
  editorial_status text NOT NULL DEFAULT 'draft' CHECK (editorial_status IN ('draft','review','approved','published','archived')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);
ALTER TABLE public.padh_courses ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.padh_courses FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.padh_courses TO authenticated;
CREATE POLICY padh_courses_read_published ON public.padh_courses
  FOR SELECT TO authenticated
  USING ((editorial_status = 'published' AND access_level IN ('public','members')) OR public.is_padh_admin());
CREATE POLICY padh_courses_admin_insert ON public.padh_courses
  FOR INSERT TO authenticated WITH CHECK (public.is_padh_admin());
CREATE POLICY padh_courses_admin_update ON public.padh_courses
  FOR UPDATE TO authenticated USING (public.is_padh_admin()) WITH CHECK (public.is_padh_admin());
CREATE POLICY padh_courses_admin_delete ON public.padh_courses
  FOR DELETE TO authenticated USING (public.is_padh_admin());

CREATE TABLE IF NOT EXISTS public.padh_lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES public.padh_courses(id) ON DELETE CASCADE,
  slug text NOT NULL,
  title text NOT NULL,
  summary text NOT NULL DEFAULT '',
  video_url text,
  transcript_md text NOT NULL DEFAULT '',
  materials_json jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(materials_json) = 'array'),
  sort_order integer NOT NULL DEFAULT 0,
  duration_seconds integer CHECK (duration_seconds IS NULL OR duration_seconds >= 0),
  editorial_status text NOT NULL DEFAULT 'draft' CHECK (editorial_status IN ('draft','review','approved','published','archived')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(course_id, slug)
);
CREATE INDEX IF NOT EXISTS padh_lessons_course_order_idx ON public.padh_lessons(course_id, sort_order);
ALTER TABLE public.padh_lessons ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.padh_lessons FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.padh_lessons TO authenticated;
CREATE POLICY padh_lessons_read_published ON public.padh_lessons
  FOR SELECT TO authenticated
  USING (
    editorial_status = 'published'
    AND EXISTS (
      SELECT 1 FROM public.padh_courses c
      WHERE c.id = course_id AND c.editorial_status = 'published' AND c.access_level IN ('public','members')
    )
    OR public.is_padh_admin()
  );
CREATE POLICY padh_lessons_admin_insert ON public.padh_lessons
  FOR INSERT TO authenticated WITH CHECK (public.is_padh_admin());
CREATE POLICY padh_lessons_admin_update ON public.padh_lessons
  FOR UPDATE TO authenticated USING (public.is_padh_admin()) WITH CHECK (public.is_padh_admin());
CREATE POLICY padh_lessons_admin_delete ON public.padh_lessons
  FOR DELETE TO authenticated USING (public.is_padh_admin());

CREATE TABLE IF NOT EXISTS public.padh_lesson_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid NOT NULL REFERENCES public.padh_lessons(id) ON DELETE CASCADE,
  completed boolean NOT NULL DEFAULT false,
  last_position_seconds integer NOT NULL DEFAULT 0 CHECK (last_position_seconds >= 0),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);
ALTER TABLE public.padh_lesson_progress ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.padh_lesson_progress FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.padh_lesson_progress TO authenticated;
CREATE POLICY padh_progress_read_own ON public.padh_lesson_progress
  FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_padh_admin());
CREATE POLICY padh_progress_insert_own ON public.padh_lesson_progress
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY padh_progress_update_own ON public.padh_lesson_progress
  FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY padh_progress_delete_own ON public.padh_lesson_progress
  FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS public.padh_agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requested_by uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE SET NULL,
  agent_name text NOT NULL,
  task_type text NOT NULL,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','running','succeeded','failed','cancelled','needs_review')),
  input_summary text NOT NULL DEFAULT '',
  output_summary text NOT NULL DEFAULT '',
  source_refs jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(source_refs) = 'array'),
  usage_units integer NOT NULL DEFAULT 0 CHECK (usage_units >= 0),
  error_code text,
  started_at timestamptz,
  finished_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS padh_agent_runs_created_idx ON public.padh_agent_runs(created_at DESC);
ALTER TABLE public.padh_agent_runs ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.padh_agent_runs FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.padh_agent_runs TO authenticated;
CREATE POLICY padh_agent_runs_read_own_or_admin ON public.padh_agent_runs
  FOR SELECT TO authenticated USING (requested_by = auth.uid() OR public.is_padh_admin());
CREATE POLICY padh_agent_runs_insert_own ON public.padh_agent_runs
  FOR INSERT TO authenticated WITH CHECK (requested_by = auth.uid() AND status = 'queued');
CREATE POLICY padh_agent_runs_admin_update ON public.padh_agent_runs
  FOR UPDATE TO authenticated USING (public.is_padh_admin()) WITH CHECK (public.is_padh_admin());

-- Only a trusted backend/service role should execute agents or write final outputs.
-- This migration records executions; it does not expose API keys or start an agent service.
