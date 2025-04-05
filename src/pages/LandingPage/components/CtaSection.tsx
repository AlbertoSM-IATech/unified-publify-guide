
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

// Pulsing animation keyframes
const pulseAnimation = {
  initial: { boxShadow: "0 0 0 0 rgba(251, 146, 60, 0.4)" },
  animate: {
    boxShadow: "0 0 0 15px rgba(251, 146, 60, 0)",
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

const floatingIconVariants = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 0, -10],
    transition: {
      repeat: Infinity,
      duration: 3,
      ease: "easeInOut"
    }
  }
};

export const CtaSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <motion.section 
      ref={ref}
      className="relative px-4 py-20 md:py-28 overflow-hidden"
    >
      {/* Animated background gradients */}
      <motion.div 
        className="absolute inset-0 -z-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-1/2 h-1/2 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-1/3 h-1/3 rounded-full bg-[#FB923C]/20 blur-[80px]" />
      </motion.div>
      
      <motion.div 
        className="mx-auto max-w-5xl text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="flex justify-center mb-6">
          <motion.div 
            className="rounded-full bg-gradient-to-br from-primary/20 to-[#FB923C]/20 p-4 text-primary"
            variants={floatingIconVariants}
            animate="visible"
          >
            <Rocket size={32} className="text-[#FB923C]" />
          </motion.div>
        </div>
        
        <motion.h2 
          className="font-heading text-4xl font-bold mb-6"
          variants={fadeIn}
        >
          Haz <span className="relative inline-block">
            despegar
            <motion.span 
              className="absolute bottom-1 left-0 h-[6px] w-full bg-[#FB923C]/40 rounded-full" 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </span> tu editorial
        </motion.h2>
        
        <motion.p 
          className="mb-10 text-lg text-muted-foreground mx-auto max-w-2xl"
          variants={fadeIn}
        >
          Empieza hoy con la herramienta que transforma tu operativa editorial desde el minuto uno.
        </motion.p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              initial="initial"
              animate="animate"
              variants={pulseAnimation}
              className="inline-block rounded-md"
            >
              <Button 
                onClick={handleGetStarted}
                className="text-lg px-8 py-6 shadow-lg bg-gradient-to-r from-primary to-[#FB923C] hover:shadow-[#FB923C]/20 hover:shadow-xl"
                size="lg"
              >
                <Sparkles size={18} className="mr-2" />
                Solicitar acceso anticipado
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              variant="outline"
              onClick={() => navigate("/demo")} 
              className="text-lg px-8 py-6 border-[#FB923C]/30 hover:border-[#FB923C]/80 hover:bg-[#FB923C]/10"
              size="lg"
            >
              Ver demo
              <motion.div
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};
