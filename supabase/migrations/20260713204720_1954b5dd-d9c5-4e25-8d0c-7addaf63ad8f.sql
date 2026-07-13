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