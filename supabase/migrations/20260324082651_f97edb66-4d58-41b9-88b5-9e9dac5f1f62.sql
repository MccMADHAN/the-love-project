
-- Create a public storage bucket for deployed sites
INSERT INTO storage.buckets (id, name, public) VALUES ('deployed-sites', 'deployed-sites', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to read from the bucket (public sites)
CREATE POLICY "Public read access" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'deployed-sites');

-- Allow anyone to upload (no auth required for MVP)
CREATE POLICY "Public insert access" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'deployed-sites');

-- Create a table to track deployments
CREATE TABLE public.deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allow public read
ALTER TABLE public.deployments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read deployments" ON public.deployments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Public insert deployments" ON public.deployments FOR INSERT TO anon, authenticated WITH CHECK (true);
