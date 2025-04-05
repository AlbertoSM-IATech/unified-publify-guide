
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
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

  return (
    <motion.section 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex flex-1 flex-col items-center justify-center px-4 pt-24 pb-16 md:pt-32 md:pb-24"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1 
          variants={fadeIn}
          className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        >
          Gestiona y haz crecer tu editorial de <span className="text-primary">KDP</span> desde un solo lugar
        </motion.h1>
        <motion.p 
          variants={fadeIn}
          className="mt-6 text-lg text-muted-foreground md:text-xl"
        >
          Publify es tu centro de control para autopublicadores y editoriales modernas. Unifica tu biblioteca, 
          automatiza tu marketing y domina tu negocio editorial sin caos.
        </motion.p>
        <motion.div 
          variants={fadeIn}
          className="mt-10 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0"
        >
          <Button 
            onClick={handleGetStarted}
            className="group text-base px-8 py-6"
            size="lg"
          >
            Quiero probar Publify
            <motion.div
              className="ml-2"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <ArrowRight size={20} />
            </motion.div>
          </Button>
          <Button 
            variant="outline"
            onClick={handleLogin}
            size="lg"
            className="text-base px-8 py-6"
          >
            Solicitar acceso anticipado
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};
