DROP POLICY IF EXISTS "Authenticated users can read web vitals" ON public.web_vitals;
CREATE POLICY "Admins can read web vitals"
ON public.web_vitals
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));