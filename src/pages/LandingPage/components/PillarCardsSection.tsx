import { motion } from "framer-motion";
import { FolderArchive, Lightbulb, ListChecks, TrendingUp } from "lucide-react";
import { EditorialSectionHeader } from "./EditorialSectionHeader";
import { useTilt } from "@/hooks/useTilt";

const pillars = [
  {
    icon: FolderArchive,
    title: "Gestión centralizada de activos digitales",
    desc: "Centraliza tus archivos, contenido A+, datos, audiencia y enlaces por proyecto (libro) y formato (tapa dura, blanda, ebook).",
  },
  {
    icon: Lightbulb,
    title: "Workspace por libro — espacio para pensar antes de ejecutar",
    desc: "Investiga nichos, desarrolla ideas, organiza borradores y captura hallazgos en un espacio libre dentro de cada libro, sin salir del sistema y sin perder nada entre herramientas.",
  },
  {
    icon: ListChecks,
    title: "Control de producción — notas y tareas por libro",
    desc: "Gestiona el avance de cada libro con tareas, checklists, calendario y notas de decisión. Todo vive dentro del libro: sin saltar entre apps, sin perder contexto.",
  },
  {
    icon: TrendingUp,
    title: "Visión financiera — rentabilidad real por título",
    desc: "Registra ingresos, gastos e inversión por libro. Visualiza márgenes, rentabilidad neta y rendimiento global de tu catálogo para tomar decisiones con datos, no con intuición.",
  },
];

export const PillarCardsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background border-y border-border/50 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 max-w-6xl relative">
        <EditorialSectionHeader
          kicker="Capítulo 01 · Arquitectura"
          title={
            <>
              Los <span className="text-primary italic">4 pilares</span> de Publify
            </>
          }
          subtitle="Cada libro es una unidad de negocio. Publify lo trata como tal."
        />

        <div className="grid md:grid-cols-2 gap-0 border-t border-l border-border/60">
          {pillars.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group relative p-8 md:p-10 border-r border-b border-border/60 bg-card/40 hover:bg-card transition-colors"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-heading italic text-primary text-2xl leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" />
                <item.icon className="w-5 h-5 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-heading text-2xl md:text-3xl leading-tight text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-light max-w-prose">
                {item.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
