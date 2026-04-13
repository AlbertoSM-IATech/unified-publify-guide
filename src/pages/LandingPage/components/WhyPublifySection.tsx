import { motion } from "framer-motion";
import {
  FolderSync,
  BarChart3,
  RefreshCcw,
  Brain,
  Rocket,
  Crown,
} from "lucide-react";

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
    desc: "Publify escala contigo. Da igual si gestionas 5 libros o 50: la estructura se mantiene, el control no se pierde y cada nuevo título suma, no complica.",
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
    <section className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent dark:via-accent/5 pointer-events-none" />
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            ¿Por qué <span className="text-primary">Publify</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Porque tu negocio editorial merece operar con la misma claridad que cualquier empresa seria.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-6 bg-card border border-border rounded-xl hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm font-medium text-primary mb-3">{item.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
