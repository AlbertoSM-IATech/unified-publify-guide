
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

  const handleLogin = () => {
    navigate("/login");
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
      {/* Background glow effect */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-[#FB923C]/20 rounded-full blur-[80px]" />
      </div>
      
      <div className="mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left column: Text content */}
        <div className="text-center lg:text-left relative">
          <motion.h1 
            variants={fadeIn} 
            className="font-heading text-4xl font-bold tracking-tight md:text-5xl text-teal-50 lg:text-6xl"
          >
            Gestiona y haz crecer tu editorial de{" "}
            <span className="relative inline-block">
              <span className="text-orange-400">KDP</span>
              <motion.span 
                className="absolute bottom-1 left-0 h-[6px] bg-[#FB923C]/40 rounded-full" 
                variants={highlightVariants} 
              />
            </span>{" "}
            desde un solo lugar
          </motion.h1>
          
          <motion.p 
            variants={fadeIn} 
            className="mt-6 text-lg font-light text-orange-400 md:text-xl"
          >
            Publify es tu Centro de Control para Publishers y Editoriales independientes. 
            Unifica tu biblioteca, automatiza tu Marketing. Domina tu negocio editorial y elimina el caos del día a día.
          </motion.p>
          
          <motion.div 
            variants={fadeIn} 
            className="mt-8 flex flex-col space-y-4 sm:flex-row sm:justify-start sm:space-x-4 sm:space-y-0"
          >
            <motion.div variants={buttonHoverVariants} whileHover="hover">
              <Button 
                onClick={handleGetStarted} 
                size="lg" 
                className="group text-base w-full sm:w-auto bg-gradient-to-r from-primary to-[#FB923C] hover:shadow-lg hover:shadow-primary/20 py-6 px-8"
              >
                Quiero probar Publify
                <motion.div 
                  className="ml-2 flex items-center" 
                  initial={{ x: 0 }} 
                  whileHover={{ x: 5 }} 
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </Button>
            </motion.div>
            
            <motion.div variants={buttonHoverVariants} whileHover="hover">
              <Button 
                variant="outline" 
                onClick={handleLogin} 
                size="lg" 
                className="text-base w-full sm:w-auto border-[#FB923C]/30 hover:border-[#FB923C]/80 hover:bg-[#FB923C]/10 py-6 px-8"
              >
                <Sparkles size={18} className="mr-2 text-[#FB923C]" />
                Solicitar acceso anticipado
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Right column: Video section */}
        <motion.div 
          variants={fadeIn}
          className="w-full flex justify-center lg:justify-end mt-8 lg:mt-0"
        >
          <motion.div
            whileHover="hover"
            variants={videoContainerVariants}
            className="relative w-full max-w-md lg:max-w-full overflow-hidden rounded-xl border-2 border-[#FB923C]/20 bg-black/5 backdrop-blur-sm"
          >
            {videoPlaying ? (
              <div className="aspect-video w-full">
                <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0" 
                  title="Publify Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="aspect-video w-full relative overflow-hidden flex items-center justify-center">
                {/* Placeholder background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-[#FB923C]/20"></div>
                
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{
                    x: ['100%', '-100%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "linear",
                  }}
                />
                
                {/* Play button with pulsing animation */}
                <motion.div
                  className="relative z-10 cursor-pointer"
                  onClick={handlePlayVideo}
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(251, 146, 60, 0.4)',
                      '0 0 0 15px rgba(251, 146, 60, 0)',
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FB923C] flex items-center justify-center shadow-lg">
                    <Play size={30} className="text-white ml-1" />
                  </div>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-[#FB923C]/30"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
                
                <p className="absolute bottom-4 text-white font-medium text-sm md:text-base">Ver demo de Publify</p>
              </div>
            )}
            
            {/* Decorative glowing corners */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#FB923C]/40 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#FB923C]/40 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#FB923C]/40 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#FB923C]/40 rounded-br-lg" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
