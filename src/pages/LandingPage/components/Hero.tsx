import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  
  return (
    <motion.section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true }} 
      className="relative flex flex-1 flex-col items-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-[#FB923C]/20 rounded-full blur-[80px]" />
      </div>
      
      <div className="mx-auto max-w-7xl w-full">
        {/* Trust signal */}
        <motion.div 
          variants={fadeIn} 
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-[#FB923C]/10 border border-[#FB923C]/20 rounded-full px-4 py-2 text-sm font-medium text-[#FB923C]">
            <Sparkles size={16} />
            <span>La plataforma todo-en-uno para publishers de Amazon KDP</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.h1 
              variants={fadeIn} 
              className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-6"
            >
              Deja de perder{" "}
              <span className="relative inline-block">
                <span className="text-[#FB923C]">5 horas semanales</span>
                <motion.span 
                  className="absolute bottom-1 left-0 h-[6px] bg-[#FB923C]/40 rounded-full" 
                  variants={highlightVariants} 
                />
              </span>{" "}
              saltando entre herramientas
            </motion.h1>
            
            <motion.p 
              variants={fadeIn} 
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              <strong>Publify centraliza tu negocio editorial completo:</strong> gestión de libros, 
              marketing automatizado, control financiero y CRM. Todo en español, sin líos.
            </motion.p>

            {/* Pain points */}
            <motion.div 
              variants={fadeIn} 
              className="mb-8 p-6 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800/30"
            >
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
            
            <motion.div 
              variants={fadeIn} 
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <motion.div variants={buttonHoverVariants} whileHover="hover">
                <Button 
                  onClick={handleGetStarted} 
                  size="lg" 
                  className="group text-lg w-full sm:w-auto bg-gradient-to-r from-primary to-[#FB923C] hover:shadow-lg hover:shadow-primary/20 py-6 px-8"
                >
                  Centraliza tu negocio ahora
                  <motion.div 
                    className="ml-2 flex items-center" 
                    initial={{ x: 0 }} 
                    whileHover={{ x: 5 }} 
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </Button>
              </motion.div>
              
              <Button 
                variant="outline" 
                onClick={handlePlayVideo}
                size="lg" 
                className="text-lg w-full sm:w-auto border-[#FB923C]/30 hover:border-[#FB923C]/80 hover:bg-[#FB923C]/10 py-6 px-8"
              >
                <Play size={18} className="mr-2" />
                Ver demo (2 min)
              </Button>
            </motion.div>

            {/* Social proof numbers */}
            <motion.div 
              variants={fadeIn} 
              className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
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
          <motion.div 
            variants={fadeIn} 
            className="w-full flex justify-center lg:justify-end"
          >
            <motion.div 
              whileHover="hover" 
              variants={videoContainerVariants} 
              className="relative w-full max-w-md lg:max-w-full overflow-hidden rounded-xl border-2 border-[#FB923C]/20 bg-black/5 backdrop-blur-sm"
            >
              {videoPlaying ? (
                <AspectRatio ratio={16 / 9} className="w-full">
                  <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube.com/embed/videoseries?list=PLk6VGnSO9jRyDZkngVHPyLTMdYHiG6jYe&autoplay=1&controls=1&showinfo=0&rel=0" 
                    title="Demo de Publify - Plataforma para Publishers KDP" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={16 / 9} className="w-full relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/20 to-[#FB923C]/20">
                  <motion.div 
                    className="absolute w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent" 
                    animate={{ x: ['100%', '-100%'] }} 
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }} 
                  />
                  
                  <motion.div 
                    className="relative z-10 cursor-pointer" 
                    onClick={handlePlayVideo} 
                    whileHover={{ scale: 1.1 }} 
                    animate={{
                      boxShadow: ['0 0 0 0 rgba(251, 146, 60, 0.4)', '0 0 0 15px rgba(251, 146, 60, 0)']
                    }} 
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
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
                </AspectRatio>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
