-- Rename and change type to array
ALTER TABLE public.profiles 
RENAME COLUMN objective TO objectives;

ALTER TABLE public.profiles 
ALTER COLUMN objectives TYPE text[] USING 
  CASE 
    WHEN objectives IS NULL THEN ARRAY[]::text[]
    ELSE ARRAY[objectives] 
  END;

-- Add check constraint for allowed values in the array
ALTER TABLE public.profiles
ADD CONSTRAINT valid_objectives CHECK (
  objectives <@ ARRAY['ansiedade', 'foco', 'escrita', 'reprogramacao']::text[]
);

-- Ensure it's never null for easier handling in frontend
ALTER TABLE public.profiles
ALTER COLUMN objectives SET DEFAULT ARRAY[]::text[];

UPDATE public.profiles SET objectives = ARRAY[]::text[] WHERE objectives IS NULL;

ALTER TABLE public.profiles
ALTER COLUMN objectives SET NOT NULL;

-- NEXT SOURCE MIGRATION

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


-- NEXT SOURCE MIGRATION

ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS reminder_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS reminder_time TIME DEFAULT '09:00:00';


-- NEXT SOURCE MIGRATION

-- Create PWA Health Metrics table
CREATE TABLE public.pwa_health_events (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL, -- 'install', 'update_found', 'update_activated', 'error', 'offline'
    status TEXT, -- 'success', 'fail'
    version TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    user_id UUID,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.pwa_health_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/authenticated inserts (reporting)
CREATE POLICY "Anyone can report PWA events"
ON public.pwa_health_events
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to view (for the dashboard)
CREATE POLICY "Authenticated users can view PWA events"
ON public.pwa_health_events
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Index for analytics
CREATE INDEX idx_pwa_events_type ON public.pwa_health_events(event_type);
CREATE INDEX idx_pwa_events_created ON public.pwa_health_events(created_at);

-- NEXT SOURCE MIGRATION

-- Tighten pwa_health_events INSERT policy
DROP POLICY IF EXISTS "Anyone can report PWA events" ON public.pwa_health_events;
CREATE POLICY "Anyone can report PWA events"
ON public.pwa_health_events
FOR INSERT
WITH CHECK (COALESCE(user_id, auth.uid()) = auth.uid());

-- Restrict pwa_health_events SELECT policy to owners
DROP POLICY IF EXISTS "Authenticated users can view PWA events" ON public.pwa_health_events;
CREATE POLICY "Users can view their own PWA events"
ON public.pwa_health_events
FOR SELECT
USING (auth.uid() = user_id);

-- Add INSERT policy for audit_logs to support user-side logging (like violation triggers)
DROP POLICY IF EXISTS "Users can insert their own audit logs" ON public.audit_logs;
CREATE POLICY "Users can insert their own audit logs"
ON public.audit_logs
FOR INSERT
WITH CHECK (auth.uid() = user_id);
