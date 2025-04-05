import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
const highlightVariants = {
  hidden: {
    width: "0%"
  },
  visible: {
    width: "100%",
    transition: {
      delay: 1.2,
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};
const buttonHoverVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 0 15px rgba(251, 146, 60, 0.5)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};
export const Hero = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/register");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return <motion.section initial="hidden" whileInView="visible" viewport={{
    once: true
  }} className="relative flex flex-1 flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-[#FB923C]/20 rounded-full blur-[80px]" />
      </div>
      
      <div className="mx-auto max-w-4xl text-center relative">
        <motion.h1 variants={fadeIn} className="font-heading text-4xl font-bold tracking-tight md:text-5xl text-teal-50 px-0 py-[10px] my-0 mx-[20px] lg:text-6xl">
          Gestiona y haz crecer tu editorial de{" "}
          <span className="relative inline-block">
            <span className="text-orange-400">KDP</span>
            <motion.span className="absolute bottom-1 left-0 h-[6px] bg-[#FB923C]/40 rounded-full" variants={highlightVariants} />
          </span>{" "}
          desde un solo lugar
        </motion.h1>
        
        <motion.p variants={fadeIn} className="mt-6 text-lg font-light text-orange-400 md:text-2xl">Publify es tu Centro de Control para Publishers y Editoriales independientes. Unifica tu biblioteca, automatiza tu Marketing. Domina tu negocio editorial y elimina el caos del día a día.</motion.p>
        
        <motion.div variants={fadeIn} className="mt-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          <motion.div variants={buttonHoverVariants} whileHover="hover">
            <Button onClick={handleGetStarted} size="lg" className="group text-base bg-gradient-to-r from-primary to-[#FB923C] hover:shadow-lg hover:shadow-primary/20 py-[30px] px-[60px]">
              Quiero probar Publify
              <motion.div className="ml-2 flex items-center" initial={{
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
          
          <motion.div variants={buttonHoverVariants} whileHover="hover">
            <Button variant="outline" onClick={handleLogin} size="lg" className="text-base border-[#FB923C]/30 hover:border-[#FB923C]/80 hover:bg-[#FB923C]/10 px-[60px] py-[30px]">
              <Sparkles size={18} className="mr-2 text-[#FB923C]" />
              Solicitar acceso anticipado
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>;
};