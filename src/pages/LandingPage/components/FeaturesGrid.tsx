import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, BookMarked, LineChart, Settings, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};
const staggerContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};
const featureCardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 25px 30px -15px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};
const iconAnimationVariants = {
  hidden: {
    scale: 0.8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  },
  hover: {
    rotate: [0, -10, 10, -5, 0],
    transition: {
      duration: 0.6
    }
  }
};
export const FeaturesGrid = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const features = [{
    icon: <BookOpen size={24} />,
    title: "Biblioteca Digital",
    description: "Gestiona todos tus libros, colecciones e investigaciones en un solo lugar. Organiza la información de manera eficiente."
  }, {
    icon: <BookMarked size={24} />,
    title: "Fichas de Libros",
    description: "Crea fichas detalladas para cada libro con toda la información relevante: ISBN, ASIN, portadas, estados y más."
  }, {
    icon: <LineChart size={24} />,
    title: "Finanzas Editoriales",
    description: "Controla tus ingresos y gastos editoriales. Visualiza gráficos de rendimiento y exporta informes detallados."
  }, {
    icon: <Settings size={24} />,
    title: "Marketing Integrado",
    description: "Integración con plataformas de marketing para potenciar la visibilidad de tus libros."
  }];
  return <motion.section ref={ref} className="relative bg-muted/30 px-4 py-16 md:py-24 overflow-hidden">
      {/* Animated background */}
      <motion.div className="absolute inset-0 -z-10 pointer-events-none" style={{
      y: backgroundY
    }}>
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-background to-transparent opacity-70" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-background/20 to-transparent opacity-70" />
        <div className="absolute top-1/3 left-1/4 w-1/3 h-1/3 rounded-full bg-[#FB923C]/10 blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 rounded-full bg-primary/10 blur-[100px]" />
      </motion.div>
      
      <div className="mx-auto max-w-7xl">
        <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={fadeIn}>
          <motion.div initial={{
          opacity: 0,
          scale: 0
        }} whileInView={{
          opacity: 1,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 20
          }
        }} viewport={{
          once: true
        }} className="w-16 h-1 bg-gradient-to-r from-primary to-[#FB923C] mx-auto mb-6 rounded-full" />
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Características Principales</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Publify ofrece todas las herramientas que necesitas para gestionar tu actividad editorial de forma eficiente
          </p>
        </motion.div>
        
        <motion.div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={staggerContainer}>
          {features.map((feature, index) => <motion.div key={index} variants={featureCardVariants} whileHover="hover" className="card-hover group rounded-lg border bg-card p-6 shadow-sm relative overflow-hidden backdrop-blur-sm">
              {/* Decorative background element */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[#FB923C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon with animation */}
              <motion.div className="mb-4 rounded-full bg-gradient-to-br from-primary/10 to-[#FB923C]/10 p-3 text-primary group-hover:bg-[#FB923C] group-hover:text-primary-foreground transition-colors relative z-10" variants={iconAnimationVariants} whileHover="hover">
                {feature.icon}
              </motion.div>
              
              <h3 className="mb-2 font-heading text-xl font-medium relative z-10">{feature.title}</h3>
              <p className="text-muted-foreground relative z-10">{feature.description}</p>
              
              <motion.div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-[#FB923C] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </motion.div>)}
        </motion.div>
        
        {/* CTA below features */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.4,
        duration: 0.6
      }} className="mt-14 text-center">
          <motion.div whileHover={{
          scale: 1.05
        }} transition={{
          type: "spring",
          stiffness: 400,
          damping: 10
        }}>
            <Button onClick={() => navigate("/features")} size="lg" className="bg-[#FB923C] hover:bg-[#FB923C]/90 hover:shadow-lg hover:shadow-[#FB923C]/20 px-[60px] py-[30px]">
              Descubrir todas las funciones
              <motion.div className="ml-2" initial={{
              x: 0
            }} whileHover={{
              x: 5
            }} transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}>
                <ArrowRight size={20} />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>;
};