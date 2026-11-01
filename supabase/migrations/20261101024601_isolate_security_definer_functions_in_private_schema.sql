
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC, anon;
GRANT USAGE ON SCHEMA private TO authenticated;

ALTER FUNCTION public.has_role(uuid, public.app_role) SET SCHEMA private;
ALTER FUNCTION public.is_padh_admin() SET SCHEMA private;
ALTER FUNCTION public.admin_funnel_matrix(timestamptz, text) SET SCHEMA private;
ALTER FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) SET SCHEMA private;
ALTER FUNCTION public.get_tables_security() SET SCHEMA private;

GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION private.is_padh_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION private.admin_funnel_matrix(timestamptz, text) TO authenticated;
GRANT EXECUTE ON FUNCTION private.admin_weekly_cohort(timestamptz, integer, text) TO authenticated;
GRANT EXECUTE ON FUNCTION private.get_tables_security() TO authenticated;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT private.has_role(_user_id, _role);
$$;

CREATE OR REPLACE FUNCTION public.is_padh_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT private.is_padh_admin();
$$;

CREATE OR REPLACE FUNCTION public.admin_funnel_matrix(_since timestamptz, _stage text DEFAULT NULL)
RETURNS TABLE(stage text, stage_order integer, users integer, conversion_from_prev numeric, conversion_from_top numeric)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT * FROM private.admin_funnel_matrix(_since, _stage);
$$;

CREATE OR REPLACE FUNCTION public.admin_weekly_cohort(_since timestamptz, _max_day integer DEFAULT 30, _stage text DEFAULT NULL)
RETURNS TABLE(week_start date, cohort_size integer, day_offset integer, retained integer, retention numeric)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT * FROM private.admin_weekly_cohort(_since, _max_day, _stage);
$$;

CREATE OR REPLACE FUNCTION public.get_tables_security()
RETURNS TABLE(tablename text, rowsecurity boolean, policies text[])
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT * FROM private.get_tables_security();
$$;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_padh_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_funnel_matrix(timestamptz, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_tables_security() TO authenticated;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE ALL ON FUNCTION public.is_padh_admin() FROM anon;
REVOKE ALL ON FUNCTION public.admin_funnel_matrix(timestamptz, text) FROM anon;
REVOKE ALL ON FUNCTION public.admin_weekly_cohort(timestamptz, integer, text) FROM anon;
REVOKE ALL ON FUNCTION public.get_tables_security() FROM anon;
