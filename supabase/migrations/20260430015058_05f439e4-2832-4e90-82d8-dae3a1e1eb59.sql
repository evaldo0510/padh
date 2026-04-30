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