import { motion } from "framer-motion";
import { CheckCircle, Focus, Database, Headphones, Zap, Shield } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const benefits = [
  {
    icon: Database,
    text: "Tu catálogo vive en Publify. Con fichas claras, archivos, metadatos y enlaces."
  },
  {
    icon: CheckCircle,
    text: "Ya no usas excels ni docs perdidos."
  },
  {
    icon: Zap,
    text: "Tienes un flujo claro: idea → producción → publicación → postventa."
  },
  {
    icon: Shield,
    text: "Tu equipo está alineado. Todo está en el mismo sitio."
  },
  {
    icon: Focus,
    text: "No repites datos. No pierdes tiempo. No improvisas."
  }
];

export const KeyBenefitsSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
            📊 ¿Cómo sabes que Publify está funcionando?
          </h2>
          <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto">
            Resultados reales que verás desde el primer día
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-center gap-4 p-6 bg-card border border-border rounded-xl hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <p className="text-base font-medium text-foreground leading-relaxed">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};