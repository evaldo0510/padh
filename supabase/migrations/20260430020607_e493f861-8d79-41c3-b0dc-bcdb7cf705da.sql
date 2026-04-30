-- Tighten purchases table: users should only be able to SELECT their own purchases
DROP POLICY IF EXISTS "Users can insert their own purchases" ON public.purchases;
DROP POLICY IF EXISTS "Users can update their own purchases" ON public.purchases;

-- Tighten audit_logs: users should not be able to INSERT directly via API
DROP POLICY IF EXISTS "Users can insert their own audit logs" ON public.audit_logs;

-- Enhance trigger function for security violation logging
-- SECURITY DEFINER allows it to insert into audit_logs regardless of user permissions
-- search_path prevents potential attacks via schemas
CREATE OR REPLACE FUNCTION public.log_security_violation()
RETURNS TRIGGER AS $$
BEGIN
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
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
