import { motion } from "framer-motion";
import { Check, X, Database, Eye, BookOpen } from "lucide-react";

const notIs = [
  "Un sustituto de KDP ni una herramienta para automatizar procesos dentro de Amazon.",
  "Una spy tool ni herramienta de research tipo Helium 10 o Bookbeam.",
  "Un gestor de Amazon Ads.",
  "Software de escritura, maquetación o diseño.",
  "Contabilidad fiscal completa."
];

const yesIs = [
  "El lugar donde cada libro tiene sus costes, ingresos, archivos y flujo de trabajo en un solo sitio.",
  "La estructura que conecta tu biblioteca, producción y finanzas para que nada se quede suelto.",
  "La forma de saber si un libro es rentable antes y después de publicarlo.",
  "La visión que necesitas para dejar de improvisar y empezar a gestionar tu editorial como un negocio real."
];

const pillars = [
  {
    icon: Database,
    title: "Localiza en segundos dónde está cada cosa",
    desc: "Costes, ingresos, archivos, producción y rendimiento de cada libro, en un solo lugar. Sin buscar en carpetas, hojas de cálculo ni notas dispersas."
  },
  {
    icon: Eye,
    title: "Toma el control de tu operativa",
    desc: "Ten claro qué toca hacer, qué está pendiente y qué decisiones tienes por delante. Trabaja con estructura, no con memoria."
  },
  {
    icon: BookOpen,
    title: "Conoce la rentabilidad real de tu editorial",
    desc: "Sabe cuánto te deja cada libro y cómo rinde tu catálogo en conjunto. Decide dónde invertir y qué escalar con datos, no con intuición."
  }
];

export const WhatIsPublifySection = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent dark:via-accent/5 pointer-events-none" />
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8">
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary">
            El centro de tu negocio son tus libros
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Deja de gestionar tu editorial entre 10 herramientas distintas. Ten una sola fuente de verdad con el{" "}
            <strong className="text-primary">libro como eje de cada decisión</strong>.
          </p>
        </motion.div>

        {/* 3 Pilares */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="p-6 bg-card border border-border rounded-xl hover:border-accent/30 transition-colors text-center">
            
              <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <pillar.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-primary">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground">{pillar.desc}</p>
            </motion.div>
          )}
        </div>

        {/* NO es / SÍ es */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-border bg-card">
            
            <h3 className="font-heading text-lg font-bold mb-4 text-muted-foreground">
              Esto <span className="text-primary">NO</span> es:
            </h3>
            <ul className="space-y-3">
              {notIs.map((item, i) =>
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              )}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-accent/20 bg-accent/5">
            
            <h3 className="font-heading text-lg font-bold mb-4 text-accent">
              Esto <span className="font-bold">SÍ</span> es:
            </h3>
            <ul className="space-y-3">
              {yesIs.map((item, i) =>
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                  <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-lime-500 font-medium" />
                  <span>{item}</span>
                </li>
              )}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
