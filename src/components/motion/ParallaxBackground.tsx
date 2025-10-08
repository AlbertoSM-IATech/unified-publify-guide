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
      {/* Capa 1: Gradientes grandes y visibles con movimiento parallax */}
      <motion.div 
        style={{ y: y3, opacity }}
        className="absolute inset-0"
      >
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(24 94% 59% / 0.35) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(217 91% 60% / 0.3) 0%, transparent 60%)",
              "radial-gradient(circle at 60% 30%, hsl(24 94% 59% / 0.4) 0%, transparent 60%), radial-gradient(circle at 40% 70%, hsl(217 91% 60% / 0.35) 0%, transparent 60%)",
              "radial-gradient(circle at 20% 50%, hsl(24 94% 59% / 0.35) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(217 91% 60% / 0.3) 0%, transparent 60%)"
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Capa 2: Orbes flotantes grandes y brillantes con parallax medio */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className={`absolute rounded-full ${
              i % 2 === 0 ? 'bg-primary/40 blur-[120px]' : 'bg-accent/35 blur-[100px]'
            }`}
            style={{
              width: `${180 + Math.random() * 150}px`,
              height: `${180 + Math.random() * 150}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5
            }}
          />
        ))}
      </motion.div>

      {/* Capa 3: Formas geométricas abstractas brillantes con parallax rápido */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {/* Círculos decorativos grandes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute border-4 border-primary/30 rounded-full"
            style={{
              width: `${250 + i * 80}px`,
              height: `${250 + i * 80}px`,
              left: `${15 + i * 12}%`,
              top: `${5 + i * 12}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Gradientes rotativos grandes */}
        <motion.div
          style={{ rotate }}
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/15 to-transparent rounded-full blur-[100px]" />
        </motion.div>

        <motion.div
          style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, -360]) }}
          className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px]"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-accent/25 via-accent/15 to-transparent rounded-full blur-[100px]" />
        </motion.div>

        {/* Formas adicionales en las esquinas */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-[80px]"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-accent/20 to-transparent rounded-full blur-[80px]"
        />
      </motion.div>

      {/* Capa 4: Partículas de luz brillantes con parallax muy rápido */}
      <motion.div style={{ y: y1, scale }} className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'w-3 h-3 bg-primary/60' : i % 3 === 1 ? 'w-2 h-2 bg-accent/60' : 'w-1 h-1 bg-primary/80'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${10 + Math.random() * 20}px ${i % 2 === 0 ? 'hsl(24 94% 59% / 0.5)' : 'hsl(217 91% 60% / 0.5)'}`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 2, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>

      {/* Grid pattern overlay visible con parallax */}
      <motion.div 
        style={{ y: y2, opacity: useTransform(scrollYProgress, [0, 1], [0.08, 0]) }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(24 94% 59% / 0.3) 2px, transparent 2px),
              linear-gradient(90deg, hsl(217 91% 60% / 0.3) 2px, transparent 2px)
            `,
            backgroundSize: '80px 80px'
          }}
        />
      </motion.div>

      {/* Líneas diagonales animadas más visibles */}
      <motion.div 
        style={{ y: y2 }}
        className="absolute inset-0 opacity-20"
      >
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 35%, hsl(24 94% 59% / 0.25) 50%, transparent 65%),
              linear-gradient(-45deg, transparent 35%, hsl(217 91% 60% / 0.2) 50%, transparent 65%)
            `,
            backgroundSize: '250px 250px'
          }}
        />
      </motion.div>
    </div>
  );
};
