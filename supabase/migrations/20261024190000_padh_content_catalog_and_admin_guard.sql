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
