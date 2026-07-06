import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, AlertCircle } from "lucide-react";
import { getPromotionState } from "../utils/pricingTiers";

export const EarlyAdoptersSection = () => {
  const [promo] = useState(() => getPromotionState());

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentPrice = promo.activeTierIndex >= 0
    ? promo.tiers[promo.activeTierIndex].tier.price
    : "15";

  return (
    <section id="early-adopters" className="py-20 bg-muted dark:bg-secondary/40 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/8 via-transparent to-primary/8 dark:from-accent/8 dark:to-primary/8 pointer-events-none" />
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-medium bg-primary/10 border-primary/20 text-primary animate-kicker-in">
            <Sparkles size={16} className="animate-float-slow" />
            Lista de espera abierta
          </div>
          <h2 className="font-heading text-3xl font-bold text-primary md:text-5xl">
            Acceso cerrado temporalmente
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-2xl">
            Estamos afinando el sistema con el primer grupo de publishers. Apúntate a la lista y te avisamos en cuanto reabramos el acceso.
          </p>

          <div className="space-y-4 max-w-2xl mx-auto pt-2">
            <p className="text-base text-foreground/80 leading-relaxed">
              Tu stack actual es un mosaico de herramientas genéricas: archivos en Drive, datos en Excel, tareas en Notion, finanzas a ojo. Publify nace para reemplazarlo por un Sistema Operativo Editorial — una sola pieza integrada para el negocio editorial.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block pt-4">
            <Button onClick={scrollToWaitlist} size="lg" className="text-base px-8 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25">
              Únete a la lista de espera
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
