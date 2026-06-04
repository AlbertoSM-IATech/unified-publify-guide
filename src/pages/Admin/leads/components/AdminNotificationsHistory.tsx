import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Send } from "lucide-react";
import { toast } from "sonner";

type Notification = {
  id: string;
  channel: string;
  status: "pending" | "sent" | "failed" | string;
  recipient: string | null;
  subject: string | null;
  error_message: string | null;
  attempts: number;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
};

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  sent: "default",
  pending: "secondary",
  failed: "destructive",
};

const statusLabel: Record<string, string> = {
  sent: "Enviado",
  pending: "Pendiente",
  failed: "Fallido",
};

export default function AdminNotificationsHistory({ leadId }: { leadId: string }) {
  const [items, setItems] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("admin_notifications")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false });
    if (error) toast.error("No se pudo cargar el historial");
    setItems((data as Notification[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [leadId]);

  const retry = async () => {
    setRetrying(true);
    try {
      const { error } = await supabase.functions.invoke("notify-admin-lead", {
        body: { lead_id: leadId },
      });
      if (error) throw error;
      toast.success("Notificación reintentada");
      await load();
    } catch (e: any) {
      toast.error(e.message ?? "Error al reintentar");
    } finally {
      setRetrying(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted-foreground">
          {items.length} {items.length === 1 ? "intento" : "intentos"}
        </p>
        <Button size="sm" variant="outline" onClick={retry} disabled={retrying}>
          {retrying ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Send className="h-4 w-4 mr-2" />
          )}
          Enviar ahora
        </Button>
      </div>

      {loading ? (
        <div className="py-4 flex justify-center">
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Sin notificaciones todavía.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((n) => (
            <li
              key={n.id}
              className="border border-border rounded-lg p-3 text-sm"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <Badge variant={statusVariant[n.status] ?? "outline"}>
                    {statusLabel[n.status] ?? n.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground uppercase">
                    {n.channel}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  intentos: {n.attempts}
                </span>
              </div>
              {n.recipient && (
                <p className="text-xs text-muted-foreground">A: {n.recipient}</p>
              )}
              {n.subject && (
                <p className="text-foreground truncate">{n.subject}</p>
              )}
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>Creado: {new Date(n.created_at).toLocaleString("es-ES")}</div>
                <div>
                  {n.sent_at
                    ? `Enviado: ${new Date(n.sent_at).toLocaleString("es-ES")}`
                    : `Actualizado: ${new Date(n.updated_at).toLocaleString("es-ES")}`}
                </div>
              </div>
              {n.status === "failed" && n.error_message && (
                <p className="mt-2 text-xs text-destructive flex items-start gap-1">
                  <RefreshCw className="h-3 w-3 mt-0.5 shrink-0" />
                  {n.error_message}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
