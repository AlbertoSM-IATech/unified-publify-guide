ALTER TABLE public.waitlist_signups
  ADD COLUMN IF NOT EXISTS consent_accepted boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_accepted_at timestamptz,
  ADD COLUMN IF NOT EXISTS consent_version text;