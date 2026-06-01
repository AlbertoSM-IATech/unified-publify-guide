-- Función segura para asignar admin solo al email permitido
CREATE OR REPLACE FUNCTION public.ensure_allowed_admin(_user_id uuid, _email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(_email) <> 'test.publify@gmail.com' THEN
    RETURN false;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN true;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.ensure_allowed_admin(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ensure_allowed_admin(uuid, text) TO service_role;

-- Auditoría y reproducción de versiones de email
ALTER TABLE public.lead_email_versions
ADD COLUMN IF NOT EXISTS author_email text,
ADD COLUMN IF NOT EXISTS reason text,
ADD COLUMN IF NOT EXISTS prompt_text text,
ADD COLUMN IF NOT EXISTS token_values jsonb NOT NULL DEFAULT '{}'::jsonb;

-- Estado de envío del email sugerido en cada lead
ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS email_send_status text NOT NULL DEFAULT 'not_sent',
ADD COLUMN IF NOT EXISTS email_send_error text,
ADD COLUMN IF NOT EXISTS email_sent_at timestamptz,
ADD COLUMN IF NOT EXISTS email_sent_by uuid,
ADD COLUMN IF NOT EXISTS email_sent_version integer;

CREATE INDEX IF NOT EXISTS idx_leads_email_send_status ON public.leads(email_send_status);
CREATE INDEX IF NOT EXISTS idx_lead_email_versions_created_at ON public.lead_email_versions(created_at DESC);