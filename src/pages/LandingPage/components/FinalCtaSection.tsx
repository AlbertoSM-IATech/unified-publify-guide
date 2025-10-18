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
    <section className="relative py-24 bg-gradient-to-br from-[#FB923C] via-primary to-[#FB923C] text-white overflow-hidden">
      {/* Creative background effects */}
      <div className="absolute inset-0">
        {/* Animated geometric shapes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-white/10 rounded-full backdrop-blur-sm" />
          </motion.div>
        ))}
        
        {/* Flowing waves */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              "radial-gradient(ellipse at 0% 50%, rgba(255,255,255,0.1) 0%, transparent 60%), radial-gradient(ellipse at 100% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)",
              "radial-gradient(ellipse at 100% 50%, rgba(255,255,255,0.1) 0%, transparent 60%), radial-gradient(ellipse at 0% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Exclusive access indicator */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="relative">
              <Lock className="w-10 h-10" />
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(255, 255, 255, 0.4)",
                    "0 0 0 15px rgba(255, 255, 255, 0)",
                    "0 0 0 0 rgba(255, 255, 255, 0.4)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0"
              />
            </div>
            <span className="text-3xl font-bold">Acceso Exclusivo</span>
          </motion.div>

          {/* Main headline with dramatic effect */}
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
          >
            Publify no es para{" "}
            <motion.span 
              className="relative"
              animate={{
                textShadow: [
                  "0 0 0 rgba(255,255,255,0)",
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 0 rgba(255,255,255,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              todos
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-2 bg-white/30 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 1 }}
              />
            </motion.span>
          </motion.h2>
          
          {/* Subheading with personality */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-2xl md:text-3xl mb-6 opacity-90 leading-relaxed font-light">
              Esto no es un producto genérico. Está hecho para{" "}
              <strong className="font-bold bg-white/20 px-3 py-1 rounded-lg">
                profesionales serios
              </strong>{" "}
              con visión de crecimiento real.
            </p>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-lg opacity-80"
            >
              Si eres de los que siempre busca excusas o espera que las cosas se arreglen solas...{" "}
              <span className="font-semibold">Publify no es para ti.</span>
            </motion.p>
          </motion.div>

          {/* Value proposition card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/15 backdrop-blur-lg p-8 rounded-2xl border border-white/20 mb-12 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-6">
              Pero si sientes que estás listo para dejar de improvisar...
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              {accessBenefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-300" />
                  <span className="text-lg">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main CTA with dramatic animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-white text-[#FB923C] hover:bg-gray-100 px-16 py-8 text-2xl font-bold shadow-2xl rounded-2xl"
              >
                <motion.span
                  animate={{
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🚀 Solicitar acceso anticipado
                </motion.span>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 space-y-2"
            >
              <p className="text-lg font-semibold opacity-90">
                Para profesionales serios • Acompañamiento incluido
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm opacity-80">
                <span>✅ Onboarding prioritario</span>
                <span>✅ Soporte directo</span>
                <span>✅ Acceso completo</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Final dramatic message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-white/20"
          >
            <div className="text-center space-y-4">
              <motion.p 
                className="text-3xl font-bold"
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Esto no es el futuro del publishing.
              </motion.p>
              <motion.p 
                className="text-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                Es el <strong>presente</strong> de quienes quieren crecer con{" "}
                <span className="bg-white/20 px-2 py-1 rounded">orden</span>,{" "}
                <span className="bg-white/20 px-2 py-1 rounded">datos</span> y{" "}
                <span className="bg-white/20 px-2 py-1 rounded">claridad</span>.
              </motion.p>
              
              {/* Urgency indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                className="mt-8 inline-flex items-center gap-2 bg-primary/15 border border-primary/30 px-6 py-3 rounded-full"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-primary rounded-full"
                />
                <span className="font-semibold">Solo 23 plazas disponibles este mes</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};