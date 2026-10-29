CREATE TABLE public.messages (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), body text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
GRANT SELECT ON public.messages TO anon, authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON public.messages FOR SELECT TO anon, authenticated USING (true);
INSERT INTO public.messages (body) VALUES ('Hello from the database.');