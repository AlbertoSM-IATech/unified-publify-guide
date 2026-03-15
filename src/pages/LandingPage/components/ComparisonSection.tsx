import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const withoutSystem = [
  "Excel para cálculos de ingresos, gastos, rentabilidad y campañas",
  "WhatsApp / Notes / Notion / Trello para notas y tareas de producción",
  "Seguimiento manual del catálogo en Drive o carpetas",
  "Google Calendar para plazos y lanzamientos",
  "KDP Reports para ver ventas (sin contexto de costes)",
  "Amazon Ads sin visión de rentabilidad real",
];

const withPublify = [
  "Todo el negocio editorial en un solo sistema",
  "Cada libro es una unidad operativa completa",
  "Datos financieros con contexto: costes, ingresos, ROI real",
  "Producción trazable de principio a fin",
  "Decisiones basadas en datos, no en intuición",
];

export const ComparisonSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-5">
            Operar una editorial{" "}
            <span className="text-primary">sin sistema vs con Publify</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sin sistema */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-destructive/20 bg-destructive/5"
          >
            <h3 className="font-heading text-lg font-bold mb-5 text-destructive">
              Sin sistema
            </h3>
            <ul className="space-y-3">
              {withoutSystem.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <X className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Con Publify */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-xl border border-accent/20 bg-accent/5"
          >
            <h3 className="font-heading text-lg font-bold mb-5 text-accent">
              Con Publify
            </h3>
            <ul className="space-y-3">
              {withPublify.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
