import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import publisherWorking from "@/assets/publisher-working.png";
// Animaciones espectaculares para los elementos
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
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
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Parallax para el contenido
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const handleGetStarted = () => {
    navigate("/register");
  };
  const handlePlayVideo = () => {
    setVideoPlaying(true);
  };
  return (
    <section 
      ref={sectionRef}
      className="relative flex flex-1 flex-col items-center px-4 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      {/* Publisher illustration background con parallax */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]) }}
        className="absolute inset-0 -z-20 pointer-events-none opacity-[0.04]"
      >
        <div
          style={{
            backgroundImage: `url(${publisherWorking})`,
            backgroundSize: 'contain',
            backgroundPosition: 'right center',
            backgroundRepeat: 'no-repeat',
            height: '100%',
            width: '100%'
          }}
        />
      </motion.div>
      
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto max-w-7xl w-full"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Trust signal */}
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 py-2 text-sm font-medium text-primary mx-[7px] my-0 px-[56px] rounded-3xl shadow-lg shadow-primary/10">
              <Sparkles size={16} />
              <span>La plataforma todo-en-uno para publishers de Amazon KDP</span>
            </div>
          </motion.div>

          {/* Title - Full width */}
          <div className="text-center mb-16">
            <motion.h1 
              variants={fadeInUp} 
              className="font-heading text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl mb-8"
            >
              Ordena tu catálogo KDP.{" "}
              <span className="relative inline-block">
                <span className="text-primary">Centraliza tu marketing.</span>
                <motion.span 
                  className="absolute bottom-1 left-0 h-[6px] bg-primary/40 rounded-full" 
                  variants={highlightVariants} 
                />
              </span>{" "}
              Controla tus números.
            </motion.h1>
          </div>
        </motion.div>

        {/* Content - Two columns */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={fadeInLeft} className="text-center lg:text-left">
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              Publify es tu hub operativo para Amazon KDP. Te ayudamos a trabajar con calma: 
              una sola fuente de verdad para tu biblioteca, campañas y finanzas.
            </motion.p>

            {/* Pain points */}
            <motion.div 
              variants={fadeInUp}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="mb-8 p-6 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-200 dark:border-red-800/30 backdrop-blur-sm"
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
              variants={fadeInUp}
              className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
            >
              <motion.div 
                variants={buttonHoverVariants} 
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleGetStarted} 
                  size="lg" 
                  className="group text-lg w-full sm:w-auto bg-gradient-to-r from-primary to-primary hover:shadow-2xl hover:shadow-primary/30 py-6 px-8"
                >
                  Acceso prioritario
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
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  onClick={handlePlayVideo} 
                  size="lg" 
                  className="text-lg w-full sm:w-auto border-primary/30 hover:border-primary/80 hover:bg-primary/10 py-6 px-8"
                >
                  <Play size={18} className="mr-2" />
                  Ver vídeo
                </Button>
              </motion.div>
            </motion.div>

            {/* Social proof numbers */}
            <motion.div 
              variants={fadeInUp}
              className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground"
            >
              {[
                { label: "200+", desc: "Publishers activos" },
                { label: "5 horas", desc: "Ahorradas por semana" },
                { label: "100%", desc: "En español" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="flex items-center gap-2"
                >
                  <span className="font-bold text-foreground">{stat.label}</span>
                  <span>{stat.desc}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Video/Demo section */}
          <motion.div 
            variants={fadeInRight}
            className="w-full flex justify-center lg:justify-end"
          >
            <motion.div 
              whileHover="hover" 
              variants={videoContainerVariants} 
              className="relative w-full max-w-md lg:max-w-full overflow-hidden rounded-xl border-2 border-primary/20 bg-black/5 backdrop-blur-sm shadow-2xl shadow-primary/10"
            >
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
        </motion.div>
      </motion.div>
    </section>
  );
};