import { motion } from "framer-motion";
import { Scene3D } from "./Scene3D";

/**
 * Fondo abstracto y tecnológico moderno
 * Usa los colores de la marca y crea un ambiente elegante
 */
export const TechBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background">
      {/* Grid de líneas tecnológicas */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
        />
      </div>

      {/* Gradientes circulares flotantes — more visible in dark */}
      <motion.div 
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10 dark:opacity-[0.25] blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-8 dark:opacity-[0.2] blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.16, 0.08],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      {/* Extra center glow for dark mode depth */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-0 dark:opacity-[0.08] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--accent) / 0.5) 40%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />

      {/* Líneas diagonales — more visible in dark */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`diagonal-${i}`}
          className="absolute h-[1px] w-full origin-left"
          style={{
            top: `${20 + i * 20}%`,
            background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.08), transparent)`,
            transform: 'rotate(-45deg) translateX(-100%)',
          }}
          animate={{
            x: ['0%', '200%'],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 18 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3,
          }}
        />
      ))}

      {/* Partículas flotantes — more visible in dark */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => {
          const size = 1.5 + Math.random() * 3;
          const isAccent = i % 3 === 0;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: isAccent 
                  ? 'hsl(var(--accent))' 
                  : 'hsl(var(--primary))',
                boxShadow: isAccent
                  ? '0 0 8px hsl(var(--accent) / 0.5)'
                  : '0 0 8px hsl(var(--primary) / 0.5)',
              }}
              animate={{
                y: [0, -80 - Math.random() * 60, 0],
                x: [0, Math.random() * 30 - 15, 0],
                opacity: [0, 0.5, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 12 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 12,
              }}
            />
          );
        })}
      </div>

      {/* Círculos concéntricos animados — more visible in dark */}
      <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px]">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute inset-0 border border-primary/10 dark:border-primary/25 rounded-full"
            animate={{
              scale: [1 + i * 0.3, 2 + i * 0.3],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      {/* Hexágonos decorativos — more visible in dark */}
      <motion.div
        className="absolute top-20 left-20 w-20 h-20 opacity-[0.04] dark:opacity-[0.12]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50 1 95 25 95 75 50 99 5 75 5 25"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          <polygon
            points="50 15 80 32 80 68 50 85 20 68 20 32"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-32 w-28 h-28 opacity-[0.04] dark:opacity-[0.12]"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon
            points="50 1 95 25 95 75 50 99 5 75 5 25"
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
          />
          <polygon
            points="50 20 75 35 75 65 50 80 25 65 25 35"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* 3D Scene — behind everything as subtle depth layer */}
      <Scene3D />
    </div>
  );
};