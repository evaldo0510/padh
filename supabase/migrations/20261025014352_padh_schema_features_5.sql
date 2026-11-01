GRANT SELECT ON public.web_vitals TO authenticated;

CREATE POLICY "Authenticated users can read web vitals"
  ON public.web_vitals
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- NEXT SOURCE MIGRATION

-- Enum de papéis
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Tabela user_roles
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Cada usuário só enxerga os próprios papéis (evita enumeração de admins)
CREATE POLICY "Users can read their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Função security definer para checar papel sem recursão de RLS
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Primeiro admin: Evaldo (fundador do projeto)
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role FROM auth.users
WHERE email = 'evaldo0510@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- NEXT SOURCE MIGRATION

REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM authenticated;

-- NEXT SOURCE MIGRATION

DROP POLICY IF EXISTS "Authenticated users can read web vitals" ON public.web_vitals;
CREATE POLICY "Admins can read web vitals"
ON public.web_vitals
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- NEXT SOURCE MIGRATION


CREATE TABLE public.user_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  stage TEXT,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.user_events TO authenticated;
GRANT ALL ON public.user_events TO service_role;

ALTER TABLE public.user_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own events"
  ON public.user_events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own events"
  ON public.user_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all events"
  ON public.user_events FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_user_events_user_created ON public.user_events (user_id, created_at DESC);
CREATE INDEX idx_user_events_event_created ON public.user_events (event_name, created_at DESC);
CREATE INDEX idx_user_events_stage_created ON public.user_events (stage, created_at DESC) WHERE stage IS NOT NULL;
CREATE INDEX idx_user_events_created ON public.user_events (created_at DESC);
