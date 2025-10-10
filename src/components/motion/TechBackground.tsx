import { motion } from "framer-motion";

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
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Gradientes circulares flotantes grandes */}
      <motion.div 
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-30 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <motion.div 
        className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full opacity-10 dark:opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
      />

      {/* Líneas diagonales sutiles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`diagonal-${i}`}
          className="absolute h-[2px] w-full origin-left"
          style={{
            top: `${15 + i * 15}%`,
            background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)`,
            transform: 'rotate(-45deg) translateX(-100%)',
          }}
          animate={{
            x: ['0%', '200%'],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}

      {/* Partículas flotantes con efecto de profundidad */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => {
          const size = 2 + Math.random() * 6;
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
                  ? '0 0 10px hsl(var(--accent) / 0.5)'
                  : '0 0 8px hsl(var(--primary) / 0.5)',
              }}
              animate={{
                y: [0, -100 - Math.random() * 100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.6, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 10,
              }}
            />
          );
        })}
      </div>

      {/* Círculos concéntricos animados */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px]">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute inset-0 border border-primary/20 dark:border-primary/30 rounded-full"
            animate={{
              scale: [1 + i * 0.3, 2 + i * 0.3],
              opacity: [0.4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 1.3,
            }}
          />
        ))}
      </div>

      {/* Hexágonos decorativos en las esquinas */}
      <motion.div
        className="absolute top-20 left-20 w-24 h-24 opacity-5 dark:opacity-10"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
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
        className="absolute bottom-32 right-32 w-32 h-32 opacity-5 dark:opacity-10"
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
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

      {/* Ondas sutiles de datos */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02] dark:opacity-[0.05]" preserveAspectRatio="none">
        <motion.path
          d="M0,50 Q250,25 500,50 T1000,50 T1500,50 T2000,50"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          animate={{
            d: [
              "M0,50 Q250,25 500,50 T1000,50 T1500,50 T2000,50",
              "M0,50 Q250,75 500,50 T1000,50 T1500,50 T2000,50",
              "M0,50 Q250,25 500,50 T1000,50 T1500,50 T2000,50",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,100 Q300,80 600,100 T1200,100 T1800,100"
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          animate={{
            d: [
              "M0,100 Q300,80 600,100 T1200,100 T1800,100",
              "M0,100 Q300,120 600,100 T1200,100 T1800,100",
              "M0,100 Q300,80 600,100 T1200,100 T1800,100",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
};
