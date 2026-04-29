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