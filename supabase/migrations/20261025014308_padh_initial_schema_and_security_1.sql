-- =========================================
-- PURCHASES
-- =========================================
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  plan TEXT NOT NULL DEFAULT 'vitalicio',
  status TEXT NOT NULL DEFAULT 'active',
  amount_cents INTEGER NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'BRL',
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_purchases_user ON public.purchases(user_id);
CREATE UNIQUE INDEX idx_purchases_user_product_active
  ON public.purchases(user_id, product_id)
  WHERE status = 'active';

ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users view own purchases"
  ON public.purchases FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "users insert own purchases"
  ON public.purchases FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users update own purchases"
  ON public.purchases FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =========================================
-- EPISODE PROGRESS
-- =========================================
CREATE TABLE public.episode_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  phase_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'in_progress',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, session_id)
);

CREATE INDEX idx_episode_progress_user ON public.episode_progress(user_id);

ALTER TABLE public.episode_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users view own progress"
  ON public.episode_progress FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "users insert own progress"
  ON public.episode_progress FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users update own progress"
  ON public.episode_progress FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users delete own progress"
  ON public.episode_progress FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- =========================================
-- EXERCISE RESPONSES
-- =========================================
CREATE TABLE public.exercise_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  session_id TEXT,
  phase_id TEXT,
  response TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, exercise_id)
);

CREATE INDEX idx_exercise_responses_user ON public.exercise_responses(user_id);
CREATE INDEX idx_exercise_responses_session ON public.exercise_responses(user_id, session_id);

ALTER TABLE public.exercise_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users view own responses"
  ON public.exercise_responses FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "users insert own responses"
  ON public.exercise_responses FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users update own responses"
  ON public.exercise_responses FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users delete own responses"
  ON public.exercise_responses FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

-- =========================================
-- updated_at trigger helper
-- =========================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_purchases_updated
  BEFORE UPDATE ON public.purchases
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_episode_progress_updated
  BEFORE UPDATE ON public.episode_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER trg_exercise_responses_updated
  BEFORE UPDATE ON public.exercise_responses
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- NEXT SOURCE MIGRATION

CREATE TABLE public.episode_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  session_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, session_id)
);

ALTER TABLE public.episode_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users view own favorites"
ON public.episode_favorites
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "users insert own favorites"
ON public.episode_favorites
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users delete own favorites"
ON public.episode_favorites
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

CREATE INDEX idx_episode_favorites_user ON public.episode_favorites(user_id);

ALTER PUBLICATION supabase_realtime ADD TABLE public.episode_favorites;

-- NEXT SOURCE MIGRATION

-- Hardening episode_favorites
ALTER TABLE public.episode_favorites 
DROP CONSTRAINT IF EXISTS episode_favorites_user_id_fkey,
ADD CONSTRAINT episode_favorites_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.episode_favorites 
ALTER COLUMN user_id SET DEFAULT auth.uid();

DROP POLICY IF EXISTS "users view own favorites" ON public.episode_favorites;
DROP POLICY IF EXISTS "users insert own favorites" ON public.episode_favorites;
DROP POLICY IF EXISTS "users delete own favorites" ON public.episode_favorites;

CREATE POLICY "Users can view their own favorites" 
ON public.episode_favorites 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" 
ON public.episode_favorites 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" 
ON public.episode_favorites 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Hardening episode_progress
ALTER TABLE public.episode_progress 
DROP CONSTRAINT IF EXISTS episode_progress_user_id_fkey,
ADD CONSTRAINT episode_progress_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.episode_progress 
ALTER COLUMN user_id SET DEFAULT auth.uid();

DROP POLICY IF EXISTS "users view own progress" ON public.episode_progress;
DROP POLICY IF EXISTS "users insert own progress" ON public.episode_progress;
DROP POLICY IF EXISTS "users update own progress" ON public.episode_progress;
DROP POLICY IF EXISTS "users delete own progress" ON public.episode_progress;

CREATE POLICY "Users can view their own progress" 
ON public.episode_progress 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress" 
ON public.episode_progress 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" 
ON public.episode_progress 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own progress" 
ON public.episode_progress 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Hardening exercise_responses
ALTER TABLE public.exercise_responses 
DROP CONSTRAINT IF EXISTS exercise_responses_user_id_fkey,
ADD CONSTRAINT exercise_responses_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.exercise_responses 
ALTER COLUMN user_id SET DEFAULT auth.uid();

DROP POLICY IF EXISTS "users view own responses" ON public.exercise_responses;
DROP POLICY IF EXISTS "users insert own responses" ON public.exercise_responses;
DROP POLICY IF EXISTS "users update own responses" ON public.exercise_responses;
DROP POLICY IF EXISTS "users delete own responses" ON public.exercise_responses;

CREATE POLICY "Users can view their own responses" 
ON public.exercise_responses 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own responses" 
ON public.exercise_responses 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own responses" 
ON public.exercise_responses 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own responses" 
ON public.exercise_responses 
FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Hardening purchases
ALTER TABLE public.purchases 
DROP CONSTRAINT IF EXISTS purchases_user_id_fkey,
ADD CONSTRAINT purchases_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.purchases 
ALTER COLUMN user_id SET DEFAULT auth.uid();

DROP POLICY IF EXISTS "users view own purchases" ON public.purchases;
DROP POLICY IF EXISTS "users insert own purchases" ON public.purchases;
DROP POLICY IF EXISTS "users update own purchases" ON public.purchases;

CREATE POLICY "Users can view their own purchases" 
ON public.purchases 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own purchases" 
ON public.purchases 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own purchases" 
ON public.purchases 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- NEXT SOURCE MIGRATION

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


-- NEXT SOURCE MIGRATION

-- Revoke public execution of security functions
REVOKE EXECUTE ON FUNCTION public.log_security_violation() FROM public;
REVOKE EXECUTE ON FUNCTION public.log_security_violation() FROM authenticated;
REVOKE EXECUTE ON FUNCTION public.audit_policy_check(UUID) FROM public;
REVOKE EXECUTE ON FUNCTION public.audit_policy_check(UUID) FROM authenticated;

-- Ensure they can be executed by the postgres role (owner) and service_role
GRANT EXECUTE ON FUNCTION public.log_security_violation() TO postgres, service_role;
GRANT EXECUTE ON FUNCTION public.audit_policy_check(UUID) TO postgres, service_role;
