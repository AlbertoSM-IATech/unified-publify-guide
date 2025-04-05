import { motion, useScroll, useTransform } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
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
const cardVariants = {
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
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};
const checkmarkAnimation = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};
export const BenefitsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const benefits = [{
    title: "Todo en uno",
    description: "Olvídate de 7 herramientas diferentes."
  }, {
    title: "Enfocado en KDP",
    description: "Está pensado especialmente para ti."
  }, {
    title: "Visual y claro",
    description: "Sin curva técnica de aprendizaje."
  }, {
    title: "Te ahorra tiempo",
    description: "Automatiza tu operativa editorial."
  }, {
    title: "Escalable con tu negocio",
    description: "Desde autores independientes hasta editoriales establecidas."
  }, {
    title: "Interfaz intuitiva",
    description: "Diseñada pensando en la mejor experiencia de usuario."
  }];
  return <motion.section ref={ref} id="beneficios" className="relative px-4 py-16 md:py-24 overflow-hidden">
      {/* Animated background */}
      <motion.div className="absolute inset-0 -z-10 pointer-events-none" style={{
      y: backgroundY
    }}>
        <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-[#FB923C]/20 blur-[80px]" />
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
        }} className="w-16 h-1 bg-gradient-to-r from-[#FB923C] to-primary mx-auto mb-6 rounded-full" />
          <h2 className="font-heading text-3xl font-bold md:text-4xl">Beneficios Clave</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Descubre cómo Publify puede transformar tu proceso editorial
          </p>
        </motion.div>
        
        <motion.div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={staggerContainer}>
          {benefits.map((benefit, index) => <motion.div key={index} className="rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all relative backdrop-blur-sm" variants={cardVariants} whileHover="hover">
              {/* Gradient highlight on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[#FB923C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-4 relative">
                <div className="rounded-full bg-[#FB923C]/10 p-2 w-10 h-10 flex items-center justify-center text-[#FB923C]">
                  <motion.div>
                    <Check size={24} />
                  </motion.div>
                </div>
              </div>
              
              <h3 className="mb-2 font-heading text-lg font-medium">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
              
              {/* Animated underline on hover */}
              <motion.div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary to-[#FB923C] origin-left" initial={{
            scaleX: 0
          }} whileHover={{
            scaleX: 1,
            transition: {
              duration: 0.3
            }
          }} />
            </motion.div>)}
        </motion.div>
        
        {/* CTA after benefits */}
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
            <Button onClick={() => navigate("/register")} size="lg" className="bg-gradient-to-r from-[#FB923C] to-primary hover:shadow-lg hover:shadow-[#FB923C]/20 px-[60px] py-[30px] text-lg font-semibold">
              Experimenta los beneficios
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