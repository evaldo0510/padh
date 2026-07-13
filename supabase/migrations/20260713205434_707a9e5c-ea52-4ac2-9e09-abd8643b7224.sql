GRANT SELECT ON public.web_vitals TO authenticated;

CREATE POLICY "Authenticated users can read web vitals"
  ON public.web_vitals
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);