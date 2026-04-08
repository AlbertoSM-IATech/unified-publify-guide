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
    <section id="early-adopters" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className={`inline-flex items-center gap-2 border px-4 py-2 rounded-full text-sm font-medium ${
            promo.isExpired
              ? "bg-muted/50 border-border text-muted-foreground"
              : "bg-primary/10 border-primary/20 text-primary"
          }`}>
            {promo.isExpired ? <AlertCircle size={16} /> : <Sparkles size={16} />}
            {promo.isExpired
              ? "La preventa de founders ha finalizado"
              : "Acceso exclusivo para los primeros 30 publishers"}
          </div>
          <h2 className="font-heading text-3xl font-bold text-primary md:text-5xl">
            {promo.isExpired ? "Preventa finalizada" : "Acceso prioritario"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {promo.isExpired
              ? "El periodo de inscripción para founders ha terminado. Consulta nuestros planes regulares."
              : "Entra antes que nadie, bloquea el mejor precio para siempre y ayuda a dar forma a Publify."}
          </p>

          {!promo.isExpired && (
            <>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block pt-4">
                <Button onClick={scrollToWaitlist} size="lg" className="text-base px-8 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25">
                  Ver precios y bloquear mi precio
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </motion.div>
              <p className="text-sm text-accent">
                desde {currentPrice}€/mes
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};
