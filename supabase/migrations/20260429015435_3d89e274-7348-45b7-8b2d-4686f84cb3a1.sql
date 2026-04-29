REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated, service_role;