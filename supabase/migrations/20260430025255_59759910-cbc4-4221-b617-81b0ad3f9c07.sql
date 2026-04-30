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