import { motion } from "framer-motion";
import { FolderArchive, Lightbulb, ListChecks, TrendingUp } from "lucide-react";

const pillars = [
  {
    icon: FolderArchive,
    title: "Gestión centralizada de activos digitales",
    desc: "Centraliza tus archivos, contenido A+, datos, audiencia y enlaces por proyecto (libro) y formato (tapa dura, blanda, ebook).",
  },
  {
    icon: Lightbulb,
    title: "Workspace por libro — Tu espacio para pensar antes de ejecutar",
    desc: "Investiga nichos, desarrolla ideas, organiza borradores y captura hallazgos en un espacio libre dentro de cada libro, sin salir del sistema y sin perder nada entre herramientas.",
  },
  {
    icon: ListChecks,
    title: "Control de producción — Notas y tareas por libro",
    desc: "Gestiona el avance de cada libro con tareas, checklists, calendario y notas de decisión. Todo vive dentro del libro: sin saltar entre apps, sin perder contexto.",
  },
  {
    icon: TrendingUp,
    title: "Visión financiera — Controla la rentabilidad real",
    desc: "Registra ingresos, gastos e inversión por libro. Visualiza márgenes, rentabilidad neta y rendimiento global de tu catálogo para tomar decisiones con datos, no con intuición.",
  },
];

export const PillarCardsSection = () => {
  return (
    <section className="py-24 bg-muted dark:bg-secondary/40 border-y border-border/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent dark:via-primary/5 pointer-events-none" />
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            Los <span className="text-primary">4 pilares</span> de Publify
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada libro es una unidad de negocio. Publify lo trata como tal.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-6 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
