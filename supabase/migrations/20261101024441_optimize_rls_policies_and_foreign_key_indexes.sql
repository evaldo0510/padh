
DO $$
DECLARE p record;
BEGIN
  FOR p IN
    SELECT schemaname, tablename, policyname, qual, with_check
    FROM pg_policies
    WHERE schemaname = 'public'
      AND (coalesce(qual,'') LIKE '%auth.uid()%'
        OR coalesce(with_check,'') LIKE '%auth.uid()%')
  LOOP
    EXECUTE format(
      'ALTER POLICY %I ON %I.%I%s%s',
      p.policyname, p.schemaname, p.tablename,
      CASE WHEN p.qual IS NOT NULL
        THEN format(' USING (%s)', replace(p.qual, 'auth.uid()', '(select auth.uid())'))
        ELSE '' END,
      CASE WHEN p.with_check IS NOT NULL
        THEN format(' WITH CHECK (%s)', replace(p.with_check, 'auth.uid()', '(select auth.uid())'))
        ELSE '' END
    );
  END LOOP;
END $$;

-- Remove only two exact duplicate daily_checkins policies; the surviving policies
-- enforce the same user_id = auth.uid() ownership rule.
DROP POLICY IF EXISTS "Users can insert their own checkins" ON public.daily_checkins;
DROP POLICY IF EXISTS "Users can view their own checkins" ON public.daily_checkins;

-- Consolidate the two equivalent SELECT access paths on user_events without
-- changing the effective rule: owner OR administrator.
DROP POLICY IF EXISTS "Admins can read all events" ON public.user_events;
DROP POLICY IF EXISTS "Users can read their own events" ON public.user_events;
CREATE POLICY "Users and admins can read events"
ON public.user_events
FOR SELECT
TO authenticated
USING (
  (select auth.uid()) = user_id
  OR public.has_role((select auth.uid()), 'admin'::public.app_role)
);

-- Add covering indexes for the five foreign keys reported by the advisor.
CREATE INDEX IF NOT EXISTS padh_agent_runs_requested_by_idx
  ON public.padh_agent_runs (requested_by);
CREATE INDEX IF NOT EXISTS padh_content_created_by_idx
  ON public.padh_content (created_by);
CREATE INDEX IF NOT EXISTS padh_content_updated_by_idx
  ON public.padh_content (updated_by);
CREATE INDEX IF NOT EXISTS padh_courses_created_by_idx
  ON public.padh_courses (created_by);
CREATE INDEX IF NOT EXISTS padh_lesson_progress_lesson_id_idx
  ON public.padh_lesson_progress (lesson_id);
