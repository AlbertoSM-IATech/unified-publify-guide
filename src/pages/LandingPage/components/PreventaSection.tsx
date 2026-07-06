import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, DollarSign, BookOpen, Shield, Zap, Crown, Users } from "lucide-react";
import { TextReveal } from "@/components/motion/TextReveal";
import { ValueAnchorBlock } from "./ValueAnchorBlock";
import { WaitlistDialog, useWaitlistDialog } from "@/components/WaitlistDialog";
import { getPromotionState } from "../utils/pricingTiers";

const includes = [
  { icon: Zap, text: "Acceso prioritario al MVP (Biblioteca + Finanzas básicas)" },
  { icon: Shield, text: "Onboarding y soporte inicial personalizado" },
  { icon: Crown, text: "Feedback prioritario: tus fricciones tienen prioridad" },
  { icon: Sparkles, text: "Posible opción Lifetime más adelante (si aplica, para early adopters)" },
];

const benefits = [
  "Acceso antes del lanzamiento",
  "Precio de lanzamiento bloqueado de por vida",
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

export const PreventaSection = () => {
  const { open, setOpen, openDialog } = useWaitlistDialog();
  const promo = getPromotionState();
  const currentPrice = promo.tiers[0].tier.price;
  const seats = promo.seatsTotal;

  return (
    <section id="waitlist" className="py-24 bg-muted dark:bg-secondary/40 border-y border-border/50 relative overflow-hidden">
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
            className="inline-flex items-center gap-2 border border-primary/20 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-semibold mb-8"
          >
            <Users size={16} />
            Precio de lanzamiento — solo para los primeros {seats} publishers
          </motion.div>

          <TextReveal as="h2" className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            {`${currentPrice}€/mes de por vida. Plazas limitadas a ${seats}.`}
          </TextReveal>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            La preventa escalonada ha finalizado. Mantenemos un precio único de lanzamiento
            para los primeros {seats} publishers. Cuando se completen las plazas,
            se cerrará y pasaremos al precio estándar.
          </p>
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
              className="p-6 bg-card border border-primary/20 rounded-2xl shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-primary text-2xl">
                  Precio de lanzamiento — Plan Plus
                </h3>
              </div>

              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                Un único precio para los primeros <strong className="text-foreground">{seats} publishers</strong>.
                Se mantiene <strong className="text-foreground">para siempre</strong> mientras tu suscripción siga activa.
              </p>

              <div className="flex items-baseline gap-3 p-5 rounded-xl border border-primary/30 bg-primary/10 mb-5">
                <span className="text-5xl font-bold text-primary">{currentPrice}€</span>
                <span className="text-sm text-muted-foreground">/mes · IVA no incluido</span>
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                  Precio actual
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground p-4 bg-muted/30 rounded-xl border border-border">
                <p><strong className="text-foreground">Cuando se completen las {seats} plazas:</strong> 19 €/mes Starter | 49 €/mes Plus</p>
                <p>Si cancelas, al volver pagarás el precio vigente sin descuento.</p>
                <p>El plan PRO no está incluido en esta oferta, pero si entras ahora solo pagarás la diferencia de precio manteniendo tu precio de lanzamiento.</p>
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
              className="p-8 bg-card border border-border rounded-2xl shadow-lg space-y-6 sticky top-28 relative overflow-hidden px-[20px] py-[21px]"
            >
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-accent/50 via-accent to-accent/50" />

              <div className="text-center pt-2 px-0">
                <h3 className="font-heading font-bold mb-2 text-primary text-2xl">
                  Únete a la lista de espera
                </h3>
                <p className="text-sm text-muted-foreground">
                  Regístrate gratis. Te enviaremos un email con los detalles y el proceso de pago.
                </p>
              </div>

              <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/15">
                <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                  Solo {seats} plazas
                </p>
                <p className="text-sm text-foreground">
                  Cuando se completen, cerramos y pasamos a precio estándar.
                </p>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={openDialog}
                  size="lg"
                  className="btn-shine w-full font-bold text-base py-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
                >
                  Apuntarme a la lista de espera
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>

              <p className="text-xs text-muted-foreground text-center">
                Una vez dentro, el precio es tuyo para siempre.
              </p>
            </motion.div>
            <WaitlistDialog open={open} onOpenChange={setOpen} />
          </div>
        </div>
      </div>
    </section>
  );
};
