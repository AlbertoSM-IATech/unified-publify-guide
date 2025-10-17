import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const MainCtaSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleContacto = () => {
    navigate("/contacto");
  };

  return (
    <section id="cta-final" className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5" />
      
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Tu editorial KDP, sin humo ni caos.
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Empieza gratis con el plan Starter. Activa Pro cuando lo necesites. Publify crece contigo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                onClick={handleContacto}
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary hover:shadow-2xl hover:shadow-primary/30"
              >
                📅 Agendar demo
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleGetStarted}
                className="text-lg px-8 py-6 border-primary/30 hover:border-primary/80"
              >
                📆 Empezar ahora
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};