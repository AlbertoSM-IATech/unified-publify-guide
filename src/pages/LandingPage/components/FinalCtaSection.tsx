
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Lock, Users } from "lucide-react";

const accessBenefits = [
  "Prioridad en el onboarding",
  "Acceso preferente a actualizaciones", 
  "Acompañamiento personalizado",
  "Transición rápida y sin fricciones"
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
          <div className="flex items-center justify-center gap-3 mb-6">
            <Lock className="w-8 h-8" />
            <span className="text-2xl font-bold">Acceso Anticipado</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Publify no está disponible para todos
          </h2>
          
          <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
            Este no es un producto genérico. Está hecho para profesionales y autores 
            con visión de crecimiento real.
          </p>

          <div className="bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20 mb-8">
            <p className="text-lg mb-4">
              Si sientes que estás listo para dejar de improvisar y empezar a trabajar con estrategia...
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              {accessBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
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
              Solicitar acceso anticipado ahora
            </Button>
            <p className="text-sm mt-3 opacity-80">
              Para profesionales serios • Acompañamiento incluido • Onboarding prioritario
            </p>
          </motion.div>

          {/* Final message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-white/20"
          >
            <div className="text-lg space-y-2">
              <p className="font-bold">Esto no es el futuro del publishing.</p>
              <p>Es el presente de quienes quieren crecer con orden, datos y claridad.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
