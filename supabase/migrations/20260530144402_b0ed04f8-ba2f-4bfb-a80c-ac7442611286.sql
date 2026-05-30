
-- Enums
CREATE TYPE public.app_role AS ENUM ('admin');
CREATE TYPE public.lead_stage AS ENUM ('high_intent', 'solution_aware', 'problem_aware', 'cold');

-- user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- has_role function (security definer to avoid recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Contacto
  name TEXT NOT NULL,
  email TEXT NOT NULL,

  -- Perfil editorial
  books_range TEXT,
  team_range TEXT,
  situation_description TEXT,

  -- Dolor
  pain_points TEXT[] DEFAULT '{}',
  pain_text TEXT,

  -- Autodiagnóstico
  needs_system TEXT,
  impact_without_system TEXT[] DEFAULT '{}',

  -- Intención
  timing TEXT,
  next_step_preference TEXT,

  -- Branching condicional
  configure_first TEXT,
  preferred_schedule TEXT,
  objections_text TEXT,
  main_question_text TEXT,

  -- Tracking
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_path TEXT,

  -- Scoring
  lead_score_total INT DEFAULT 0,
  lead_score_breakdown JSONB DEFAULT '{}'::jsonb,
  lead_stage public.lead_stage,

  -- IA: análisis
  ai_output JSONB,
  ai_summary TEXT,
  ai_frictions TEXT[],
  ai_objections TEXT[],
  ai_opportunity JSONB,
  ai_next_steps TEXT[],
  ai_sales_questions TEXT[],

  -- IA: email sugerido
  ai_reply_recommendation_type TEXT,
  ai_email_subject TEXT,
  ai_email_body TEXT,
  ai_email_cta TEXT,
  ai_email_tone_notes TEXT,
  ai_email_personalization_snippets JSONB,
  ai_email_version TEXT,
  ai_email_generated_at TIMESTAMPTZ,

  -- Estado análisis
  ai_status TEXT DEFAULT 'pending',
  ai_error TEXT
);

-- No anon, no authenticated direct access - only via service role (edge function) and admins
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all leads"
ON public.leads FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update leads"
ON public.leads FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete leads"
ON public.leads FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Helpful indexes for admin filtering
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_score ON public.leads(lead_score_total DESC);
CREATE INDEX idx_leads_stage ON public.leads(lead_stage);
CREATE INDEX idx_leads_email ON public.leads(email);
