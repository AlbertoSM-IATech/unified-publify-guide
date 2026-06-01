CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

REVOKE ALL ON SCHEMA private FROM PUBLIC, anon, authenticated;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION private.has_role(uuid, public.app_role) TO authenticated, service_role;

DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
CREATE POLICY "Admins can view all leads"
ON public.leads FOR SELECT
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
CREATE POLICY "Admins can update leads"
ON public.leads FOR UPDATE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
CREATE POLICY "Admins can delete leads"
ON public.leads FOR DELETE
TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can view all email versions" ON public.lead_email_versions;
CREATE POLICY "Admins can view all email versions"
ON public.lead_email_versions FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can insert email versions" ON public.lead_email_versions;
CREATE POLICY "Admins can insert email versions"
ON public.lead_email_versions FOR INSERT TO authenticated
WITH CHECK (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can update email versions" ON public.lead_email_versions;
CREATE POLICY "Admins can update email versions"
ON public.lead_email_versions FOR UPDATE TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can delete email versions" ON public.lead_email_versions;
CREATE POLICY "Admins can delete email versions"
ON public.lead_email_versions FOR DELETE TO authenticated
USING (private.has_role(auth.uid(), 'admin'));

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;