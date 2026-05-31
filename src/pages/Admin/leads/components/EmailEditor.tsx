import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Download, Eye, Loader2, Pencil, RefreshCw, Save, History } from "lucide-react";
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
};

interface Props {
  leadId: string;
  leadName: string;
  initialSubject: string;
  initialBody: string;
  initialCta?: string | null;
  initialToneNotes?: string | null;
  onRegenerate: () => Promise<void>;
  regenerating: boolean;
}

export default function EmailEditor({
  leadId,
  leadName,
  initialSubject,
  initialBody,
  initialCta,
  initialToneNotes,
  onRegenerate,
  regenerating,
}: Props) {
  const [mode, setMode] = useState<"preview" | "edit">("preview");
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [versions, setVersions] = useState<Version[]>([]);
  const [saving, setSaving] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    setSubject(initialSubject);
    setBody(initialBody);
  }, [initialSubject, initialBody]);

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

  const copyAll = async () => {
    await navigator.clipboard.writeText(`Asunto: ${subject}\n\n${body}`);
    toast.success("Email copiado");
  };

  const download = () => {
    const safe = leadName.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "lead";
    const content = `Asunto: ${subject}\n\n${body}\n`;
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
      const lastV = versions[0]?.version ?? 0;
      const nextV = lastV + 1;
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("lead_email_versions").insert({
        lead_id: leadId,
        version: nextV,
        subject,
        body,
        cta: initialCta ?? null,
        tone_notes: initialToneNotes ?? null,
        source: "manual",
        created_by: user?.id ?? null,
      });
      if (error) throw error;
      await supabase
        .from("leads")
        .update({
          ai_email_subject: subject,
          ai_email_body: body,
          ai_email_version: `v${nextV}`,
        })
        .eq("id", leadId);
      toast.success(`Guardado como v${nextV}`);
      setMode("preview");
      await loadVersions();
    } catch (e: any) {
      toast.error(e.message ?? "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const restoreVersion = (v: Version) => {
    setSubject(v.subject);
    setBody(v.body);
    setMode("edit");
    toast.info(`v${v.version} cargada en el editor`);
  };

  const currentV = versions[0];
  const dirty = subject !== initialSubject || body !== initialBody;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline">{currentV ? `v${currentV.version}` : "v1"}</Badge>
          {currentV && (
            <span className="text-xs text-muted-foreground">
              {currentV.source === "manual" ? "edición manual" : "IA"} ·{" "}
              {new Date(currentV.created_at).toLocaleString("es-ES")}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button size="sm" variant={mode === "preview" ? "default" : "ghost"} onClick={() => setMode("preview")}>
            <Eye className="h-3.5 w-3.5 mr-1" /> Vista previa
          </Button>
          <Button size="sm" variant={mode === "edit" ? "default" : "ghost"} onClick={() => setMode("edit")}>
            <Pencil className="h-3.5 w-3.5 mr-1" /> Editar
          </Button>
        </div>
      </div>

      {mode === "edit" ? (
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">Asunto</label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Cuerpo</label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={14}
              className="font-sans"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" onClick={saveNewVersion} disabled={saving || !dirty}>
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Guardar nueva versión
            </Button>
            {dirty && <span className="text-xs text-amber-500">Cambios sin guardar</span>}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Asunto</p>
              <button
                onClick={() => copy(subject, "Asunto")}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Copy className="h-3 w-3" /> Copiar
              </button>
            </div>
            <p className="text-sm text-foreground bg-muted/40 rounded p-2">{subject}</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-muted-foreground">Cuerpo</p>
              <button
                onClick={() => copy(body, "Cuerpo")}
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                <Copy className="h-3 w-3" /> Copiar
              </button>
            </div>
            <pre className="text-sm text-foreground bg-muted/40 rounded p-3 whitespace-pre-wrap font-sans">
{body}
            </pre>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
        <Button size="sm" variant="outline" onClick={copyAll}>
          <Copy className="h-3.5 w-3.5 mr-1.5" /> Copiar todo
        </Button>
        <Button size="sm" variant="outline" onClick={download}>
          <Download className="h-3.5 w-3.5 mr-1.5" /> Descargar .txt
        </Button>
        <Button size="sm" variant="outline" onClick={onRegenerate} disabled={regenerating}>
          {regenerating ? (
            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          )}
          Regenerar con IA
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setShowHistory((s) => !s)}>
          <History className="h-3.5 w-3.5 mr-1.5" />
          Historial ({versions.length})
        </Button>
      </div>

      {showHistory && (
        <div className="border border-border rounded-lg p-3 space-y-2">
          {versions.length === 0 && (
            <p className="text-xs text-muted-foreground">Sin versiones guardadas todavía.</p>
          )}
          {versions.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between gap-2 text-xs border-b border-border last:border-0 py-2"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Badge variant="outline">v{v.version}</Badge>
                <span className="text-muted-foreground">
                  {v.source === "manual" ? "manual" : "IA"}
                </span>
                <span className="text-muted-foreground truncate">
                  {new Date(v.created_at).toLocaleString("es-ES")}
                </span>
                <span className="truncate text-foreground hidden sm:inline">— {v.subject}</span>
              </div>
              <Button size="sm" variant="ghost" onClick={() => restoreVersion(v)}>
                Cargar
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
