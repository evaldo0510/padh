CREATE OR REPLACE FUNCTION public.get_tables_security()
RETURNS TABLE (
    tablename TEXT,
    rowsecurity BOOLEAN,
    policies TEXT[]
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
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
$$;

-- Secure the function
REVOKE EXECUTE ON FUNCTION public.get_tables_security() FROM public;
REVOKE EXECUTE ON FUNCTION public.get_tables_security() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_tables_security() TO authenticated, service_role;
