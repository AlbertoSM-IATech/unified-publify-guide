
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
  initial: { boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.4)" },
  animate: {
    boxShadow: "0 0 0 15px rgba(59, 130, 246, 0)",
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

export const CtaSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <section className="px-4 py-20 md:py-28">
      <motion.div 
        className="mx-auto max-w-5xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-primary/10 p-4 text-primary">
            <Rocket size={32} />
          </div>
        </div>
        <h2 className="font-heading text-4xl font-bold mb-6">Haz despegar tu editorial</h2>
        <p className="mb-10 text-lg text-muted-foreground mx-auto max-w-2xl">
          Empieza hoy con la herramienta que transforma tu operativa editorial desde el minuto uno.
        </p>
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
              className="text-lg px-8 py-6 shadow-lg"
              size="lg"
            >
              Solicitar acceso anticipado
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
