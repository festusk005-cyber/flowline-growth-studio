CREATE TABLE public.project_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  phone text CHECK (char_length(phone) <= 40),
  organization text CHECK (char_length(organization) <= 150),
  business_type text NOT NULL CHECK (char_length(business_type) <= 50),
  needs text[] NOT NULL DEFAULT '{}',
  message text CHECK (char_length(message) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.project_inquiries TO anon, authenticated;
GRANT ALL ON public.project_inquiries TO service_role;
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an inquiry" ON public.project_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);