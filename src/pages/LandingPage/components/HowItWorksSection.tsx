import { motion } from "framer-motion";
import { FolderSync, BookOpen, BarChart3 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FolderSync,
    title: "Centraliza",
    description: "Centraliza lo que hoy está disperso: datos, archivos, enlaces, metadatos… todo en fichas por libro."
  },
  {
    number: "02",
    icon: BookOpen,
    title: "Estructura",
    description: "Estructura tu flujo por libro para ejecutar sin fricción: investigación, producción, mantenimiento."
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Revisa",
    description: "Revisa estado y números con una visión coherente: por libro, por colección, global."
  }
];

export const HowItWorksSection = () => {
  return (
    <section id="como-funciona" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Una estructura simple. Una operativa más clara.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center"
            >
              <div className="relative mx-auto w-16 h-16 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg">
                  {step.number}
                </div>
              </div>
              <div className="w-12 h-12 mx-auto mb-4 bg-card border border-border rounded-full flex items-center justify-center">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Nota de realismo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto bg-card border border-border rounded-lg px-6 py-4">
            Publify no cambia la realidad de Amazon. Te ayuda a trabajar con ella con estructura.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
