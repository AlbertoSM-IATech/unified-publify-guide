import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, DollarSign, BookOpen, Shield, Zap, Crown, AlertCircle } from "lucide-react";
import { TextReveal } from "@/components/motion/TextReveal";
import { ValueAnchorBlock } from "./ValueAnchorBlock";
import { CountdownTimer } from "./CountdownTimer";
import { WaitlistDialog, useWaitlistDialog } from "@/components/WaitlistDialog";
import { getPromotionState, type PromotionState, type TierStatus } from "../utils/pricingTiers";

const includes = [
  { icon: Zap, text: "Acceso prioritario al MVP (Biblioteca + Finanzas básicas)" },
  { icon: Shield, text: "Onboarding y soporte inicial personalizado" },
  { icon: Crown, text: "Feedback prioritario: tus fricciones tienen prioridad" },
  { icon: Sparkles, text: "Posible opción Lifetime más adelante (si aplica, para early adopters)" },
];

const benefits = [
  "Acceso antes del lanzamiento",
  "Precio más bajo que existirá (se mantiene para siempre)",
  "Participar en la evolución del producto",
  "Onboarding y soporte personalizado",
];

const roadmapItems = [
  "Calculadora de viabilidad",
  "Estudio de KW y scoring",
  "Análisis de campañas y KW",
  "Calendario editorial",
  "Integraciones",
  "Generación de QRs personalizados",
  "Y más…",
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const getBadge = (status: TierStatus, index: number, activeTierIndex: number) => {
  if (status === "expired") return null;
  if (status === "active") return "Precio actual";
  if (index === activeTierIndex + 1) return "Siguiente";
  return null;
};

export const PreventaSection = () => {
  const { open, setOpen, openDialog } = useWaitlistDialog();
  const [promo, setPromo] = useState<PromotionState>(() => getPromotionState());

  useEffect(() => {
    const id = setInterval(() => setPromo(getPromotionState()), 1000);
    return () => clearInterval(id);
  }, []);

  const currentPrice = promo.activeTierIndex >= 0
    ? promo.tiers[promo.activeTierIndex].tier.price
    : "15";

  return (
    <section id="waitlist" className="py-24 bg-background relative">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/5 dark:bg-accent/10 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 dark:bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 border px-5 py-2.5 rounded-full text-sm font-semibold mb-8 ${
              promo.isExpired
                ? "bg-muted/50 border-border text-muted-foreground"
                : "bg-primary/10 border-primary/20 text-primary"
            }`}
          >
            {promo.isExpired ? (
              <>
                <AlertCircle size={16} />
                La preventa de founders ha finalizado
              </>
            ) : (
              <>
                <Sparkles size={16} className="animate-pulse" />
                Acceso exclusivo para los primeros 30 publishers
              </>
            )}
          </motion.div>

          <TextReveal as="h2" className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            {promo.isExpired
              ? "La preventa ha finalizado"
              : "Solo para fundadores. Plazas limitadas."}
          </TextReveal>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {promo.isExpired
              ? "El período de inscripción para founders ha terminado. Consulta nuestros planes regulares."
              : "Consigue acceso prioritario al MVP, bloquea el mejor precio para siempre y ayuda a definir el producto."}
          </p>

          <div className="flex justify-center">
            <CountdownTimer />
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-5 gap-8 mb-16">
          {/* Left column: info cards (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Pricing */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`p-6 bg-card border rounded-2xl shadow-sm relative overflow-hidden ${
                promo.isExpired ? "border-border opacity-70" : "border-primary/20"
              }`}
            >
              {/* Subtle gradient accent */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${
                promo.isExpired
                  ? "bg-muted"
                  : "bg-gradient-to-r from-primary/50 via-primary to-primary/50"
              }`} />

              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-primary text-2xl">
                  Precio escalonado (abril–mayo — Plan Plus)
                </h3>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {promo.isExpired ? (
                  <span className="text-muted-foreground">El periodo de precios para founders ha finalizado.</span>
                ) : (
                  <>
                    Cuanto antes entres, menos pagas. El precio se mantiene{" "}
                    <strong className="text-foreground">para siempre</strong> mientras mantengas tu suscripción activa.
                  </>
                )}
              </p>

              <div className="space-y-2.5 mb-5">
                {promo.tiers.map((tierInfo, i) => {
                  const { tier, status } = tierInfo;
                  const isExpired = status === "expired";
                  const isActive = status === "active";
                  const badge = getBadge(status, i, promo.activeTierIndex);

                  return (
                    <div
                      key={i}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        isExpired
                          ? "bg-muted/30 border-border opacity-60"
                          : isActive
                          ? "bg-primary/10 border-primary/30 shadow-sm shadow-primary/10"
                          : "bg-background border-border hover:border-primary/15"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-medium text-sm ${isExpired ? "line-through text-muted-foreground" : ""}`}>
                          {tier.dates}
                        </span>
                        {badge && (
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-accent/20 text-accent"
                          }`}>
                            {badge}
                          </span>
                        )}
                      </div>
                      <span className={`text-2xl font-bold ${
                        isExpired
                          ? "line-through text-muted-foreground"
                          : isActive
                          ? "text-primary"
                          : "text-foreground"
                      }`}>
                        {tier.price} €<span className="text-xs font-normal text-muted-foreground">/mes</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground p-4 bg-muted/30 rounded-xl border border-border">
                <p><strong className="text-foreground">Desde junio:</strong> 19 €/mes Starter | 49 €/mes Plus</p>
                <p>Si cancelas, al volver pagarás el precio vigente sin descuento.</p>
                <p>El plan PRO no está incluido en esta oferta, pero si entras ahora solo pagarás la diferencia de precio manteniendo tu precio de early adopter.</p>
                <p className="text-primary font-medium">Precios sin IVA.</p>
              </div>
            </motion.div>

            {/* Qué incluye */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 bg-card border border-accent/30 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                Qué incluye
              </h3>
              <ul className="space-y-4 mb-5">
                {includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-accent/5 border border-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/10 transition-colors">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-foreground text-sm leading-relaxed pt-1">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 bg-accent/5 border border-accent/15 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">La base del sistema operativo editorial</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  El MVP incluye Biblioteca editorial completa y control financiero por libro. Es el cimiento sobre el que se construyen todas las funcionalidades avanzadas. No es una demo: es la primera pieza funcional de tu sistema.
                </p>
              </div>

              <div className="mt-4 p-4 bg-muted/30 border border-border rounded-xl">
                <p className="text-sm font-semibold text-foreground mb-3">En el roadmap:</p>
                <div className="flex flex-wrap gap-2">
                  {roadmapItems.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs bg-background border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:border-primary/30 hover:text-foreground transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ¿Por qué entrar ahora? */}
            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h3 className="font-heading text-lg font-bold mb-5 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                ¿Por qué entrar ahora?
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/30 border border-transparent hover:border-primary/10 transition-colors">
                    <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <ValueAnchorBlock />
          </div>

          {/* Right column: sticky CTA card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-8 bg-card border rounded-2xl shadow-lg space-y-6 sticky top-28 relative overflow-hidden px-[20px] py-[21px] ${
                promo.isExpired ? "border-border opacity-70" : "border-border"
              }`}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl ${
                promo.isExpired
                  ? "bg-muted"
                  : "bg-gradient-to-r from-accent/50 via-accent to-accent/50"
              }`} />

              <div className="text-center pt-2 px-0">
                <h3 className="font-heading font-bold mb-2 text-primary text-2xl">
                  {promo.isExpired ? "Preventa finalizada" : "Bloquea tu precio ahora"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {promo.isExpired
                    ? "El periodo de inscripción para founders ha terminado."
                    : "Regístrate gratis. Te enviaremos un email con los detalles y el proceso de pago."}
                </p>
              </div>

              <motion.div whileHover={promo.isExpired ? {} : { scale: 1.02 }} whileTap={promo.isExpired ? {} : { scale: 0.98 }}>
                <Button
                  onClick={promo.isExpired ? undefined : openDialog}
                  disabled={promo.isExpired}
                  size="lg"
                  className={`w-full font-bold text-base py-5 rounded-xl ${
                    promo.isExpired
                      ? "bg-muted text-muted-foreground cursor-not-allowed shadow-none"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                  }`}
                >
                  {promo.isExpired
                    ? "Inscripción cerrada"
                    : `Bloquear mi precio desde ${currentPrice}€/mes`}
                  {!promo.isExpired && <ArrowRight className="ml-2" size={20} />}
                </Button>
              </motion.div>

              {!promo.isExpired && (
                <>
                  <p className="text-sm text-accent text-center font-medium">
                    Solo tu email. Sin tarjeta. Sin compromiso.
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    El precio sube con cada tramo. Una vez dentro, es tuyo para siempre.
                  </p>
                </>
              )}
            </motion.div>
            <WaitlistDialog open={open} onOpenChange={setOpen} />
          </div>
        </div>
      </div>
    </section>
  );
};
