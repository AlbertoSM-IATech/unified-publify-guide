import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { questions, type Question } from "./questions";

type Answers = Record<string, any>;

function getUtm() {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") ?? undefined,
    utm_medium: p.get("utm_medium") ?? undefined,
    utm_campaign: p.get("utm_campaign") ?? undefined,
    landing_path: window.location.pathname,
  };
}

export default function DiagnosticoForm() {
  const [answers, setAnswers] = useState<Answers>({});
  const [idx, setIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const visible = useMemo(
    () => questions.filter((q) => !q.showIf || q.showIf(answers)),
    [answers]
  );
  const total = visible.length;
  const current = visible[idx];

  const setAnswer = (id: string, v: any) => setAnswers((a) => ({ ...a, [id]: v }));

  const canAdvance = (q: Question | undefined) => {
    if (!q) return false;
    if (q.optional) return true;
    const v = answers[q.id];
    if (q.type === "multi") return Array.isArray(v) && v.length > 0;
    if (q.type === "email") return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    return typeof v === "string" && v.trim().length > 0;
  };

  const next = async () => {
    if (!canAdvance(current)) return;
    if (idx < total - 1) {
      setIdx(idx + 1);
    } else {
      await submit();
    }
  };
  const back = () => idx > 0 && setIdx(idx - 1);

  const submit = async () => {
    setSubmitting(true);
    try {
      const payload = { ...answers, ...getUtm() };
      const { data, error } = await supabase.functions.invoke("submit-lead", { body: payload });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setDone(true);
    } catch (e: any) {
      console.error(e);
      toast.error("No se pudo enviar el formulario. Inténtalo de nuevo en unos segundos.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (done || submitting) return;
      if (e.key === "Enter" && current?.type !== "longtext") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, answers, idx, done, submitting]);

  if (done) {
    const pref = answers.next_step_preference;
    const headline =
      pref === "reunion"
        ? "Gracias. Te escribo en menos de 24h para cuadrar la reunión."
        : pref === "diagnostico_email"
        ? "Gracias. Te envío un diagnóstico personalizado por email."
        : "Gracias. Te respondo por email con claridad sobre si esto aplica a tu caso.";
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl text-center py-16 px-6"
      >
        <div className="mx-auto h-14 w-14 rounded-full bg-primary/15 flex items-center justify-center mb-6">
          <Check className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{headline}</h3>
        <p className="text-muted-foreground">Mientras tanto, sigue explorando Publify.</p>
      </motion.div>
    );
  }

  const progress = Math.round(((idx + 1) / total) * 100);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 md:py-16">
      <div className="mb-8">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>Pregunta {idx + 1} de {total}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25 }}
          className="min-h-[320px]"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground leading-snug">
            {current.title}
            {current.optional && <span className="text-muted-foreground text-base ml-2">(opcional)</span>}
          </h3>
          {current.subtitle && (
            <p className="mt-2 text-sm text-muted-foreground">{current.subtitle}</p>
          )}
          {current.microcopy && (
            <p className="mt-3 text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
              {current.microcopy}
            </p>
          )}

          <div className="mt-8">
            {(current.type === "text" || current.type === "email") && (
              <Input
                autoFocus
                type={current.type === "email" ? "email" : "text"}
                placeholder={current.placeholder}
                value={answers[current.id] ?? ""}
                onChange={(e) => setAnswer(current.id, e.target.value)}
                className="text-lg h-12"
              />
            )}

            {current.type === "longtext" && (
              <Textarea
                autoFocus
                placeholder={current.placeholder}
                value={answers[current.id] ?? ""}
                onChange={(e) => setAnswer(current.id, e.target.value)}
                rows={4}
                className="text-base"
              />
            )}

            {current.type === "single" && (
              <div className="grid gap-3">
                {current.options!.map((o) => {
                  const selected = answers[current.id] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => {
                        setAnswer(current.id, o.value);
                        setTimeout(() => next(), 200);
                      }}
                      className={`text-left px-5 py-4 rounded-lg border transition-all ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <span className="font-medium">{o.label}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {current.type === "multi" && (
              <div className="grid gap-3">
                {current.options!.map((o) => {
                  const arr: string[] = answers[current.id] ?? [];
                  const selected = arr.includes(o.value);
                  const max = current.maxSelect ?? Infinity;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => {
                        if (selected) {
                          setAnswer(current.id, arr.filter((x) => x !== o.value));
                        } else if (arr.length < max) {
                          setAnswer(current.id, [...arr, o.value]);
                        }
                      }}
                      className={`text-left px-5 py-4 rounded-lg border transition-all flex items-center justify-between ${
                        selected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <span className="font-medium">{o.label}</span>
                      {selected && <Check className="h-4 w-4 text-primary" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between">
        <Button variant="ghost" onClick={back} disabled={idx === 0 || submitting}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Atrás
        </Button>
        <Button onClick={next} disabled={!canAdvance(current) || submitting} size="lg">
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Enviando…
            </>
          ) : idx === total - 1 ? (
            <>Enviar <ArrowRight className="h-4 w-4 ml-2" /></>
          ) : (
            <>Continuar <ArrowRight className="h-4 w-4 ml-2" /></>
          )}
        </Button>
      </div>
    </div>
  );
}
