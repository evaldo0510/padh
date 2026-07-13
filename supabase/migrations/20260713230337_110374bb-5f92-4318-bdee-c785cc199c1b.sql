
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
