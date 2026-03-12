import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Sparkles, DollarSign, BookOpen } from "lucide-react";
import { TextReveal } from "@/components/motion/TextReveal";
import { ValueAnchorBlock } from "./ValueAnchorBlock";
import { CountdownTimer } from "./CountdownTimer";
import { WaitlistSuccessState } from "./WaitlistSuccessState";
import { useWaitlistForm } from "../hooks/useWaitlistForm";

const benefits = [
  "Acceso antes del lanzamiento",
  "Precio más bajo que existirá (se mantiene para siempre)",
  "Participar en la evolución del producto",
  "Onboarding y soporte personalizado",
];

const includes = [
  "Acceso prioritario al MVP (Biblioteca + Finanzas básicas)",
  "Onboarding y soporte inicial personalizado",
  "Feedback prioritario: tus fricciones tienen prioridad",
  "Posible opción Lifetime más adelante (si aplica, para early adopters)",
];

const pricingTiers = [
  { dates: "1–10 abril", price: "15", highlight: true },
  { dates: "11–20 abril", price: "20", highlight: false },
  { dates: "21–30 abril", price: "25", highlight: false },
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

export const PreventaSection = () => {
  const { name, email, loading, submitted, setName, setEmail, handleSubmit } = useWaitlistForm();

  return (
    <section id="waitlist" className="py-20 bg-background relative overflow-hidden">
      <div data-gsap="parallax-bg" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 dark:bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/5 dark:bg-accent/15 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl px-4 relative z-10">
        {/* Header */}
        <div data-gsap="section-header" className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
            <Sparkles size={16} />
            Acceso exclusivo para los primeros 30 publishers
          </div>
          <TextReveal as="h2" className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Solo para fundadores. Plazas limitadas.
          </TextReveal>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Consigue acceso prioritario al MVP, bloquea el mejor precio para siempre y ayuda a definir el producto.
          </p>
          <div className="mt-4 flex justify-center">
            <CountdownTimer />
          </div>
        </div>

        {/* Main grid: Info + Form */}
        <div className="grid lg:grid-cols-2 gap-10 mb-12">
          {/* Left: All pricing & benefits consolidated */}
          <div className="space-y-6">
            {/* Qué incluye */}
            <div className="p-6 bg-card border border-accent rounded-xl">
              <h3 className="font-heading text-lg font-bold mb-4">Qué incluye</h3>
              <ul className="space-y-3">
                {includes.map((item, i) =>
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                )}
              </ul>
              <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                  <span className="text-sm font-semibold text-accent">MVP actual</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Biblioteca editorial + Finanzas básicas. Las funcionalidades avanzadas llegarán progresivamente.
                </p>
              </div>
              <div className="mt-3 p-4 bg-muted/50 border border-border rounded-lg">
                <p className="text-sm font-semibold text-foreground mb-2">En el roadmap:</p>
                <div className="flex flex-wrap gap-2">
                  {roadmapItems.map((item, i) =>
                    <span key={i} className="text-xs bg-background border border-border rounded-full px-3 py-1 text-muted-foreground">
                      {item}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ¿Por qué entrar ahora? */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <h3 className="font-heading text-lg font-bold mb-4">¿Por qué entrar ahora?</h3>
              <ul className="space-y-3">
                {benefits.map((item, i) =>
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                )}
              </ul>
            </div>

            <ValueAnchorBlock />

            {/* Pricing consolidado */}
            <div className="p-6 bg-card border border-primary/20 rounded-xl">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-primary" />
                <h3 className="font-heading text-lg font-bold">Precio escalonado (abril — Plan Plus)</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Cuanto antes entres, menos pagas. El precio se mantiene <strong className="text-foreground">para siempre</strong> mientras mantengas tu suscripción activa.
              </p>
              <div className="space-y-2 mb-4">
                {pricingTiers.map((tier, i) =>
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      tier.highlight ? "bg-primary/10 border-primary/30" : "bg-background border-border"
                    }`}
                  >
                    <span className="font-medium text-sm">{tier.dates}</span>
                    <span className={`text-xl font-bold ${tier.highlight ? "text-primary" : ""}`}>
                      {tier.price} €<span className="text-xs font-normal text-muted-foreground">/mes</span>
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong className="text-foreground">Desde mayo:</strong> 29 €/mes Básico | 49 €/mes Plus</p>
                <p>Si cancelas, al volver pagarás el precio vigente sin descuento.</p>
                <p>El plan PRO no está incluido en esta oferta, pero si entras ahora solo pagarás la diferencia de precio manteniendo tu precio de early adopter.</p>
                <p className="text-primary">Precios sin IVA.</p>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <div className="sticky top-28">
                <WaitlistSuccessState />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                data-gsap="preventa-card"
                className="p-8 bg-card border border-border rounded-2xl shadow-lg space-y-6 sticky top-28"
              >
                <div className="text-center">
                  <h3 className="font-heading text-xl font-bold mb-2">Reservar mi acceso prioritario</h3>
                  <p className="text-sm text-muted-foreground">
                    Apuntarte es gratis. Te avisaremos cuando abramos acceso.
                  </p>
                </div>

                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    maxLength={100}
                    className="h-12 text-base"
                  />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                    className="h-12 text-base"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-5" disabled={loading}>
                    {loading ? "Enviando..." : "Bloquear mi precio desde 15€/mes"}
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                </motion.div>

                <p className="text-sm text-accent text-center">
                  Solo tu email. Sin tarjeta. Sin compromiso.
                </p>
                <p className="text-xs text-muted-foreground text-center">
                  El precio sube cada 10 plazas. Una vez dentro, es tuyo para siempre.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
