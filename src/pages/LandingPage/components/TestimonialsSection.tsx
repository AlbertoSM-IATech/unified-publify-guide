import { motion } from "framer-motion";

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-2 border-dashed border-border rounded-2xl p-12 md:p-16 bg-muted/20 text-center"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-muted-foreground/60">
            [Testimonios — pendiente]
          </h2>
          <p className="text-muted-foreground/50 max-w-xl mx-auto leading-relaxed">
            Este bloque se activará con 3–5 testimonios reales de early adopters. 
            Pendiente de recopilar tras el acceso al MVP.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
