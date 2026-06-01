import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import EmailEditor from "./components/EmailEditor";

const stageLabel: Record<string, string> = {
  high_intent: "High-intent",
  solution_aware: "Solution-aware",
  problem_aware: "Problem-aware",
  cold: "Cold",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="text-sm uppercase tracking-wide text-muted-foreground mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm text-foreground sm:text-right">{value ?? "—"}</span>
    </div>
  );
}

export default function AdminLeadDetail() {
  const { id } = useParams<{ id: string }>();
  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);

  const load = async () => {
    if (!id) return;
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").eq("id", id).single();
    setLead(data);
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Detalle lead | Publify Admin";
    load();
  }, [id]);

  const retryAi = async (customPrompt?: string) => {
    if (!id) return;
    setRetrying(true);
    try {
      const { error } = await supabase.functions.invoke("analyze-lead", { body: { lead_id: id, custom_prompt: customPrompt } });
      if (error) throw error;
      toast.success("Análisis IA regenerado");
      await load();
    } catch (e: any) {
      toast.error(e.message ?? "Error");
    } finally {
      setRetrying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }
  if (!lead) return <div className="p-8 text-foreground">Lead no encontrado</div>;

  const bd = lead.lead_score_breakdown ?? {};
  const tokenDefaults = {
    nombre: lead.name ?? "",
    producto: lead.configure_first || lead.situation_description || "un libro concreto",
    asin: "",
  };

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/admin/leads" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-foreground">{lead.lead_score_total}</span>
            {lead.lead_stage && (
              <Badge variant="outline">{stageLabel[lead.lead_stage]}</Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid lg:grid-cols-3 gap-5">
        {/* Columna izquierda: respuestas */}
        <div className="lg:col-span-2 space-y-5">
          <Section title="Contacto">
            <Row label="Nombre" value={lead.name} />
            <Row label="Email" value={<a className="text-primary hover:underline" href={`mailto:${lead.email}`}>{lead.email}</a>} />
            <Row label="Recibido" value={new Date(lead.created_at).toLocaleString("es-ES")} />
          </Section>

          <Section title="Perfil editorial">
            <Row label="Catálogo" value={lead.books_range} />
            <Row label="Equipo" value={lead.team_range} />
            <Row label="Situación" value={lead.situation_description} />
          </Section>

          <Section title="Dolor">
            <Row label="Puntos" value={(lead.pain_points ?? []).join(", ") || "—"} />
            <div className="mt-3">
              <p className="text-sm text-muted-foreground mb-1">Texto libre</p>
              <p className="text-sm text-foreground whitespace-pre-wrap">{lead.pain_text ?? "—"}</p>
            </div>
          </Section>

          <Section title="Autodiagnóstico">
            <Row label="¿Necesita sistema?" value={lead.needs_system} />
            <Row label="Impacto" value={(lead.impact_without_system ?? []).join(", ") || "—"} />
          </Section>

          <Section title="Intención">
            <Row label="Timing" value={lead.timing} />
            <Row label="Preferencia" value={lead.next_step_preference} />
            {lead.configure_first && <Row label="Configurar primero" value={lead.configure_first} />}
            {lead.preferred_schedule && <Row label="Horario" value={lead.preferred_schedule} />}
            {lead.objections_text && (
              <div className="mt-3">
                <p className="text-sm text-muted-foreground mb-1">Objeciones</p>
                <p className="text-sm text-foreground whitespace-pre-wrap">{lead.objections_text}</p>
              </div>
            )}
            {lead.main_question_text && (
              <div className="mt-3">
                <p className="text-sm text-muted-foreground mb-1">Duda principal</p>
                <p className="text-sm text-foreground whitespace-pre-wrap">{lead.main_question_text}</p>
              </div>
            )}
          </Section>

          {(lead.utm_source || lead.utm_medium || lead.utm_campaign || lead.landing_path) && (
            <Section title="Tracking">
              <Row label="UTM source" value={lead.utm_source} />
              <Row label="UTM medium" value={lead.utm_medium} />
              <Row label="UTM campaign" value={lead.utm_campaign} />
              <Row label="Landing" value={lead.landing_path} />
            </Section>
          )}
        </div>

        {/* Columna derecha: IA */}
        <div className="space-y-5">
          <Section title="Scoring breakdown">
            <Row label="FIT" value={bd.fit?.subtotal} />
            <Row label="  · Libros" value={bd.fit?.books} />
            <Row label="  · Equipo" value={bd.fit?.team} />
            <Row label="  · Dolor alineado" value={bd.fit?.pain_alignment} />
            <Row label="INTENT" value={bd.intent?.subtotal} />
            <Row label="  · Timing" value={bd.intent?.timing} />
            <Row label="  · Preferencia" value={bd.intent?.preference} />
            <Row label="URGENCY" value={bd.urgency?.subtotal} />
            <Row label="  · Necesita sistema" value={bd.urgency?.needs_system} />
            <Row label="  · Impacto" value={bd.urgency?.impact} />
            <div className="mt-3">
              <p className="text-sm text-muted-foreground mb-1">Razones</p>
              <ul className="text-xs text-foreground space-y-1">
                {(bd.reasons ?? []).map((r: string, i: number) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>
          </Section>

          <Section title="Análisis IA">
            {lead.ai_status === "pending" && (
              <p className="text-sm text-muted-foreground">Generando análisis…</p>
            )}
            {lead.ai_status === "error" && (
              <div>
                <p className="text-sm text-red-600 mb-3">Error: {lead.ai_error}</p>
                <Button size="sm" variant="outline" onClick={() => retryAi()} disabled={retrying}>
                  {retrying ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                  Reintentar
                </Button>
              </div>
            )}
            {lead.ai_status === "done" && (
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Resumen</p>
                  <p className="text-foreground">{lead.ai_summary}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Fricciones</p>
                  <ul className="text-foreground space-y-1">
                    {(lead.ai_frictions ?? []).map((f: string, i: number) => <li key={i}>• {f}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Objeciones probables</p>
                  <ul className="text-foreground space-y-1">
                    {(lead.ai_objections ?? []).map((f: string, i: number) => <li key={i}>• {f}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Oportunidad</p>
                  <p className="text-foreground">{lead.ai_opportunity?.outcome}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Próximos pasos</p>
                  <ul className="text-foreground space-y-1">
                    {(lead.ai_next_steps ?? []).map((f: string, i: number) => <li key={i}>• {f}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Preguntas de venta</p>
                  <ul className="text-foreground space-y-1">
                    {(lead.ai_sales_questions ?? []).map((f: string, i: number) => <li key={i}>• {f}</li>)}
                  </ul>
                </div>
                <Button size="sm" variant="ghost" onClick={() => retryAi()} disabled={retrying} className="mt-2">
                  {retrying ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                  Regenerar
                </Button>
              </div>
            )}
          </Section>

          {lead.ai_status === "done" && (
            <Section title="Email sugerido">
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mb-1">Tipo / CTA</p>
                <p className="text-sm text-foreground">
                  {lead.ai_reply_recommendation_type} · {lead.ai_email_cta}
                </p>
              </div>
              <EmailEditor
                leadId={lead.id}
                leadName={lead.name}
                leadEmail={lead.email}
                initialSubject={lead.ai_email_subject ?? ""}
                initialBody={lead.ai_email_body ?? ""}
                initialCta={lead.ai_email_cta}
                initialToneNotes={lead.ai_email_tone_notes}
                tokenDefaults={tokenDefaults}
                emailSendStatus={lead.email_send_status}
                emailSendError={lead.email_send_error}
                emailSentAt={lead.email_sent_at}
                emailSentVersion={lead.email_sent_version}
                onRegenerate={retryAi}
                regenerating={retrying}
                onLeadUpdated={load}
              />
              {lead.ai_email_tone_notes && (
                <p className="text-xs text-muted-foreground italic mt-3">
                  Tono: {lead.ai_email_tone_notes}
                </p>
              )}
            </Section>
          )}
        </div>
      </div>
    </main>
  );
}
