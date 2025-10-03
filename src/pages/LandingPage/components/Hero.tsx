import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import publisherWorking from "@/assets/publisher-working.png";
const fadeIn = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
const highlightVariants = {
  hidden: {
    width: "0%"
  },
  visible: {
    width: "100%",
    transition: {
      delay: 1.2,
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};
const buttonHoverVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0 0 15px rgba(251, 146, 60, 0.5)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};
const videoContainerVariants = {
  hover: {
    boxShadow: "0 0 25px rgba(251, 146, 60, 0.4)",
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 15
    }
  }
};
export const Hero = () => {
  const navigate = useNavigate();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const handleGetStarted = () => {
    navigate("/register");
  };
  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };
  return <motion.section initial="hidden" whileInView="visible" viewport={{
    once: true
  }} className="relative flex flex-1 flex-col items-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Publisher illustration background */}
      <div 
        className="absolute inset-0 -z-20 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url(${publisherWorking})`,
          backgroundSize: 'contain',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Animated gradient mesh */}
        <motion.div 
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(217 91% 60% / 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, hsl(var(--primary) / 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 20%, hsl(var(--primary) / 0.2) 0%, transparent 50%), radial-gradient(circle at 60% 80%, hsl(217 91% 60% / 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 40%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 60% 70%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 40%, hsl(217 91% 60% / 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 60%, hsl(var(--primary) / 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating orbs */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-32 h-32 rounded-full blur-[60px] ${
              i % 2 === 0 ? 'bg-primary/20' : 'bg-accent/15'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
        
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Animated diagonal lines */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 40%, hsl(var(--primary) / 0.1) 50%, transparent 60%),
              linear-gradient(-45deg, transparent 40%, hsl(217 91% 60% / 0.1) 50%, transparent 60%)
            `,
            backgroundSize: '200px 200px'
          }}
        />
      </div>
      
      <div className="mx-auto max-w-7xl w-full">
        {/* Trust signal */}
        <motion.div variants={fadeIn} className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FB923C]/10 border border-[#FB923C]/20 py-2 text-sm font-medium text-[#FB923C] mx-[7px] my-0 px-[56px] rounded-3xl">
            <Sparkles size={16} />
            <span>La plataforma todo-en-uno para publishers de Amazon KDP</span>
          </div>
        </motion.div>

        {/* Title - Full width */}
        <div className="text-center mb-16">
          <motion.h1 variants={fadeIn} className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-8">
            Ordena tu catálogo KDP.{" "}
            <span className="relative inline-block">
              <span className="text-primary">Centraliza tu marketing.</span>
              <motion.span className="absolute bottom-1 left-0 h-[6px] bg-primary/40 rounded-full" variants={highlightVariants} />
            </span>{" "}
            Controla tus números.
          </motion.h1>
        </div>

        {/* Content - Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Publify es tu hub operativo para Amazon KDP. Te ayudamos a trabajar con calma: 
              una sola fuente de verdad para tu biblioteca, campañas y finanzas.
            </motion.p>

            {/* Pain points */}
            <motion.div variants={fadeIn} className="mb-8 p-6 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800/30">
              <h3 className="font-semibold text-red-800 dark:text-red-300 mb-3">
                ¿Te suena familiar?
              </h3>
              <ul className="text-sm text-red-700 dark:text-red-400 space-y-2">
                <li>• Archivos perdidos entre Google Drive, Dropbox y tu PC</li>
                <li>• No sabes cuánto ganas realmente con cada libro</li>
                <li>• Gestionar marketing desde 7 plataformas diferentes</li>
                <li>• Perder clientes potenciales por falta de seguimiento</li>
              </ul>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <motion.div variants={buttonHoverVariants} whileHover="hover">
                <Button onClick={handleGetStarted} size="lg" className="group text-lg w-full sm:w-auto bg-gradient-to-r from-primary to-primary hover:shadow-lg hover:shadow-primary/20 py-6 px-8">
                  Acceso prioritario
                  <motion.div className="ml-2 flex items-center" initial={{
                  x: 0
                }} whileHover={{
                  x: 5
                }} transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}>
                    <ArrowRight size={20} />
                  </motion.div>
                </Button>
              </motion.div>
              
              <Button variant="outline" onClick={handlePlayVideo} size="lg" className="text-lg w-full sm:w-auto border-primary/30 hover:border-primary/80 hover:bg-primary/10 py-6 px-8">
                <Play size={18} className="mr-2" />
                Ver vídeo
              </Button>
            </motion.div>

            {/* Social proof numbers */}
            <motion.div variants={fadeIn} className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">200+</span>
                <span>Publishers activos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">5 horas</span>
                <span>Ahorradas por semana</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">100%</span>
                <span>En español</span>
              </div>
            </motion.div>
          </div>

          {/* Video/Demo section */}
          <motion.div variants={fadeIn} className="w-full flex justify-center lg:justify-end">
            <motion.div whileHover="hover" variants={videoContainerVariants} className="relative w-full max-w-md lg:max-w-full overflow-hidden rounded-xl border-2 border-[#FB923C]/20 bg-black/5 backdrop-blur-sm">
              {videoPlaying ? <AspectRatio ratio={16 / 9} className="w-full">
                  <iframe className="w-full h-full" src="https://www.youtube.com/embed/videoseries?list=PLk6VGnSO9jRyDZkngVHPyLTMdYHiG6jYe&autoplay=1&controls=1&showinfo=0&rel=0" title="Demo de Publify - Plataforma para Publishers KDP" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </AspectRatio> : <AspectRatio ratio={16 / 9} className="w-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/20 to-[#FB923C]/20">
                  <motion.div className="absolute w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" animate={{
                x: ['100%', '-100%']
              }} transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear"
              }} />
                  
                  <motion.div className="relative z-10 cursor-pointer" onClick={handlePlayVideo} whileHover={{
                scale: 1.1
              }} animate={{
                boxShadow: ['0 0 0 0 rgba(251, 146, 60, 0.4)', '0 0 0 15px rgba(251, 146, 60, 0)']
              }} transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}>
                    <div className="w-20 h-20 rounded-full bg-[#FB923C] flex items-center justify-center shadow-lg">
                      <Play size={32} className="text-white ml-1" />
                    </div>
                  </motion.div>
                  
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <p className="text-white font-semibold text-lg mb-2">
                      Descubre cómo Publify transforma tu negocio editorial
                    </p>
                    <p className="text-white/80 text-sm">
                      Ve el panel de control completo en 2 minutos
                    </p>
                  </div>
                </AspectRatio>}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>;
};