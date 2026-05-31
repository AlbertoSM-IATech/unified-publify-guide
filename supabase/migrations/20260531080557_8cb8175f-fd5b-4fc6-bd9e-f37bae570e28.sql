-- Email versioning table
CREATE TABLE public.lead_email_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  version integer NOT NULL,
  subject text NOT NULL,
  body text NOT NULL,
  cta text,
  tone_notes text,
  source text NOT NULL DEFAULT 'ai', -- 'ai' | 'manual'
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (lead_id, version)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_email_versions TO authenticated;
GRANT ALL ON public.lead_email_versions TO service_role;

ALTER TABLE public.lead_email_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all email versions"
ON public.lead_email_versions FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert email versions"
ON public.lead_email_versions FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update email versions"
ON public.lead_email_versions FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete email versions"
ON public.lead_email_versions FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_lead_email_versions_lead ON public.lead_email_versions(lead_id, version DESC);

-- Auto-asignar admin a test.publify@gmail.com al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(NEW.email) = 'test.publify@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_admin();

-- Si el usuario ya existe, asignar rol ahora
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users
WHERE lower(email) = 'test.publify@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;