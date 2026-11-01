
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_padh_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_funnel_matrix(timestamptz, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.get_tables_security() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_padh_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_funnel_matrix(timestamptz, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_tables_security() TO authenticated;
