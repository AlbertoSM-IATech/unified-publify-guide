import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { WaitlistDialog, useWaitlistDialog } from "@/components/WaitlistDialog";
import { getPromotionState, type PromotionState } from "../utils/pricingTiers";

interface Plan {
  id: "starter" | "plus" | "pro";
  name: string;
  icon: typeof Zap;
  tagline: string;
  standardPrice: string;
  earlyPrice?: string;
  highlighted?: boolean;
  badge?: string;
  features: string[];
  ctaLabel: string;
  disabled?: boolean;
}

export const PricingPlansSection = () => {
  const { open, setOpen, openDialog } = useWaitlistDialog();
  const [promo, setPromo] = useState<PromotionState>(() => getPromotionState());

  useEffect(() => {
    const id = setInterval(() => setPromo(getPromotionState()), 1000);
    return () => clearInterval(id);
  }, []);

  const activePlusPrice =
    promo.activeTierIndex >= 0 ? promo.tiers[promo.activeTierIndex].tier.price : "25";

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      icon: Zap,
      tagline: "Para empezar a operar con estructura",
      standardPrice: "19",
      features: [
        "Biblioteca editorial centralizada",
        "Fichas de libro con metadatos y assets",
        "Control de formatos (físico, ebook)",
        "Notas y workspace por libro",
        "Soporte por email",
      ],
      ctaLabel: "Próximamente",
      disabled: true,
    },
    {
      id: "plus",
      name: "Plus",
      icon: Sparkles,
      tagline: "El plan recomendado para founders",
      standardPrice: "49",
      earlyPrice: activePlusPrice,
      highlighted: true,
      badge: "Más elegido",
      features: [
        "Todo lo de Starter",
        "Finanzas por libro: ingresos, costes, márgenes",
        "Pipeline editorial con tareas y estados",
        "Calendario editorial y planificación",
        "Scoring de nichos y keywords",
        "Onboarding personalizado",
        "Precio bloqueado de por vida",
      ],
      ctaLabel: `Únete a la lista de espera`,
    },
    {
      id: "pro",
      name: "Pro",
      icon: Crown,
      tagline: "Para operaciones editoriales avanzadas",
      standardPrice: "99",
      features: [
        "Todo lo de Plus",
        "Análisis avanzado de campañas y Ads",
        "QRs personalizados por libro",
        "Dashboards de rentabilidad global",
        "Integraciones (en roadmap)",
        "Soporte prioritario",
      ],
      ctaLabel: "Próximamente",
      disabled: true,
    },
  ];

  return (
    <section id="precios" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            Elige tu plan y <span className="text-primary">bloquea tu precio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-2xl">
            Entra ahora como founder y mantén el precio de por vida mientras tu suscripción siga activa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            const isPlus = plan.id === "plus";
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex flex-col p-8 rounded-2xl border bg-card transition-all ${
                  plan.highlighted
                    ? "border-primary/40 shadow-lg shadow-primary/15 md:scale-[1.03]"
                    : "border-border hover:border-primary/20"
                } ${plan.disabled ? "opacity-60" : ""}`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    {plan.badge}
                  </span>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      plan.highlighted ? "bg-primary/15" : "bg-accent/10"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${plan.highlighted ? "text-primary" : "text-accent"}`}
                    />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-foreground">{plan.name}</h3>
                </div>

                <p className="text-sm text-muted-foreground mb-6">{plan.tagline}</p>

                <div className="mb-6">
                  {isPlus && plan.earlyPrice ? (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-primary">{plan.earlyPrice}€</span>
                        <span className="text-sm text-muted-foreground">/mes</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Desde junio:{" "}
                        <span className="line-through">{plan.standardPrice}€/mes</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-foreground">
                          {plan.standardPrice}€
                        </span>
                        <span className="text-sm text-muted-foreground">/mes</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Precio estándar desde junio
                      </p>
                    </>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                      <Check
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          plan.highlighted ? "text-primary" : "text-accent"
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={plan.disabled ? undefined : openDialog}
                  disabled={plan.disabled}
                  size="lg"
                  className={`w-full font-semibold ${
                    plan.disabled
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : plan.highlighted
                      ? "btn-shine bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-card border border-primary/30 text-primary hover:bg-primary/10"
                  }`}
                  variant={plan.highlighted && !plan.disabled ? "default" : "outline"}
                >
                  {plan.ctaLabel}
                  {!plan.disabled && <ArrowRight className="ml-2" size={18} />}
                </Button>

                {plan.disabled && (
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Disponible más adelante
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-10 max-w-2xl mx-auto">
          Precios sin IVA. Si cancelas, al volver pagarás el precio vigente sin descuento. El plan Pro
          no se incluye en la oferta founder: si entras ahora, solo pagarás la diferencia manteniendo tu
          precio de early adopter.
        </p>
      </div>

      <WaitlistDialog open={open} onOpenChange={setOpen} />
    </section>
  );
};
