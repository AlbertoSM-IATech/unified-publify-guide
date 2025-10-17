import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

export const PromiseVsRealitySection = () => {
  return (
    <section id="realidad" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6"
            >
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Te han vendido que autopublicar es fácil, pero tu negocio editorial parece un{" "}
              <span className="text-destructive">castillo de naipes</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Amazon KDP te prometió que subirías un libro y en 72h estaría a la venta. Técnicamente es cierto. Pero la realidad para quien se toma esto como un negocio de verdad es otra: herramientas sueltas, documentos perdidos, tareas sin seguimiento, campañas desordenadas y una sensación constante de ir apagando fuegos.
              </p>

              <motion.p 
                className="text-xl font-semibold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Autopublicar no es fácil. Si KDP fuera fácil, no vivirías apagando fuegos.
              </motion.p>

              <p>
                Publify existe porque entendimos algo que nadie te cuenta:{" "}
                <strong className="text-foreground">no es cuestión de más horas, sino de tener un sistema.</strong>
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
