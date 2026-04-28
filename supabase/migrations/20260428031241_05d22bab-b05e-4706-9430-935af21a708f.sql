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