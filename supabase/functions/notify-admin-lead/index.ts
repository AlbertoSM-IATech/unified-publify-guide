import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_RECIPIENTS = ["test.publify@gmail.com", "albertosm.iatech@gmail.com"];

const STAGE_LABEL: Record<string, string> = {
  high_intent: "High-intent",
  solution_aware: "Solution-aware",
  problem_aware: "Problem-aware",
  cold: "Cold",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  let notificationId: string | null = null;
  let leadId: string | null = null;

  try {
    const { lead_id, notification_id } = (await req.json()) as { lead_id: string; notification_id?: string };
    if (!lead_id) throw new Error("lead_id es obligatorio");
    leadId = lead_id;

    const { data: lead, error: leadErr } = await supabase
      .from("leads")
      .select("*")
      .eq("id", lead_id)
      .single();
    if (leadErr || !lead) throw new Error("Lead no encontrado");

    const recipient = ADMIN_RECIPIENTS[0];
    const stage = STAGE_LABEL[lead.lead_stage] ?? lead.lead_stage ?? "—";
    const subject = `[Publify] Nuevo lead · ${lead.lead_score_total ?? "?"} · ${stage} · ${lead.name}`;

    // Crear (o reutilizar) registro de notificación en estado pending
    if (notification_id) {
      notificationId = notification_id;
      await supabase
        .from("admin_notifications")
        .update({
          status: "pending",
          recipient,
          subject,
          error_message: null,
          attempts: (await supabase.from("admin_notifications").select("attempts").eq("id", notification_id).single()).data?.attempts ?? 0,
        })
        .eq("id", notification_id);
    } else {
      const { data: created, error: createErr } = await supabase
        .from("admin_notifications")
        .insert({
          lead_id,
          channel: "email",
          status: "pending",
          recipient,
          subject,
          attempts: 0,
        })
        .select("id")
        .single();
      if (createErr) throw new Error("No se pudo registrar la notificación: " + createErr.message);
      notificationId = created.id;
    }

    // Incrementar intentos
    const { data: nRow } = await supabase
      .from("admin_notifications")
      .select("attempts")
      .eq("id", notificationId)
      .single();
    await supabase
      .from("admin_notifications")
      .update({ attempts: (nRow?.attempts ?? 0) + 1 })
      .eq("id", notificationId);

    // Datos para la plantilla
    const pains = (lead.pain_points ?? []).join(", ") || "—";
    const impact = (lead.impact_without_system ?? []).join(", ") || "—";
    const adminUrl = `${Deno.env.get("SUPABASE_URL")?.replace(".supabase.co", ".lovable.app") ?? ""}/admin/leads/${lead_id}`;

    const templateData = {
      name: lead.name,
      email: lead.email,
      score: lead.lead_score_total,
      stage,
      booksRange: lead.books_range ?? "—",
      teamRange: lead.team_range ?? "—",
      situation: lead.situation_description ?? "—",
      pains,
      painText: lead.pain_text ?? "—",
      needsSystem: lead.needs_system ?? "—",
      impact,
      timing: lead.timing ?? "—",
      preference: lead.next_step_preference ?? "—",
      schedule: lead.preferred_schedule ?? "—",
      adminUrl,
      createdAt: new Date(lead.created_at).toLocaleString("es-ES"),
    };

    // Invocamos la plantilla transaccional registrada
    const { error: sendErr } = await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "admin-new-lead",
        recipientEmail: recipient,
        idempotencyKey: `admin-new-lead-${lead_id}`,
        templateData,
      },
    });

    if (sendErr) throw new Error(sendErr.message ?? "Error al enviar email");

    await supabase
      .from("admin_notifications")
      .update({ status: "sent", sent_at: new Date().toISOString(), error_message: null })
      .eq("id", notificationId);

    return new Response(JSON.stringify({ ok: true, notification_id: notificationId }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error desconocido";
    console.error("notify-admin-lead error:", msg);
    if (notificationId) {
      await supabase
        .from("admin_notifications")
        .update({ status: "failed", error_message: msg })
        .eq("id", notificationId);
    } else if (leadId) {
      await supabase.from("admin_notifications").insert({
        lead_id: leadId,
        channel: "email",
        status: "failed",
        error_message: msg,
        attempts: 1,
      });
    }
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
