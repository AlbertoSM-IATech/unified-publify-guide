CREATE OR REPLACE FUNCTION public.ensure_allowed_admin(_user_id uuid, _email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  allowed_admin_emails constant text[] := ARRAY[
    'test.publify@gmail.com',
    'albertosm.iatech@gmail.com'
  ];
BEGIN
  IF lower(_email) <> ALL (allowed_admin_emails) THEN
    RETURN false;
  END IF;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN true;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  allowed_admin_emails constant text[] := ARRAY[
    'test.publify@gmail.com',
    'albertosm.iatech@gmail.com'
  ];
BEGIN
  IF lower(NEW.email) = ANY (allowed_admin_emails) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;