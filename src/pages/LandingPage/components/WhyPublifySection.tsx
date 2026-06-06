import { motion } from "framer-motion";
import {
  FolderSync,
  BarChart3,
  RefreshCcw,
  Brain,
  Rocket,
  Crown,
} from "lucide-react";
import { EditorialSectionHeader } from "./EditorialSectionHeader";

const reasons = [
  {
    icon: FolderSync,
    title: "Fin a la dispersión",
    subtitle: "Todo tu negocio editorial en un solo lugar.",
    desc: "Deja de saltar entre Drive, Excel, Notion y notas del móvil. Cada libro centraliza sus archivos, datos, decisiones y contexto en una única ficha operativa.",
  },
  {
    icon: BarChart3,
    title: "Visibilidad financiera real",
    subtitle: "Sabe cuánto te deja cada libro.",
    desc: "Registra ingresos, gastos e inversión por libro. Visualiza márgenes y rentabilidad neta para decidir dónde invertir y qué escalar, con datos, no con intuición.",
  },
  {
    icon: RefreshCcw,
    title: "Menos retrabajo",
    subtitle: "Un proceso repetible para cada libro.",
    desc: "Estructura tareas, checklists y estados para que cada nuevo libro siga el mismo flujo profesional. Sin reinventar la rueda cada vez.",
  },
  {
    icon: Brain,
    title: "Adiós a la fatiga de decisión",
    subtitle: "Contexto siempre a mano.",
    desc: "Toda la información del libro (research, estrategia, metadatos, finanzas) vive junta. Cada decisión se toma con contexto, no reconstruyendo datos de memoria.",
  },
  {
    icon: Rocket,
    title: "Escala sin caos",
    subtitle: "Crece sin que se te caiga todo.",
    desc: "Publify escala contigo. Da igual el tamaño de tu catálogo: la estructura se mantiene, el control no se pierde y cada nuevo título suma, no complica.",
  },
  {
    icon: Crown,
    title: "Opera como un CEO editorial",
    subtitle: "No como alguien que improvisa.",
    desc: "Dale a tu negocio la estructura que merece. Dashboard, pipeline, finanzas, research y producción: todo profesional, todo visible, todo bajo control.",
  },
];

export const WhyPublifySection = () => {
  return (
    <section className="py-24 md:py-32 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 max-w-6xl relative">
        <EditorialSectionHeader
          kicker="Capítulo 02 · Tesis"
          title={
            <>
              ¿Por qué <span className="text-primary italic">Publify</span>?
            </>
          }
          subtitle="Porque tu negocio editorial merece operar con la misma claridad que cualquier empresa seria."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-border/60">
          {reasons.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              className="group relative p-7 md:p-8 border-r border-b border-border/60 bg-card/30 hover:bg-card transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="font-heading italic text-primary text-lg leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" />
                <item.icon className="w-4 h-4 text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="font-heading text-2xl leading-tight text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm font-medium text-primary mb-3 italic">{item.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
