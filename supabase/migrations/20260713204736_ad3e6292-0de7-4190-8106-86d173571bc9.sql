DROP POLICY IF EXISTS "Anyone can insert web vitals" ON public.web_vitals;

CREATE POLICY "Anyone can insert validated web vitals"
  ON public.web_vitals
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    metric_value >= 0
    AND metric_value < 600000
    AND length(coalesce(page_url, '')) <= 2048
    AND length(coalesce(user_agent, '')) <= 512
    AND length(coalesce(session_id, '')) <= 128
  );