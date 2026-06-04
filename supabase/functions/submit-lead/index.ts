import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Payload = {
  name: string;
  email: string;
  books_range?: string;
  team_range?: string;
  situation_description?: string;
  pain_points?: string[];
  pain_text?: string;
  needs_system?: string;
  impact_without_system?: string[];
  timing?: string;
  next_step_preference?: string;
  configure_first?: string;
  preferred_schedule?: string;
  objections_text?: string;
  main_question_text?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_path?: string;
  client_request_id?: string;
};

function score(p: Payload) {
  const reasons: string[] = [];

  // A - FIT
  const booksMap: Record<string, number> = { "0": 2, "1-9": 8, "10-30": 18, "31-100": 23, "100+": 25 };
  const books = booksMap[p.books_range ?? ""] ?? 0;
  if (books) reasons.push(`Catálogo (${p.books_range}): +${books}`);

  const teamMap: Record<string, number> = { solo: 2, "2-3": 6, "4-10": 9, "10+": 10 };
  const team = teamMap[p.team_range ?? ""] ?? 0;
  if (team) reasons.push(`Equipo (${p.team_range}): +${team}`);

  const aligned = ["centralizar", "roi", "retrabajo", "priorizar", "sops", "escalar"];
  const pains = p.pain_points ?? [];
  const matches = pains.filter((x) => aligned.includes(x)).length;
  let painAlign = 0;
  if (matches >= 2) painAlign = 10;
  else if (matches === 1) painAlign = 6;
  else if (pains.includes("otro")) painAlign = 3;
  if (painAlign) reasons.push(`Dolor alineado ICP: +${painAlign}`);

  // B - INTENT
  const timingMap: Record<string, number> = { ya: 20, "2-4_sem": 15, "1-3_meses": 9, explorando: 3 };
  const timing = timingMap[p.timing ?? ""] ?? 0;
  if (timing) reasons.push(`Timing (${p.timing}): +${timing}`);

  const prefMap: Record<string, number> = { reunion: 20, diagnostico_email: 12, solo_entender: 6 };
  const pref = prefMap[p.next_step_preference ?? ""] ?? 0;
  if (pref) reasons.push(`Preferencia (${p.next_step_preference}): +${pref}`);

  // C - URGENCY
  const needsMap: Record<string, number> = { si_ya: 10, creo_si: 7, confirmar: 4, no: 0 };
  const needs = needsMap[p.needs_system ?? ""] ?? 0;
  if (needs) reasons.push(`Autodiagnóstico: +${needs}`);

  const impactCount = (p.impact_without_system ?? []).length;
  const impact = impactCount >= 2 ? 5 : impactCount === 1 ? 3 : 0;
  if (impact) reasons.push(`Impacto: +${impact}`);

  const fitSub = books + team + painAlign;
  const intentSub = timing + pref;
  const urgencySub = needs + impact;
  const total = Math.min(100, fitSub + intentSub + urgencySub);

  // Stage
  let stage: "high_intent" | "solution_aware" | "problem_aware" | "cold";
  if (total >= 80) stage = "high_intent";
  else if (total >= 60) stage = "solution_aware";
  else if (total >= 40) stage = "problem_aware";
  else stage = "cold";

  // Override: reunión + timing ya/2-4 sem
  if (
    p.next_step_preference === "reunion" &&
    (p.timing === "ya" || p.timing === "2-4_sem") &&
    (stage === "problem_aware" || stage === "cold")
  ) {
    stage = "solution_aware";
    reasons.push("Override: pidió reunión con timing inmediato");
  }

  return {
    breakdown: {
      fit: { books, team, pain_alignment: painAlign, subtotal: fitSub },
      intent: { timing, preference: pref, subtotal: intentSub },
      urgency: { needs_system: needs, impact, subtotal: urgencySub },
      total,
      reasons,
    },
    total,
    stage,
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = (await req.json()) as Payload;

    if (!body.name?.trim() || !body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ error: "Nombre y email válidos son obligatorios" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const s = score(body);

    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        books_range: body.books_range ?? null,
        team_range: body.team_range ?? null,
        situation_description: body.situation_description ?? null,
        pain_points: body.pain_points ?? [],
        pain_text: body.pain_text ?? null,
        needs_system: body.needs_system ?? null,
        impact_without_system: body.impact_without_system ?? [],
        timing: body.timing ?? null,
        next_step_preference: body.next_step_preference ?? null,
        configure_first: body.configure_first ?? null,
        preferred_schedule: body.preferred_schedule ?? null,
        objections_text: body.objections_text ?? null,
        main_question_text: body.main_question_text ?? null,
        utm_source: body.utm_source ?? null,
        utm_medium: body.utm_medium ?? null,
        utm_campaign: body.utm_campaign ?? null,
        landing_path: body.landing_path ?? null,
        lead_score_total: s.total,
        lead_score_breakdown: s.breakdown,
        lead_stage: s.stage,
        ai_status: "pending",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "No se pudo guardar el lead" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fire-and-forget IA analysis
    const analyzeUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/analyze-lead`;
    const analyzePromise = fetch(analyzeUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({ lead_id: lead.id }),
    }).catch((e) => console.error("analyze-lead trigger failed:", e));

    // @ts-ignore - EdgeRuntime is available in Supabase edge functions
    if (typeof EdgeRuntime !== "undefined") EdgeRuntime.waitUntil(analyzePromise);

    return new Response(JSON.stringify({ ok: true, lead_id: lead.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("submit-lead error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
