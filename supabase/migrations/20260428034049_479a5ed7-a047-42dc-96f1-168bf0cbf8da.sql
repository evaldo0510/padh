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