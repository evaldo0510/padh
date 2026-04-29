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