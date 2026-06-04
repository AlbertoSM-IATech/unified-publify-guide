
-- 1) Idempotencia en leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS client_request_id uuid;

CREATE UNIQUE INDEX IF NOT EXISTS leads_client_request_id_key
  ON public.leads(client_request_id)
  WHERE client_request_id IS NOT NULL;

-- 2) Historial de notificaciones admin
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  channel text NOT NULL DEFAULT 'email',
  status text NOT NULL DEFAULT 'pending',
  recipient text,
  subject text,
  error_message text,
  attempts integer NOT NULL DEFAULT 0,
  sent_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_notifications_lead_id_idx
  ON public.admin_notifications(lead_id);

GRANT SELECT ON public.admin_notifications TO authenticated;
GRANT ALL ON public.admin_notifications TO service_role;

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view notifications" ON public.admin_notifications;
CREATE POLICY "Admins can view notifications"
  ON public.admin_notifications
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

DROP TRIGGER IF EXISTS admin_notifications_updated_at ON public.admin_notifications;
CREATE TRIGGER admin_notifications_updated_at
  BEFORE UPDATE ON public.admin_notifications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
