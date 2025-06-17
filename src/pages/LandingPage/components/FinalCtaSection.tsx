
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Clock, Users } from "lucide-react";

const urgencyPoints = [
  "47 plazas restantes para acceso anticipado",
  "Precio especial válido solo hasta fin de mes",
  "Más de 200 autores se unieron esta semana"
];

const finalBenefits = [
  "14 días gratis sin riesgo",
  "Configuración incluida por expertos",
  "Garantía de devolución 30 días",
  "Soporte prioritario en español",
  "Acceso a comunidad privada VIP"
];

export const FinalCtaSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-[#FB923C] to-primary text-white relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
        <div className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full bg-white/5" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full bg-white/5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Únete a los autores que ya están triunfando
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            No pierdas más tiempo con herramientas dispersas. 
            Centraliza, automatiza y multiplica tu negocio editorial desde hoy.
          </p>

          {/* Urgency indicators */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {urgencyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur p-4 rounded-lg border border-white/20"
              >
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium text-sm">{point}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="bg-white text-[#FB923C] hover:bg-gray-100 px-12 py-6 text-xl font-bold shadow-xl"
            >
              Comenzar mi prueba gratuita ahora
            </Button>
            <p className="text-sm mt-3 opacity-80">
              Sin tarjeta de crédito • Acceso inmediato • Cancela cuando quieras
            </p>
          </motion.div>

          {/* Final benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-5 gap-4 text-sm opacity-90"
          >
            {finalBenefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 justify-center">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </motion.div>

          {/* Social proof reminder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 pt-8 border-t border-white/20"
          >
            <div className="flex items-center justify-center gap-4 text-lg">
              <Users className="w-6 h-6" />
              <span>Más de 2,847 autores ya han transformado su negocio</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
