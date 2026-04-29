-- Revoke public execution of security functions
REVOKE EXECUTE ON FUNCTION public.log_security_violation() FROM public;
REVOKE EXECUTE ON FUNCTION public.log_security_violation() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.audit_policy_check(UUID) FROM public;
REVOKE EXECUTE ON FUNCTION public.audit_policy_check(UUID) FROM authenticated;

-- Ensure they can be executed by the postgres role (owner) and service_role
GRANT EXECUTE ON FUNCTION public.log_security_violation() TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.audit_policy_check(UUID) TO postgres, service_role;
