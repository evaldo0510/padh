-- PADH: resolve Supabase Performance Advisor findings without broadening access.
-- This migration is intentionally staged for review; it has NOT been applied to production.

-- Cover the five foreign keys reported without a usable leading index.
CREATE INDEX IF NOT EXISTS idx_padh_agent_runs_requested_by
  ON public.padh_agent_runs (requested_by);
CREATE INDEX IF NOT EXISTS idx_padh_content_created_by
  ON public.padh_content (created_by);
CREATE INDEX IF NOT EXISTS idx_padh_content_updated_by
  ON public.padh_content (updated_by);
CREATE INDEX IF NOT EXISTS idx_padh_courses_created_by
  ON public.padh_courses (created_by);
CREATE INDEX IF NOT EXISTS idx_padh_lesson_progress_lesson_id
  ON public.padh_lesson_progress (lesson_id);

-- Evaluate auth.uid()/admin predicates once per statement instead of once per row.
DO $migration$
DECLARE
  policy_row record;
  rewritten_using text;
  rewritten_check text;
  alter_sql text;
BEGIN
  FOR policy_row IN
    SELECT schemaname, tablename, policyname, cmd, qual, with_check
    FROM pg_policies
    WHERE schemaname = 'public'
      AND (
        position('auth.uid()' in coalesce(qual, '') || coalesce(with_check, '')) > 0
        OR position('is_padh_admin()' in coalesce(qual, '') || coalesce(with_check, '')) > 0
        OR position('has_role(' in coalesce(qual, '') || coalesce(with_check, '')) > 0
      )
  LOOP
    rewritten_using := policy_row.qual;
    rewritten_check := policy_row.with_check;

    IF rewritten_using IS NOT NULL THEN
      rewritten_using := replace(rewritten_using, 'auth.uid()', '(select auth.uid())');
      rewritten_using := replace(rewritten_using, 'is_padh_admin()', '(select public.is_padh_admin())');
      rewritten_using := replace(
        rewritten_using,
        'has_role((select auth.uid()), ''admin''::app_role)',
        '(select public.has_role((select auth.uid()), ''admin''::public.app_role))'
      );
    END IF;

    IF rewritten_check IS NOT NULL THEN
      rewritten_check := replace(rewritten_check, 'auth.uid()', '(select auth.uid())');
      rewritten_check := replace(rewritten_check, 'is_padh_admin()', '(select public.is_padh_admin())');
      rewritten_check := replace(
        rewritten_check,
        'has_role((select auth.uid()), ''admin''::app_role)',
        '(select public.has_role((select auth.uid()), ''admin''::public.app_role))'
      );
    END IF;

    alter_sql := format(
      'ALTER POLICY %I ON %I.%I',
      policy_row.policyname,
      policy_row.schemaname,
      policy_row.tablename
    );

    IF policy_row.cmd IN ('SELECT', 'UPDATE', 'DELETE', 'ALL')
       AND rewritten_using IS NOT NULL THEN
      alter_sql := alter_sql || format(' USING (%s)', rewritten_using);
    END IF;

    IF policy_row.cmd IN ('INSERT', 'UPDATE', 'ALL')
       AND rewritten_check IS NOT NULL THEN
      alter_sql := alter_sql || format(' WITH CHECK (%s)', rewritten_check);
    END IF;

    EXECUTE alter_sql;
  END LOOP;
END
$migration$;

-- Remove only exact duplicate daily_checkins policies; keep the original policy names.
DROP POLICY IF EXISTS "Users can insert their own checkins" ON public.daily_checkins;
DROP POLICY IF EXISTS "Users can view their own checkins" ON public.daily_checkins;

-- Merge the own-events and admin-events SELECT policies without changing the
-- effective authorization rule: own rows OR verified PADH administrator.
ALTER POLICY "Users can read their own events"
  ON public.user_events
  USING (
    (select auth.uid()) = user_id
    OR (select public.is_padh_admin())
  );
DROP POLICY IF EXISTS "Admins can read all events" ON public.user_events;

-- Keep the SECURITY DEFINER boundary: these RPCs intentionally read across
-- per-user RLS boundaries, and enforce the administrator check internally.
-- Put trusted system objects first to reduce search_path shadowing risk.
ALTER FUNCTION public.admin_funnel_matrix(timestamptz, text)
  SET search_path = pg_catalog, public;
ALTER FUNCTION public.admin_weekly_cohort(timestamptz, integer, text)
  SET search_path = pg_catalog, public;
ALTER FUNCTION public.get_tables_security()
  SET search_path = pg_catalog, public;
ALTER FUNCTION public.has_role(uuid, public.app_role)
  SET search_path = pg_catalog, public;
ALTER FUNCTION public.is_padh_admin()
  SET search_path = pg_catalog, public;
