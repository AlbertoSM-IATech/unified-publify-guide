import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, FolderSync, Settings, BarChart3 } from "lucide-react";
import { TextReveal } from "@/components/motion/TextReveal";

const steps = [
  {
    number: "01",
    label: "CENTRALIZA",
    icon: FolderSync,
    title: "Importa y organiza tu catálogo",
    description:
      "Añade tus libros y convierte cada uno en una unidad operativa completa. Fichas, versiones, assets, finanzas y datos de producción: todo en un solo lugar, sin duplicados.",
  },
  {
    number: "02",
    label: "OPERA",
    icon: Settings,
    title: "Gestiona con claridad lo que toca hacer",
    description:
      "Ejecuta lo que está pendiente, actúa sobre lo qué está bloqueado y controla lo qué está listo. Sin depender de memoria, sin notas en WhatsApp, sin tareas perdidas en cinco apps distintas.",
  },
  {
    number: "03",
    label: "DECIDE",
    icon: BarChart3,
    title: "Toma decisiones con datos reales en contexto",
    description:
      "Ve el rendimiento de cada libro y del negocio global. Costes, ingresos, inversión en Ads, rentabilidad real. La visión que necesitas para escalar con criterio, no a ciegas.",
  },
];

export const NewHowItWorksSection = () => {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="como-funciona" className="py-24 bg-secondary/50 dark:bg-secondary/40 border-y border-border/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/8 dark:to-accent/8 pointer-events-none" />
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <TextReveal
            as="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Así funciona Publify
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Tres pasos para pasar del caos editorial al control total.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-14">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold shadow-lg">
                  {step.number}
                </div>
                <span className="tracking-widest uppercase text-foreground text-2xl font-extrabold">
                  {step.label}
                </span>
              </div>
              <div className="w-10 h-10 mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <step.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-primary">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
            <Button
              onClick={scrollToWaitlist}
              size="lg"
              className="text-base px-8 py-5 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/25"
            >
              Unirme a la lista de early adopters
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </motion.div>
          <p className="mt-3 text-sm text-muted-foreground">
            20–30 plazas. Se asignan por orden y encaje.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
