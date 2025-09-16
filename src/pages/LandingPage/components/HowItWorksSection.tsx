import { motion } from "framer-motion";
import { Link, Settings, TrendingUp } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const steps = [
  {
    number: "01",
    icon: Link,
    title: "Conecta",
    description: "Conecta tus activos y define tu catálogo."
  },
  {
    number: "02",
    icon: Settings,
    title: "Organiza",
    description: "Organiza campañas y procesos con plantillas simples."
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Crece",
    description: "Crece con automatizaciones y métricas que sí entiendes."
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cómo funciona
            </h2>
            <p className="text-xl text-muted-foreground">
              Tres pasos simples para transformar tu negocio editorial
            </p>
          </div>

          <div className="relative">
            {/* Progress line */}
            <motion.div 
              className="absolute top-20 left-0 right-0 h-0.5 bg-border hidden md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.div 
              className="absolute top-20 left-0 h-0.5 bg-primary hidden md:block"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />

            <div className="grid md:grid-cols-3 gap-8 md:gap-4 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.3 }}
                  className="text-center relative"
                >
                  {/* Step number circle */}
                  <div className="relative mx-auto w-16 h-16 mb-6">
                    <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold shadow-lg relative z-10">
                      {step.number}
                    </div>
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-primary"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(251, 146, 60, 0.4)",
                          "0 0 0 15px rgba(251, 146, 60, 0)",
                          "0 0 0 0 rgba(251, 146, 60, 0.4)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 mx-auto mb-4 bg-card border border-border rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};