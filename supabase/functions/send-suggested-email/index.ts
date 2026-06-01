import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
  let leadId: string | null = null;

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const userClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) throw new Error("Sesión no válida");

    const { data: role } = await admin.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
    if (!role) throw new Error("No autorizado");

    const { lead_id, subject, body } = await req.json();
    leadId = lead_id;
    if (!leadId || !subject || !body) throw new Error("lead_id, subject y body son obligatorios");

    const { data: lead, error: leadError } = await admin.from("leads").select("email, ai_email_version").eq("id", leadId).single();
    if (leadError || !lead?.email) throw new Error("Lead no encontrado");

    await admin.from("leads").update({ email_send_status: "sending", email_send_error: null }).eq("id", leadId);

    const errorMessage = "Envío no configurado: falta activar un dominio de email transaccional en Lovable Cloud.";
    await admin.from("leads").update({
      email_send_status: "failed",
      email_send_error: errorMessage,
      email_sent_at: new Date().toISOString(),
      email_sent_by: user.id,
      email_sent_version: Number(String(lead.ai_email_version ?? "").replace("v", "")) || null,
    }).eq("id", leadId);

    return new Response(JSON.stringify({ ok: false, error: errorMessage }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Error al enviar";
    if (leadId) {
      await admin.from("leads").update({ email_send_status: "failed", email_send_error: message }).eq("id", leadId);
    }
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
