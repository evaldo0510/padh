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


-- NEXT SOURCE MIGRATION

-- Add note column to daily_checkins
ALTER TABLE public.daily_checkins ADD COLUMN IF NOT EXISTS note TEXT;

-- Ensure RLS is enabled and policies are correct (just in case they weren't fully set up for the new column)
-- Assuming daily_checkins already has RLS enabled.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'daily_checkins' 
        AND policyname = 'Users can view their own checkins'
    ) THEN
        CREATE POLICY "Users can view their own checkins" 
        ON public.daily_checkins FOR SELECT 
        USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'daily_checkins' 
        AND policyname = 'Users can insert their own checkins'
    ) THEN
        CREATE POLICY "Users can insert their own checkins" 
        ON public.daily_checkins FOR INSERT 
        WITH CHECK (auth.uid() = user_id);
    END IF;
END
$$;

-- NEXT SOURCE MIGRATION

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS reminder_message TEXT DEFAULT 'Hora de reconectar consigo mesmo. Vamos praticar?';

-- NEXT SOURCE MIGRATION

-- Tabela para telemetria de Web Vitals
CREATE TABLE public.web_vitals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  metric_name TEXT NOT NULL CHECK (metric_name IN ('LCP','CLS','INP','FCP','TTFB')),
  metric_value DOUBLE PRECISION NOT NULL,
  metric_rating TEXT CHECK (metric_rating IN ('good','needs-improvement','poor')),
  page_url TEXT,
  user_agent TEXT,
  device_type TEXT CHECK (device_type IN ('mobile','tablet','desktop','unknown')),
  session_id TEXT
);

-- Índices para consultas por métrica e período
CREATE INDEX web_vitals_metric_name_idx ON public.web_vitals (metric_name);
CREATE INDEX web_vitals_created_at_idx ON public.web_vitals (created_at DESC);
CREATE INDEX web_vitals_metric_created_idx ON public.web_vitals (metric_name, created_at DESC);

-- GRANTs: qualquer visitante pode inserir; leitura só via service_role.
GRANT INSERT ON public.web_vitals TO anon;
GRANT INSERT ON public.web_vitals TO authenticated;
GRANT ALL ON public.web_vitals TO service_role;

-- RLS
ALTER TABLE public.web_vitals ENABLE ROW LEVEL SECURITY;

-- Permite inserção pública (telemetria) sem expor leitura
CREATE POLICY "Anyone can insert web vitals"
  ON public.web_vitals
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- NEXT SOURCE MIGRATION

DROP POLICY IF EXISTS "Anyone can insert web vitals" ON public.web_vitals;

CREATE POLICY "Anyone can insert validated web vitals"
  ON public.web_vitals
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    metric_value >= 0
    AND metric_value < 600000
    AND length(coalesce(page_url, '')) <= 2048
    AND length(coalesce(user_agent, '')) <= 512
    AND length(coalesce(session_id, '')) <= 128
  );