import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
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
      stiffness: 200,
      damping: 20
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};
export const ChaosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  return <motion.section ref={ref} className="relative bg-muted/30 px-4 py-16 md:py-24 overflow-hidden">
      {/* Background gradient effect */}
      <motion.div className="absolute inset-0 bg-gradient-to-b from-background to-muted/40 -z-10" style={{
      opacity: backgroundOpacity
    }} />
      
      {/* Animated patterns */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        {[...Array(5)].map((_, i) => <motion.div key={i} className="absolute rounded-full bg-[#FB923C]/30" initial={{
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`,
        width: `${Math.random() * 20 + 5}rem`,
        height: `${Math.random() * 20 + 5}rem`
      }} animate={{
        x: `${Math.random() * 100}%`,
        y: `${Math.random() * 100}%`
      }} transition={{
        repeat: Infinity,
        repeatType: "reverse",
        duration: Math.random() * 15 + 10
      }} style={{
        filter: "blur(50px)"
      }} />)}
      </div>
      
      <div className="mx-auto max-w-7xl px-[22px]">
        <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{
        once: true
      }}>
          <motion.h2 className="font-heading text-3xl font-bold md:text-4xl" variants={fadeIn}>
            El Caos de Publicar sin Sistema
          </motion.h2>
          <motion.p className="mx-auto mt-4 max-w-2xl text-muted-foreground" variants={fadeIn}>
            La gestión editorial tradicional implica múltiples herramientas y un constante cambio de contexto
          </motion.p>
        </motion.div>
        
        <motion.div initial="hidden" whileInView="visible" viewport={{
        once: true,
        margin: "-100px"
      }} variants={staggerContainer} className="mt-16 grid grid-cols-3 gap-8 md:grid-cols-3 my-0 py-0 px-0">
          {[{
          title: "Dispersión de datos",
          description: "Tu biblioteca está repartida entre Excel, Notion, Drive y carpetas infinitas."
        }, {
          title: "Marketing manual",
          description: "Tu marketing es reactivo, manual y nada escalable."
        }, {
          title: "Tiempo perdido",
          description: "Pierdes horas cada semana en tareas repetitivas."
        }].map((item, index) => <motion.div key={index} variants={cardVariants} whileHover="hover" className="rounded-lg border bg-card p-6 shadow-sm backdrop-blur-sm">
              <div className="mb-4 rounded-full bg-[#FB923C]/20 p-3 w-12 h-12 flex items-center justify-center text-[#FB923C] py-[40px] px-[40px]">
                {index + 1}
              </div>
              <h3 className="mb-2 font-heading text-xl font-medium">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>)}
        </motion.div>
        
        <motion.div className="mt-12 text-center" initial="hidden" whileInView="visible" viewport={{
        once: true
      }} variants={fadeIn}>
          <p className="text-lg font-medium mb-8">
            <span className="text-primary">Publify</span> pone orden, foco y automatización en el corazón de tu negocio editorial.
          </p>
          
          <motion.div whileHover={{
          scale: 1.05
        }} transition={{
          type: "spring",
          stiffness: 400,
          damping: 10
        }}>
            <Button size="lg" onClick={() => navigate("/register")} className="group bg-[#FB923C] hover:bg-[#FB923C]/90 shadow-lg shadow-[#FB923C]/20 px-[60px] py-[30px] ">
              <Zap size={18} className="mr-2" />
              Ordena tu caos ahora
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>;
};