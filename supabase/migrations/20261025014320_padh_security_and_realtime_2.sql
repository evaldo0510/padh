-- Explicitly revoke from anon as well
REVOKE EXECUTE ON FUNCTION public.log_security_violation() FROM anon;
REVOKE EXECUTE ON FUNCTION public.audit_policy_check(UUID) FROM anon;


-- NEXT SOURCE MIGRATION

CREATE OR REPLACE FUNCTION public.get_tables_security()
RETURNS TABLE (
    tablename TEXT,
    rowsecurity BOOLEAN,
    policies TEXT[]
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.relname::TEXT as tablename,
        t.relrowsecurity as rowsecurity,
        ARRAY(
            SELECT p.policyname::TEXT 
            FROM pg_policies p 
            WHERE p.tablename = t.relname 
            AND p.schemaname = 'public'
        ) as policies
    FROM pg_class t
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE n.nspname = 'public'
    AND t.relkind = 'r'
    AND t.relname IN ('episode_favorites', 'episode_progress', 'exercise_responses', 'purchases', 'audit_logs');
END;
$$;

-- Secure the function
REVOKE EXECUTE ON FUNCTION public.get_tables_security() FROM public;
REVOKE EXECUTE ON FUNCTION public.get_tables_security() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_tables_security() TO authenticated, service_role;


-- NEXT SOURCE MIGRATION

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    objective TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- NEXT SOURCE MIGRATION

REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO authenticated, service_role;

-- NEXT SOURCE MIGRATION

ALTER FUNCTION public.update_updated_at_column() SECURITY INVOKER;