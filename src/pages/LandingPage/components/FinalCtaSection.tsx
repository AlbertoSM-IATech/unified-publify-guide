import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const FinalCtaSection = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">
            Pon tu editorial en orden.
          </h2>
          <p className="text-xl text-muted-foreground mb-4">
            Únete a la waitlist y recibe invitación cuando abramos plazas.
          </p>
          <p className="text-sm text-muted-foreground mb-10">
            Acceso progresivo desde el 1 de abril · Cupo limitado: 20–30 plazas
          </p>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
            <Button onClick={scrollToWaitlist} size="lg" className="text-xl px-12 py-7 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25">
              Unirme a la waitlist
              <ArrowRight className="ml-2" size={22} />
            </Button>
          </motion.div>

          <div className="mt-8">
            <p className="text-sm text-muted-foreground italic">
              "El orden funciona. El caos no."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
