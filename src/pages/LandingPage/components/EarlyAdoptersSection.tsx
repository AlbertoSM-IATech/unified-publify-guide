import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, BookOpen, DollarSign } from "lucide-react";
import { ValueAnchorBlock } from "./ValueAnchorBlock";

const includes = [
"Acceso prioritario al MVP (Biblioteca + Finanzas básicas)",
"Onboarding y soporte inicial personalizado",
"Feedback prioritario: tus fricciones tienen prioridad",
"Posible opción Lifetime más adelante (si aplica, para early adopters)"];


const pricingTiers = [
{ dates: "1–10 abril", price: "15", highlight: true },
{ dates: "11–20 abril", price: "20", highlight: false },
{ dates: "21–30 abril", price: "25", highlight: false }];


const roadmapItems = [
"Calculadora de viabilidad",
"Estudio de KW y scoring",
"Análisis de campañas y KW",
"Calendario editorial",
"Integraciones",
"Generación de QRs personalizados",
"Y más…"];


export const EarlyAdoptersSection = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="early-adopters" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
            <Sparkles size={16} />
            Plazas limitadas: 20–30 early adopters
          </div>
          <h2 className="font-heading text-3xl font-bold mb-4 text-primary md:text-5xl">
            Acceso prioritario 
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Entra antes que nadie y bloquea el mejor precio para siempre (mientras mantengas tu suscripción activa).
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Qué incluye */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-card border rounded-xl border-accent">
            
            <h3 className="font-heading text-xl font-bold mb-6">Qué incluye</h3>
            <ul className="space-y-4">
              {includes.map((item, i) =>
              <li key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              )}
            </ul>

            {/* MVP actual */}
            <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">MVP actual</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Biblioteca editorial + Finanzas básicas. Las funcionalidades avanzadas llegarán progresivamente.
              </p>
            </div>

            {/* Roadmap */}
            <div className="mt-4 p-4 bg-muted/50 border border-border rounded-lg">
              <p className="text-sm font-semibold text-foreground mb-2">En el roadmap:</p>
              <div className="flex flex-wrap gap-2">
                {roadmapItems.map((item, i) =>
                <span key={i} className="text-xs bg-background border border-border rounded-full px-3 py-1 text-muted-foreground">
                    {item}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Precio escalonado */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-card border rounded-xl border-primary">

            <ValueAnchorBlock />
            
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-base md:text-xl font-bold">Precio escalonado (abril — Plan Plus)</h3>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              Cuanto antes entres, menos pagas. El precio se mantiene <strong className="text-foreground">para siempre</strong> mientras mantengas tu suscripción activa.
            </p>
            
            <div className="space-y-3 mb-6">
              {pricingTiers.map((tier, i) =>
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                tier.highlight ?
                "bg-primary/10 border-primary/30" :
                "bg-background border-border"}`
                }>
                
                  <span className="font-medium">{tier.dates}</span>
                  <span className={`text-2xl font-bold ${tier.highlight ? "text-primary" : ""}`}>
                    {tier.price} €<span className="text-sm font-normal text-muted-foreground">/mes</span>
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 bg-muted/50 border border-border rounded-lg mb-6 space-y-2">
              <p className="text-sm text-foreground">
                <strong className="text-primary">Desde 1 de mayo:</strong> 29 €/mes Básico | 49 €/mes Plus
              </p>
              <p className="text-xs text-muted-foreground">
                Si cancelas, al volver tendrás que pagar el precio vigente sin descuento.
              </p>
              <p className="text-xs text-muted-foreground">
                El plan PRO no está incluido en esta oferta, pero si entras ahora solo pagarás la diferencia de precio manteniendo tu precio de early adopter.
              </p>
              <p className="text-xs text-primary">
                Precios sin IVA.
              </p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button onClick={scrollToWaitlist} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-6">
                Bloquear mi precio de early adopter
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              El precio sube cada 10 plazas. Una vez dentro, es tuyo para siempre.
            </p>
          </motion.div>
        </div>
      </div>
    </section>);

};