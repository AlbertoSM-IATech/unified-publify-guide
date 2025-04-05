
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const BenefitsSection = () => {
  const benefits = [
    {
      title: "Todo en uno",
      description: "Olvídate de 7 herramientas diferentes."
    },
    {
      title: "Enfocado en KDP",
      description: "Está pensado especialmente para ti."
    },
    {
      title: "Visual y claro",
      description: "Sin curva técnica de aprendizaje."
    },
    {
      title: "Te ahorra tiempo",
      description: "Automatiza tu operativa editorial."
    },
    {
      title: "Escalable con tu negocio",
      description: "Desde autores independientes hasta editoriales establecidas."
    },
    {
      title: "Interfaz intuitiva",
      description: "Diseñada pensando en la mejor experiencia de usuario."
    }
  ];

  return (
    <section id="beneficios" className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Beneficios Clave</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Descubre cómo Publify puede transformar tu proceso editorial
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index} 
              className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all"
              variants={fadeIn}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Check size={24} className="mb-4 text-primary" />
              <h3 className="mb-2 font-heading text-lg font-medium">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
