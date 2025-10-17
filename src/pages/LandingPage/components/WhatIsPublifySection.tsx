import { motion } from "framer-motion";
import { BookOpen, TrendingUp, Mail, Workflow } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const features = [
  {
    icon: BookOpen,
    title: "Biblioteca editorial organizada",
    description: "Fichas por libro, colecciones, manuscritos, portadas, lead magnets, enlaces clave."
  },
  {
    icon: TrendingUp,
    title: "Finanzas claras",
    description: "Ingresos, gastos, márgenes, rentabilidad por título o colección."
  },
  {
    icon: Mail,
    title: "Marketing integrado",
    description: "Landings, formularios, CRM, email y embudos post-venta..."
  },
  {
    icon: Workflow,
    title: "Flujo profesional",
    description: "Idea → producción → publicación → postventa."
  }
];

export const WhatIsPublifySection = () => {
  return (
    <section id="que-es-publify" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Publify es el sistema que convierte la autopublicación en KDP en un{" "}
              <span className="text-primary">negocio real</span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Publify te da el control total de tu negocio editorial en Amazon KDP:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                className="p-6 bg-background rounded-xl border border-border"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <p className="text-xl text-foreground font-semibold">
              Y lo mejor: sin cambiar de herramienta cuando creces.{" "}
              <span className="text-primary">Publify escala contigo.</span>
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};
