
import { motion } from "framer-motion";
import { LineChart, Check } from "lucide-react";
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

export const FinanceSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-muted/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="rounded-full bg-primary/10 p-3 w-14 h-14 flex items-center justify-center text-primary mb-6">
              <LineChart size={28} />
            </div>
            <h2 className="font-heading text-3xl font-bold mb-6">Finanzas bajo control</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Módulo en desarrollo que transformará la forma en que analizas tus resultados
            </p>
            <ul className="space-y-4">
              {[
                "Importa CSV de tus regalías automáticamente",
                "Conecta gastos por libro y campaña",
                "Visualiza beneficios netos por proyecto",
                "Genera informes detallados para tu contabilidad"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <Check size={20} className="mr-2 text-primary flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="text-center p-6">
              <p className="text-primary font-medium mb-2">Módulo en desarrollo</p>
              <h3 className="text-xl font-heading font-bold mb-4">Disponible próximamente</h3>
              <motion.div 
                initial={{ scale: 0.9, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 1.5 
                }}
              >
                <Button onClick={() => navigate("/finanzas")} variant="outline">
                  Vista previa
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
