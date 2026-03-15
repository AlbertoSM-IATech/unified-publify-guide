import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WaitlistDialog, useWaitlistDialog } from "@/components/WaitlistDialog";

export const FinalCtaSection = () => {
  const { open, setOpen, openDialog } = useWaitlistDialog();

  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8 text-primary">
            Tu editorial merece un sistema. No más parches.
          </h2>
          
          <div className="text-lg md:text-xl text-muted-foreground space-y-4 mb-10 max-w-2xl mx-auto text-left md:text-center leading-relaxed">
            <p>Empezaste en KDP para tener libertad.</p>
            <p>No para perder horas entre Excel, Notion y KDP Reports sin saber si tu negocio es rentable.</p>
            <p className="text-foreground font-semibold">Los publishers que operan con sistema toman mejores decisiones y escalan.</p>
            <p className="text-foreground font-semibold">Los que operan con parches pierden tiempo, dinero y foco.</p>
            <p className="text-accent font-bold">Tú ya sabes en cuál de los dos grupos quieres estar.</p>
          </div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
            <Button onClick={openDialog} size="lg" className="text-xl px-12 py-7 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25">
              Opera tu editorial con sistema
              <ArrowRight className="ml-2" size={22} />
            </Button>
          </motion.div>

          <p className="mt-4 text-sm text-muted-foreground">
            Te avisamos cuando abramos. Sin spam.
          </p>
        </motion.div>
      </div>
      <WaitlistDialog open={open} onOpenChange={setOpen} />
    </section>
  );
};
