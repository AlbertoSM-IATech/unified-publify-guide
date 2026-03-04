import { motion } from "framer-motion";
import { 
  FolderSync, FileWarning, ListChecks, PiggyBank, 
  MousePointerClick, LayoutPanelTop 
} from "lucide-react";

const chaosItems = [
  { icon: FolderSync, text: "Archivos duplicados y \"final-final-definitivo\"" },
  { icon: FileWarning, text: "Metadatos desalineados entre formatos (KW, ASINs, ISBN, dimensiones…)" },
  { icon: ListChecks, text: "Checklists repartidas y producción sin trazabilidad" },
  { icon: PiggyBank, text: "Finanzas por libro \"a ojo\" y sin visión global" },
  { icon: MousePointerClick, text: "Ads y decisiones desconectadas del sistema" },
  { icon: LayoutPanelTop, text: "Demasiadas pestañas para saber qué toca ahora" },
];

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4 }
  })
};

export const ChaosSection = () => {
  return (
    <section id="problema" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            ¿Te suena esto?
          </h2>
        </motion.div>

        <div className="space-y-4 mb-12">
          {chaosItems.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground text-lg leading-relaxed pt-1">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-xl md:text-2xl font-semibold text-foreground">
            El problema no es que trabajes mucho.{" "}
            <span className="text-primary">Es que trabajas sin un sistema.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
