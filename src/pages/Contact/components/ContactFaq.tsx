
import { motion } from "framer-motion";

export const ContactFaq = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card p-6 rounded-lg shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-2">¿Cuánto tiempo tarda en responder el equipo?</h3>
          <p className="text-muted-foreground">
            Normalmente respondemos en un plazo de 24 a 48 horas hábiles.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">¿Ofrecen soporte personalizado?</h3>
          <p className="text-muted-foreground">
            Sí, dependiendo de tu plan de acceso.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
