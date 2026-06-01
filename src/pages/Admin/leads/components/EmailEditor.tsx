import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Copy, Download, Eye, History, Loader2, Mail, Pencil, RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";

type Version = {
  id: string;
  version: number;
  subject: string;
  body: string;
  cta: string | null;
  tone_notes: string | null;
  source: string;
  created_at: string;
  created_by: string | null;
  author_email: string | null;
  reason: string | null;
  prompt_text: string | null;
  token_values: Record<string, string> | null;
};

interface Props {
  leadId: string;
  leadName: string;
  leadEmail: string;
  initialSubject: string;
  initialBody: string;
  initialCta?: string | null;
  initialToneNotes?: string | null;
  tokenDefaults: Record<string, string>;
  emailSendStatus?: string | null;
  emailSendError?: string | null;
  emailSentAt?: string | null;
  emailSentVersion?: number | null;
  onRegenerate: (customPrompt?: string) => Promise<void>;
  regenerating: boolean;
  onLeadUpdated: () => Promise<void>;
}

const applyTokens = (text: string, tokens: Record<string, string>) =>
  text.replace(/\{(nombre|producto|asin)\}/gi, (_, key) => tokens[key.toLowerCase()] ?? "");

export default function EmailEditor({
  leadId,
  leadName,
  leadEmail,
  initialSubject,
  initialBody,
  initialCta,
  initialToneNotes,
  tokenDefaults,
  emailSendStatus,
  emailSendError,
  emailSentAt,
  emailSentVersion,
  onRegenerate,
  regenerating,
  onLeadUpdated,
}: Props) {
  const [mode, setMode] = useState<"preview" | "edit">("preview");
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [tokens, setTokens] = useState(tokenDefaults);
  const [versions, setVersions] = useState<Version[]>([]);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");

  useEffect(() => {
    setSubject(initialSubject);
    setBody(initialBody);
  }, [initialSubject, initialBody]);

  useEffect(() => setTokens(tokenDefaults), [tokenDefaults]);

  const renderedSubject = useMemo(() => applyTokens(subject, tokens), [subject, tokens]);
  const renderedBody = useMemo(() => applyTokens(body, tokens), [body, tokens]);

  const loadVersions = async () => {
    const { data } = await supabase
      .from("lead_email_versions")
      .select("*")
      .eq("lead_id", leadId)
      .order("version", { ascending: false });
    setVersions((data as Version[]) ?? []);
  };

  useEffect(() => {
    loadVersions();
  }, [leadId]);

  const copy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    toast.success(`${label} copiado`);
  };

  const copyAll = async () => copy(`Asunto: ${renderedSubject}\n\n${renderedBody}`, "Email");

  const download = () => {
    const safe = leadName.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "lead";
    const content = `Para: ${leadEmail}\nAsunto: ${renderedSubject}\n\n${renderedBody}\n`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `email_${safe}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveNewVersion = async () => {
    setSaving(true);
    try {
      const nextV = (versions[0]?.version ?? 0) + 1;
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("lead_email_versions").insert({
        lead_id: leadId,
        version: nextV,
        subject,
        body,
        cta: initialCta ?? null,
        tone_notes: initialToneNotes ?? null,
        source: "manual",
        reason: "edición manual",
        token_values: tokens,
        created_by: user?.id ?? null,
        author_email: user?.email ?? null,
      });
      if (error) throw error;
      const { error: updateError } = await supabase
        .from("leads")
        .update({ ai_email_subject: subject, ai_email_body: body, ai_email_version: `v${nextV}` })
        .eq("id", leadId);
      if (updateError) throw updateError;
      toast.success(`Guardado como v${nextV}`);
      setMode("preview");
      await loadVersions();
      await onLeadUpdated();
    } catch (e: any) {
      toast.error(e.message ?? "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const sendEmail = async () => {
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-suggested-email", {
        body: { lead_id: leadId, subject: renderedSubject, body: renderedBody, token_values: tokens },
      });
      if (error) throw error;
      if (data?.ok === false) throw new Error(data.error ?? "No se pudo enviar el email");
      toast.success("Email enviado");
    } catch (e: any) {
      toast.error(e.message ?? "No se pudo enviar el email");
    } finally {
      setSending(false);
      await onLeadUpdated();
    }
  };

  const regenerateWithPrompt = async () => {
    await onRegenerate(customPrompt.trim() || undefined);
    setCustomPrompt("");
    await loadVersions();
  };

  const restoreVersion = (v: Version) => {
    setSubject(v.subject);
    setBody(v.body);
    if (v.token_values) setTokens(v.token_values);
    setMode("edit");
    toast.info(`v${v.version} cargada en el editor`);
  };

  const currentV = versions[0];
  const dirty = subject !== initialSubject || body !== initialBody;
  const statusLabel = emailSendStatus === "sent" ? "Enviado" : emailSendStatus === "failed" ? "Fallido" : "No enviado";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{currentV ? `v${currentV.version}` : "v1"}</Badge>
          <Badge variant={emailSendStatus === "sent" ? "default" : "outline"}>{statusLabel}</Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button size="sm" variant={mode === "preview" ? "default" : "ghost"} onClick={() => setMode("preview")}><Eye className="h-3.5 w-3.5 mr-1" /> Vista previa</Button>
          <Button size="sm" variant={mode === "edit" ? "default" : "ghost"} onClick={() => setMode("edit")}><Pencil className="h-3.5 w-3.5 mr-1" /> Editar</Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-2">
        {(["nombre", "producto", "asin"] as const).map((key) => (
          <div key={key}>
            <label className="text-xs text-muted-foreground">{`{${key}}`}</label>
            <Input value={tokens[key] ?? ""} onChange={(e) => setTokens((t) => ({ ...t, [key]: e.target.value }))} />
          </div>
        ))}
      </div>

      {mode === "edit" ? (
        <div className="space-y-3">
          <div><label className="text-xs text-muted-foreground">Asunto</label><Input value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
          <div><label className="text-xs text-muted-foreground">Cuerpo</label><Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={14} className="font-sans" /></div>
          <Button size="sm" onClick={saveNewVersion} disabled={saving || !dirty}>{saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}Guardar nueva versión</Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">Asunto</p><button onClick={() => copy(renderedSubject, "Asunto")} className="text-xs text-primary hover:underline flex items-center gap-1"><Copy className="h-3 w-3" /> Copiar</button></div>
          <p className="text-sm text-foreground bg-muted/40 rounded p-2">{renderedSubject}</p>
          <div className="flex items-center justify-between"><p className="text-xs text-muted-foreground">Cuerpo</p><button onClick={() => copy(renderedBody, "Cuerpo")} className="text-xs text-primary hover:underline flex items-center gap-1"><Copy className="h-3 w-3" /> Copiar</button></div>
          <pre className="text-sm text-foreground bg-muted/40 rounded p-3 whitespace-pre-wrap font-sans">{renderedBody}</pre>
        </div>
      )}

      <div className="space-y-2 pt-2 border-t border-border">
        <Textarea value={customPrompt} onChange={(e) => setCustomPrompt(e.target.value)} rows={3} placeholder="Prompt personalizado para regenerar este email…" />
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={copyAll}><Copy className="h-3.5 w-3.5 mr-1.5" /> Copiar todo</Button>
          <Button size="sm" variant="outline" onClick={download}><Download className="h-3.5 w-3.5 mr-1.5" /> Descargar .txt</Button>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button size="sm" variant="outline" disabled={sending}><Mail className="h-3.5 w-3.5 mr-1.5" /> Enviar email</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader><AlertDialogTitle>Confirmar envío</AlertDialogTitle><AlertDialogDescription>Se enviará el email sugerido a {leadEmail}. El resultado quedará registrado en la ficha.</AlertDialogDescription></AlertDialogHeader>
              <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={sendEmail}>{sending ? "Enviando…" : "Enviar"}</AlertDialogAction></AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button size="sm" variant="outline" onClick={regenerateWithPrompt} disabled={regenerating}>{regenerating ? <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5 mr-1.5" />}Regenerar con IA</Button>
          <Button size="sm" variant="ghost" onClick={() => setShowHistory((s) => !s)}><History className="h-3.5 w-3.5 mr-1.5" />Auditoría ({versions.length})</Button>
        </div>
      </div>

      {(emailSentAt || emailSendError) && <p className="text-xs text-muted-foreground">Último envío: {emailSentAt ? new Date(emailSentAt).toLocaleString("es-ES") : "—"} · v{emailSentVersion ?? "—"}{emailSendError ? ` · ${emailSendError}` : ""}</p>}

      {showHistory && (
        <div className="border border-border rounded-lg p-3 space-y-2">
          {versions.map((v) => (
            <div key={v.id} className="text-xs border-b border-border last:border-0 py-2 space-y-1">
              <div className="flex items-center justify-between gap-2"><div className="flex items-center gap-2 min-w-0"><Badge variant="outline">v{v.version}</Badge><span className="text-muted-foreground">{v.reason ?? (v.source === "manual" ? "edición manual" : "IA")}</span><span className="text-muted-foreground truncate">{new Date(v.created_at).toLocaleString("es-ES")}</span></div><Button size="sm" variant="ghost" onClick={() => restoreVersion(v)}>Cargar</Button></div>
              <p className="text-muted-foreground">Autor: {v.author_email ?? v.created_by ?? "sistema"}</p>
              {v.prompt_text && <p className="text-muted-foreground">Prompt: {v.prompt_text}</p>}
              <p className="truncate text-foreground">{v.subject}</p>
            </div>
          ))}
          {versions.length === 0 && <p className="text-xs text-muted-foreground">Sin versiones guardadas todavía.</p>}
        </div>
      )}
    </div>
  );
}
