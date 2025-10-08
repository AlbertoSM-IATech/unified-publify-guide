import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxBackgroundProps {
  className?: string;
}

/**
 * Componente de fondo abstracto con efecto parallax
 * Compatible con los colores de marca: Coral (#FB923C) y Azul (#3B82F6)
 */
export const ParallaxBackground = ({ className = "" }: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Transformaciones parallax para diferentes elementos
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden -z-10 ${className}`}>
      {/* Capa 1: Gradientes animados con movimiento parallax lento */}
      <motion.div 
        style={{ y: y3, opacity }}
        className="absolute inset-0"
      >
        <motion.div 
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(24 94% 59% / 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(217 91% 60% / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 30%, hsl(24 94% 59% / 0.25) 0%, transparent 50%), radial-gradient(circle at 40% 70%, hsl(217 91% 60% / 0.2) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, hsl(24 94% 59% / 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(217 91% 60% / 0.15) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Capa 2: Orbes flotantes con parallax medio */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className={`absolute rounded-full blur-[80px] ${
              i % 2 === 0 ? 'bg-primary/30' : 'bg-accent/25'
            }`}
            style={{
              width: `${120 + Math.random() * 100}px`,
              height: `${120 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 150 - 75, 0],
              y: [0, Math.random() * 150 - 75, 0],
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2.5
            }}
          />
        ))}
      </motion.div>

      {/* Capa 3: Formas geométricas abstractas con parallax rápido */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {/* Círculos decorativos */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute border-2 border-primary/20 rounded-full"
            style={{
              width: `${200 + i * 50}px`,
              height: `${200 + i * 50}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 30 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i
            }}
          />
        ))}

        {/* Líneas diagonales abstractas */}
        <motion.div
          style={{ rotate }}
          className="absolute top-1/4 right-1/4 w-96 h-96"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -360]) }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl" />
        </motion.div>
      </motion.div>

      {/* Capa 4: Partículas de luz con parallax muy rápido */}
      <motion.div style={{ y: y1, scale }} className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>

      {/* Grid pattern overlay con parallax */}
      <motion.div 
        style={{ y: y2, opacity: useTransform(scrollYProgress, [0, 1], [0.02, 0]) }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </motion.div>

      {/* Líneas diagonales animadas */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 opacity-10"
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, hsl(var(--primary) / 0.15) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, hsl(var(--accent) / 0.1) 50%, transparent 60%)
            `,
            backgroundSize: '300px 300px'
          }}
        />
      </motion.div>
    </div>
  );
};
