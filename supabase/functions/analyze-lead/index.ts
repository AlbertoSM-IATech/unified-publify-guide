import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `Eres un analista de ventas consultivas para Publify, un sistema de gestión editorial para publishers profesionales de Amazon KDP. Tu trabajo es analizar leads que rellenan un formulario de diagnóstico y devolver un JSON estructurado con análisis, scoring, y un email de respuesta listo para que el fundador (Alberto) lo revise y envíe manualmente.

Reglas del análisis:
- Tono profesional, consultivo, sin promesas mágicas, sin hype, sin emojis.
- Lenguaje: siempre "publisher" / "editorial KDP" (nunca "autor").
- Publify NO es otra herramienta: es un sistema que centraliza el trabajo por libro/serie, da visión clara y reduce retrabajo.
- NO prometer resultados financieros. NO enmarcar como migración compleja: enmarcar como "montar un sistema empezando por un libro/serie".

Reglas del email (campo email_suggestion):
- Idioma: español de España.
- Estructura obligatoria del body:
  1) Línea de contexto hiper-personalizada (catálogo + dolor principal del lead).
  2) Validación del dolor (tiempo perdido / falta de visión / retrabajo) sin dramatizar.
  3) Mini reframe: "no necesitas más herramientas sueltas; necesitas un sistema".
  4) Propuesta de siguiente paso (CTA) según scoring/preferencia.
  5) 1–2 preguntas para que responda si no quiere reunión.
  6) Cierre corto firmado "Un saludo, Alberto".

Regla para elegir recommended_type:
- Si stage = high_intent O (prefiere reunión + timing ya/2-4 semanas) → invite_private_demo
- Si menciona explícitamente "configurar/ordenar un libro" o eligió "un_libro" en configure_first → invite_first_book_setup
- Si score < 60 y respuestas vagas → ask_more_context
- Si timing = solo explorando → nurture_soft`;

const TOOL_SCHEMA = {
  type: "function",
  function: {
    name: "analyze_lead",
    description: "Analiza el lead y devuelve scoring, insights y email sugerido.",
    parameters: {
      type: "object",
      properties: {
        summary: { type: "string", description: "Resumen del perfil y situación en 2-4 líneas." },
        stage: { type: "string", enum: ["High-intent", "Solution-aware", "Problem-aware", "Cold"] },
        frictions: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 5 },
        objections_probable: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 6 },
        opportunity: {
          type: "object",
          properties: {
            outcome: { type: "string" },
            why_publify: { type: "array", items: { type: "string" } },
          },
          required: ["outcome", "why_publify"],
          additionalProperties: false,
        },
        next_steps: { type: "array", items: { type: "string" }, minItems: 2, maxItems: 5 },
        sales_questions: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 3 },
        email_suggestion: {
          type: "object",
          properties: {
            recommended_type: {
              type: "string",
              enum: ["invite_private_demo", "invite_first_book_setup", "ask_more_context", "nurture_soft"],
            },
            subject: { type: "string" },
            body: { type: "string" },
            cta: { type: "string", enum: ["book_demo", "first_book_setup", "reply_with_frictions"] },
            tone_notes: { type: "string" },
            personalization_snippets: {
              type: "object",
              properties: {
                pain: { type: "string" },
                context_line: { type: "string" },
                desired_outcome: { type: "string" },
              },
              required: ["pain", "context_line", "desired_outcome"],
              additionalProperties: false,
            },
          },
          required: ["recommended_type", "subject", "body", "cta", "tone_notes", "personalization_snippets"],
          additionalProperties: false,
        },
      },
      required: [
        "summary",
        "stage",
        "frictions",
        "objections_probable",
        "opportunity",
        "next_steps",
        "sales_questions",
        "email_suggestion",
      ],
      additionalProperties: false,
    },
  },
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let leadId: string | null = null;
  try {
    const { lead_id } = await req.json();
    leadId = lead_id;
    if (!leadId) throw new Error("lead_id requerido");

    const { data: lead, error: fetchErr } = await supabase.from("leads").select("*").eq("id", leadId).single();
    if (fetchErr || !lead) throw new Error("Lead no encontrado");

    const userPayload = {
      contacto: { nombre: lead.name, email: lead.email },
      perfil: {
        libros: lead.books_range,
        equipo: lead.team_range,
        situacion: lead.situation_description,
      },
      dolor: { puntos: lead.pain_points, texto: lead.pain_text },
      autodiagnostico: { necesita_sistema: lead.needs_system, impacto: lead.impact_without_system },
      intencion: { timing: lead.timing, preferencia: lead.next_step_preference },
      branching: {
        configurar_primero: lead.configure_first,
        horario: lead.preferred_schedule,
        objeciones: lead.objections_text,
        pregunta_principal: lead.main_question_text,
      },
      scoring: {
        total: lead.lead_score_total,
        stage: lead.lead_stage,
        breakdown: lead.lead_score_breakdown,
      },
    };

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          {
            role: "user",
            content: `Analiza este lead y rellena la herramienta analyze_lead con los datos:\n\n${JSON.stringify(userPayload, null, 2)}`,
          },
        ],
        tools: [TOOL_SCHEMA],
        tool_choice: { type: "function", function: { name: "analyze_lead" } },
      }),
    });

    if (!aiRes.ok) {
      const t = await aiRes.text();
      throw new Error(`AI Gateway ${aiRes.status}: ${t}`);
    }

    const aiData = await aiRes.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) throw new Error("Sin tool_call en respuesta IA");

    const parsed = JSON.parse(toolCall.function.arguments);
    const email = parsed.email_suggestion;

    // Calcula próxima versión
    const { data: lastVer } = await supabase
      .from("lead_email_versions")
      .select("version")
      .eq("lead_id", leadId)
      .order("version", { ascending: false })
      .limit(1)
      .maybeSingle();
    const nextVersion = (lastVer?.version ?? 0) + 1;

    await supabase.from("lead_email_versions").insert({
      lead_id: leadId,
      version: nextVersion,
      subject: email.subject,
      body: email.body,
      cta: email.cta,
      tone_notes: email.tone_notes,
      source: "ai",
    });

    await supabase
      .from("leads")
      .update({
        ai_output: parsed,
        ai_summary: parsed.summary,
        ai_frictions: parsed.frictions,
        ai_objections: parsed.objections_probable,
        ai_opportunity: parsed.opportunity,
        ai_next_steps: parsed.next_steps,
        ai_sales_questions: parsed.sales_questions,
        ai_reply_recommendation_type: email.recommended_type,
        ai_email_subject: email.subject,
        ai_email_body: email.body,
        ai_email_cta: email.cta,
        ai_email_tone_notes: email.tone_notes,
        ai_email_personalization_snippets: email.personalization_snippets,
        ai_email_version: `v${nextVersion}`,
        ai_email_generated_at: new Date().toISOString(),
        ai_status: "done",
        ai_error: null,
      })
      .eq("id", leadId);

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-lead error:", e);
    if (leadId) {
      await supabase
        .from("leads")
        .update({ ai_status: "error", ai_error: e instanceof Error ? e.message : String(e) })
        .eq("id", leadId);
    }
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
