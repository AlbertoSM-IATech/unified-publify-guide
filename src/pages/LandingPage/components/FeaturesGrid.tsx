
import { motion } from "framer-motion";
import { BookOpen, BookMarked, LineChart, Settings } from "lucide-react";

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

export const FeaturesGrid = () => {
  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "Biblioteca Digital",
      description: "Gestiona todos tus libros, colecciones e investigaciones en un solo lugar. Organiza la información de manera eficiente."
    },
    {
      icon: <BookMarked size={24} />,
      title: "Fichas de Libros",
      description: "Crea fichas detalladas para cada libro con toda la información relevante: ISBN, ASIN, portadas, estados y más."
    },
    {
      icon: <LineChart size={24} />,
      title: "Finanzas Editoriales",
      description: "Controla tus ingresos y gastos editoriales. Visualiza gráficos de rendimiento y exporta informes detallados."
    },
    {
      icon: <Settings size={24} />,
      title: "Marketing Integrado",
      description: "Integración con plataformas de marketing para potenciar la visibilidad de tus libros."
    }
  ];

  return (
    <section className="bg-muted/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Características Principales</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Publify ofrece todas las herramientas que necesitas para gestionar tu actividad editorial de forma eficiente
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="card-hover group rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-heading text-xl font-medium">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
