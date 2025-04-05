
import { motion } from "framer-motion";

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

export const ChaosSection = () => {
  return (
    <section className="bg-muted/30 px-4 py-16 md:py-24">
      <motion.div 
        className="mx-auto max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center"
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">El Caos de Publicar sin Sistema</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            La gestión editorial tradicional implica múltiples herramientas y un constante cambio de contexto
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={staggerContainer}
        >
          {[
            {
              title: "Dispersión de datos",
              description: "Tu biblioteca está repartida entre Excel, Notion, Drive y carpetas infinitas."
            },
            {
              title: "Marketing manual",
              description: "Tu marketing es reactivo, manual y nada escalable."
            },
            {
              title: "Tiempo perdido",
              description: "Pierdes horas cada semana en tareas repetitivas."
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="mb-2 font-heading text-xl font-medium">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-12 text-center"
          variants={fadeIn}
        >
          <p className="text-lg font-medium">
            <span className="text-primary">Publify</span> pone orden, foco y automatización en el corazón de tu negocio editorial.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
