import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxBackgroundProps {
  className?: string;
}

/**
 * Fondo abstracto con ondas y efecto parallax
 * Se adapta al modo claro/oscuro usando colores de marca
 */
export const ParallaxBackground = ({ className = "" }: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Transformaciones parallax para diferentes capas de ondas
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const y3 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const y4 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className={`fixed inset-0 overflow-hidden -z-50 ${className}`}>
      {/* Fondo base que se adapta al tema */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Capa 1: Ondas grandes de fondo (más lentas) */}
      <motion.div style={{ y: y4 }} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 800">
          <motion.path
            d="M0,200 C320,280 420,120 720,200 C1020,280 1220,120 1440,200 L1440,800 L0,800 Z"
            className="fill-primary/5 dark:fill-primary/10"
            animate={{
              d: [
                "M0,200 C320,280 420,120 720,200 C1020,280 1220,120 1440,200 L1440,800 L0,800 Z",
                "M0,250 C320,170 420,270 720,190 C1020,170 1220,270 1440,190 L1440,800 L0,800 Z",
                "M0,200 C320,280 420,120 720,200 C1020,280 1220,120 1440,200 L1440,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </motion.div>

      {/* Capa 2: Ondas medianas con acento (velocidad media) */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 800">
          <motion.path
            d="M0,400 C240,320 480,480 720,400 C960,320 1200,480 1440,400 L1440,800 L0,800 Z"
            className="fill-accent/5 dark:fill-accent/10"
            animate={{
              d: [
                "M0,400 C240,320 480,480 720,400 C960,320 1200,480 1440,400 L1440,800 L0,800 Z",
                "M0,350 C240,430 480,290 720,370 C960,450 1200,310 1440,390 L1440,800 L0,800 Z",
                "M0,400 C240,320 480,480 720,400 C960,320 1200,480 1440,400 L1440,800 L0,800 Z"
              ]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </svg>
      </motion.div>

      {/* Capa 3: Líneas de luz naranjas/coral (parallax rápido) */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 opacity-80">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`wave-line-${i}`}
            className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent dark:from-transparent dark:via-primary dark:to-transparent"
            style={{
              top: `${10 + i * 12}%`,
              opacity: 0.3
            }}
            animate={{
              x: ['-100%', '200%'],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5
            }}
          />
        ))}
      </motion.div>

      {/* Capa 4: Ondas superiores con brillo (parallax más rápido) */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1440 800">
          <motion.path
            d="M0,100 C360,50 480,150 720,100 C960,50 1080,150 1440,100 L1440,0 L0,0 Z"
            className="fill-primary/10 dark:fill-primary/15"
            animate={{
              d: [
                "M0,100 C360,50 480,150 720,100 C960,50 1080,150 1440,100 L1440,0 L0,0 Z",
                "M0,120 C360,170 480,70 720,140 C960,190 1080,90 1440,140 L1440,0 L0,0 Z",
                "M0,100 C360,50 480,150 720,100 C960,50 1080,150 1440,100 L1440,0 L0,0 Z"
              ]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.path
            d="M0,150 C300,100 600,200 900,150 C1200,100 1350,200 1440,150 L1440,0 L0,0 Z"
            className="fill-accent/8 dark:fill-accent/12"
            animate={{
              d: [
                "M0,150 C300,100 600,200 900,150 C1200,100 1350,200 1440,150 L1440,0 L0,0 Z",
                "M0,180 C300,230 600,130 900,180 C1200,230 1350,130 1440,180 L1440,0 L0,0 Z",
                "M0,150 C300,100 600,200 900,150 C1200,100 1350,200 1440,150 L1440,0 L0,0 Z"
              ]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </svg>
      </motion.div>

      {/* Capa 5: Partículas de luz flotantes */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-primary/40 dark:bg-primary/60 blur-sm"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>

      {/* Capa 6: Gradientes circulares flotantes */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`gradient-orb-${i}`}
            className="absolute rounded-full"
            style={{
              background: i % 2 === 0 
                ? 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)',
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              filter: 'blur(60px)'
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </motion.div>

      {/* Grid sutil que se desvanece con el scroll */}
      <motion.div 
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.3], [0.05, 0])
        }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.05) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </motion.div>
    </div>
  );
};
