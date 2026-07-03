import { useState } from "react";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Mail, User, ArrowRight, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";


const CONSENT_VERSION = "2026-07-v1";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

const waitlistSchema = z.object({
  name: z
    .string()
    .trim()
    .max(80, { message: "Máx. 80 caracteres" })
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .trim()
    .min(1, { message: "Añade tu email" })
    .email({ message: "Email no válido" })
    .max(255, { message: "Email demasiado largo" }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar la política de privacidad." }),
  }),
});

function getUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? undefined,
    utm_medium: p.get("utm_medium") ?? undefined,
    utm_campaign: p.get("utm_campaign") ?? undefined,
  };
}

export const WaitlistDialog = ({ open, onOpenChange, source }: WaitlistDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsed = waitlistSchema.safeParse({ name, email, consent });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      setErrorMsg(first ?? "Revisa los datos.");
      return;
    }

    setStatus("loading");
    const utm = getUtm();

    const { error } = await supabase.from("waitlist_signups").insert({
      email: parsed.data.email.toLowerCase(),
      name: parsed.data.name?.trim() || null,
      source: source ?? "landing",
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      referrer: typeof document !== "undefined" ? document.referrer.slice(0, 500) : null,
      utm_source: utm.utm_source ?? null,
      utm_medium: utm.utm_medium ?? null,
      utm_campaign: utm.utm_campaign ?? null,
      consent_accepted: true,
      consent_accepted_at: new Date().toISOString(),
      consent_version: CONSENT_VERSION,
    });

    if (error) {
      // Unique violation → already registered
      if (error.code === "23505") {
        setStatus("success");
        return;
      }
      console.error("[waitlist] insert error", error);
      setStatus("error");
      setErrorMsg("No hemos podido guardarte. Inténtalo de nuevo en unos segundos.");
      return;
    }

    setStatus("success");
  };

  const reset = () => {
    setName("");
    setEmail("");
    setConsent(false);
    setStatus("idle");
    setErrorMsg(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setTimeout(reset, 250);
      }}
    >
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-border/60 bg-gradient-to-b from-card via-card to-muted/40">
        <div className="relative">
          <div className="absolute inset-x-0 -top-24 h-40 bg-primary/20 blur-[80px] pointer-events-none" />
          <div className="relative px-7 pt-7 pb-6">
            <DialogHeader className="text-left space-y-2">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-primary font-semibold">
                <span className="h-px w-6 bg-primary" />
                Lista de espera
              </div>
              <DialogTitle className="font-heading text-2xl md:text-3xl font-bold leading-tight">
                Reserva tu acceso a Publify
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Hemos cerrado el registro temporalmente. Déjanos tu email y te
                avisaremos en cuanto vuelvan a abrirse plazas.
              </DialogDescription>
            </DialogHeader>

            <AnimatePresence mode="wait">
              {status !== "success" ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 space-y-4"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="wl-name" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Nombre <span className="text-muted-foreground/60 normal-case">(opcional)</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="wl-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tu nombre"
                        autoComplete="name"
                        maxLength={80}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="wl-email" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="wl-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        autoComplete="email"
                        required
                        maxLength={255}
                        className="pl-9"
                      />
                    </div>
                  </div>


                  <div className="flex items-start gap-2.5 pt-1">
                    <Checkbox
                      id="wl-consent"
                      checked={consent}
                      onCheckedChange={(v) => setConsent(v === true)}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor="wl-consent"
                      className="text-[11px] leading-relaxed text-muted-foreground font-normal cursor-pointer select-none"
                    >
                      Acepto que Publify guarde mi email para avisarme cuando reabra el
                      registro. He leído la{" "}
                      <Link
                        to="/privacidad"
                        target="_blank"
                        className="text-primary underline underline-offset-2 hover:text-primary/80"
                      >
                        política de privacidad
                      </Link>
                      . Puedo darme de baja escribiendo a{" "}
                      <span className="text-foreground/80">hola@publify.io</span>.
                    </Label>
                  </div>

                  {errorMsg && (
                    <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-2.5">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading" || !consent}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 group disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Guardando…
                      </>
                    ) : (
                      <>
                        Apuntarme a la lista
                        <ArrowRight className="ml-2 transition-transform group-hover:translate-x-0.5" size={18} />
                      </>
                    )}
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 text-center space-y-4 py-4"
                >
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-heading text-xl font-bold">Estás dentro de la lista</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                      Te escribiremos al email en cuanto vuelvan a abrirse plazas de acceso a Publify.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="mt-2"
                  >
                    Cerrar
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/** Hook helper to manage dialog state */
export const useWaitlistDialog = () => {
  const [open, setOpen] = useState(false);
  return { open, setOpen, openDialog: () => setOpen(true) };
};
