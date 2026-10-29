GRANT INSERT ON public.messages TO anon, authenticated;
CREATE POLICY "Anyone can add messages" ON public.messages FOR INSERT TO anon, authenticated WITH CHECK (length(body) BETWEEN 1 AND 500);