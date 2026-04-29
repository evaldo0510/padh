-- Create an audit table for security violations
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    event_type TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID,
    payload JSONB,
    severity TEXT DEFAULT 'warning',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit logs - only admins should see this (simulated here with a placeholder)
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- For now, allow viewing by the user themselves if it's their own log
CREATE POLICY "Users can view their own audit logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create a function to log violations
CREATE OR REPLACE FUNCTION public.log_security_violation()
RETURNS TRIGGER AS $$
BEGIN
    -- This is triggered when an UPDATE/DELETE/INSERT doesn't match the auth.uid()
    -- Actually, RLS usually blocks it before triggers, but if we use a BEFORE trigger
    -- we can check if the user is authorized.
    
    IF (auth.uid() IS NOT NULL AND (NEW.user_id != auth.uid() OR (OLD.user_id IS NOT NULL AND OLD.user_id != auth.uid()))) THEN
        INSERT INTO public.audit_logs (user_id, event_type, table_name, record_id, payload, severity)
        VALUES (
            auth.uid(), 
            TG_OP || '_VIOLATION', 
            TG_TABLE_NAME, 
            COALESCE(NEW.id, OLD.id), 
            jsonb_build_object('old_data', to_jsonb(OLD), 'new_data', to_jsonb(NEW)),
            'critical'
        );
        -- Still allow RLS to fail the operation normally, but now we have a log
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add triggers to relevant tables
-- Note: Since RLS happens first, these triggers might only fire if the user HAS access but is doing something suspicious,
-- or if the policy uses a function that allows the trigger to execute. 
-- In most cases, RLS blocks before the row-level trigger fires for unauthorized access.
-- To log BLOCKED attempts, one would need a policy that calls a logging function.

CREATE OR REPLACE FUNCTION public.audit_policy_check(target_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    IF (auth.uid() != target_user_id) THEN
        INSERT INTO public.audit_logs (user_id, event_type, table_name, severity)
        VALUES (auth.uid(), 'RLS_FILTERED_ACCESS', 'unknown', 'info');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update policies to use auditing function for higher visibility (Optional but effective)
-- This is high-impact, so I'll stick to the trigger-based logging for now which is safer.
