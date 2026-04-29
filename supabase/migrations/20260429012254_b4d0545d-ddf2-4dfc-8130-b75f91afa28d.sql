-- Explicitly revoke from anon as well
REVOKE EXECUTE ON FUNCTION public.log_security_violation() FROM anon;
REVOKE EXECUTE ON FUNCTION public.audit_policy_check(UUID) FROM anon;
