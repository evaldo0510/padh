-- Create daily_checkins table
CREATE TABLE IF NOT EXISTS public.daily_checkins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    mood TEXT NOT NULL,
    checkin_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, checkin_date)
);

-- Enable RLS
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own check-ins"
ON public.daily_checkins FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own check-ins"
ON public.daily_checkins FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own check-ins"
ON public.daily_checkins FOR UPDATE
USING (auth.uid() = user_id);

-- Fix security vulnerabilities: Switch SECURITY DEFINER to SECURITY INVOKER
ALTER FUNCTION public.audit_policy_check(uuid) SECURITY INVOKER;
ALTER FUNCTION public.get_tables_security() SECURITY INVOKER;
ALTER FUNCTION public.log_security_violation() SECURITY INVOKER;

-- Revoke execute from public/authenticated if not needed (extra safety)
REVOKE EXECUTE ON FUNCTION public.audit_policy_check(uuid) FROM public, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_tables_security() FROM public, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_security_violation() FROM public, authenticated;
