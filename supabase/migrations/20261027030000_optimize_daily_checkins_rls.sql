-- Preserve per-user access while removing duplicate permissive policies.
-- Wrap auth.uid() in SELECT so Postgres can evaluate it once per statement.
-- This migration is reviewed in GitHub first; it is not applied to production by this commit.

BEGIN;

DROP POLICY IF EXISTS "Users can insert their own checkins"
  ON public.daily_checkins;
DROP POLICY IF EXISTS "Users can view their own checkins"
  ON public.daily_checkins;

ALTER POLICY "Users can create their own check-ins"
  ON public.daily_checkins
  TO public
  WITH CHECK ((SELECT auth.uid()) = user_id);

ALTER POLICY "Users can view their own check-ins"
  ON public.daily_checkins
  TO public
  USING ((SELECT auth.uid()) = user_id);

ALTER POLICY "Users can update their own check-ins"
  ON public.daily_checkins
  TO public
  USING ((SELECT auth.uid()) = user_id)
  WITH CHECK ((SELECT auth.uid()) = user_id);

COMMIT;
