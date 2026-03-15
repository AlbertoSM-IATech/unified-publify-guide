import { motion } from "framer-motion";
import {
  Library,
  CalendarDays,
  Target,
  Calculator,
  Lightbulb,
  FolderOpen,
  Workflow,
  Layers,
  BarChart3,
  QrCode,
  TrendingUp,
} from "lucide-react";

const controls = [
  {
    icon: Library,
    title: "Catálogo completo",
    desc: "Todos tus libros organizados por series y marketplaces",
  },
  {
    icon: CalendarDays,
    title: "Calendario editorial",
    desc: "Planifica lanzamientos y producción con fechas claras",
  },
  {
    icon: Target,
    title: "Scoring de nichos y KW",
    desc: "Evalúa viabilidad antes de producir un solo libro",
  },
  {
    icon: Calculator,
    title: "Costes y viabilidad por libro",
    desc: "Sabe si un libro es rentable antes de crearlo",
  },
  {
    icon: Lightbulb,
    title: "Espacio para pensar y planificar",
    desc: "Notas, ideas e investigación en contexto",
  },
  {
    icon: FolderOpen,
    title: "Espacio para producir y guardar",
    desc: "Assets, manuscritos y portadas centralizados",
  },
  {
    icon: Workflow,
    title: "Pipeline de producción",
    desc: "Tareas, datos, audiencia, finanzas y assets por libro",
  },
  {
    icon: Layers,
    title: "Control de formatos",
    desc: "Físico, ebook — cada formato con sus datos propios",
  },
  {
    icon: BarChart3,
    title: "Rendimiento de KW y Ads",
    desc: "Campañas, inversión y retorno por libro",
  },
  {
    icon: QrCode,
    title: "QRs personalizados",
    desc: "Crea códigos QR para tus libros en segundos",
  },
  {
    icon: TrendingUp,
    title: "Rentabilidad real",
    desc: "Ingresos y gastos a nivel micro (libro) y macro (negocio)",
  },
];

export const ControlSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            Qué controla Publify{" "}
            <span className="text-primary">en tu editorial</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un solo sistema para operar cada área de tu negocio editorial. Sin
            parches, sin herramientas sueltas.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {controls.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group p-5 bg-card border border-border rounded-xl hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
