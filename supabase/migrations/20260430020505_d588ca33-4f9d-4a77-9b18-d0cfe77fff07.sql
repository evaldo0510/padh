-- Tighten pwa_health_events INSERT policy
DROP POLICY IF EXISTS "Anyone can report PWA events" ON public.pwa_health_events;
CREATE POLICY "Anyone can report PWA events"
ON public.pwa_health_events
FOR INSERT
WITH CHECK (COALESCE(user_id, auth.uid()) = auth.uid());

-- Restrict pwa_health_events SELECT policy to owners
DROP POLICY IF EXISTS "Authenticated users can view PWA events" ON public.pwa_health_events;
CREATE POLICY "Users can view their own PWA events"
ON public.pwa_health_events
FOR SELECT
USING (auth.uid() = user_id);

-- Add INSERT policy for audit_logs to support user-side logging (like violation triggers)
DROP POLICY IF EXISTS "Users can insert their own audit logs" ON public.audit_logs;
CREATE POLICY "Users can insert their own audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);
