import { motion } from "framer-motion";
import { Play, Monitor, Smartphone, Tablet } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";

const mockups = [
  {
    title: "Dashboard Principal",
    description: "Ve todo tu negocio editorial de un vistazo",
    icon: <Monitor className="w-6 h-6" />
  },
  {
    title: "Gestión de Libros",
    description: "Organiza tu biblioteca como un profesional",
    icon: <Tablet className="w-6 h-6" />
  },
  {
    title: "App Móvil",
    description: "Controla tu editorial desde cualquier lugar",
    icon: <Smartphone className="w-6 h-6" />
  }
];

export const MockupsShowcaseSection = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section className="relative py-20 bg-gradient-to-b from-muted/30 to-background dark:from-neutral-900/50 dark:to-background overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating screen mockups */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-6 bg-gradient-to-br from-[#FB923C]/20 to-primary/20 rounded-sm border border-[#FB923C]/30"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, 0],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.8
            }}
          />
        ))}
        
        {/* Connection dots */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FB923C]/10 to-primary/10 px-6 py-3 rounded-full mb-6 border border-[#FB923C]/20"
          >
            <Play className="w-5 h-5 text-[#FB923C]" />
            <span className="font-semibold text-[#FB923C]">✨ Demo en vivo</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ve Publify{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] to-primary">
                transformar
              </span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#FB923C] to-primary rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </span>{" "}
            tu editorial
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <strong>2,847 autores</strong> ya han elegido Publify para hacer crecer su negocio editorial. 
            Descubre por qué confían en nuestra plataforma.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Demo video */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1 relative"
          >
            {/* Glowing frame effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#FB923C]/20 to-primary/20 rounded-2xl blur-xl" />
            
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#FB923C]/30 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm shadow-2xl">
              {videoPlaying ? (
                <AspectRatio ratio={16 / 9}>
                  <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube.com/embed/videoseries?list=PLk6VGnSO9jRyDZkngVHPyLTMdYHiG6jYe&autoplay=1&controls=1&showinfo=0&rel=0" 
                    title="Publify - Demo Completo de la Plataforma Editorial" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={16 / 9} className="relative bg-gradient-to-br from-[#FB923C]/20 via-primary/15 to-[#FB923C]/25 flex items-center justify-center cursor-pointer group" onClick={() => setVideoPlaying(true)}>
                  {/* Animated background pattern */}
                  <motion.div 
                    className="absolute inset-0 opacity-30"
                    animate={{
                      background: [
                        "radial-gradient(circle at 20% 20%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 80% 80%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)",
                        "radial-gradient(circle at 20% 20%, rgba(251, 146, 60, 0.3) 0%, transparent 50%)"
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  {/* Play button with enhanced animation */}
                  <motion.div 
                    className="relative z-10"
                    whileHover={{ scale: 1.1 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(251, 146, 60, 0.4)",
                        "0 0 0 20px rgba(251, 146, 60, 0)",
                        "0 0 0 0 rgba(251, 146, 60, 0.4)"
                      ]
                    }}
                    transition={{
                      boxShadow: {
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-r from-[#FB923C] to-primary rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-[#FB923C]/50 transition-all duration-300">
                      <Play size={36} className="text-white ml-1" />
                    </div>
                  </motion.div>
                  
                  {/* Enhanced video info */}
                  <div className="absolute bottom-6 left-6 right-6 text-center">
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-white font-bold text-xl mb-2 drop-shadow-lg"
                    >
                      Descubre cómo Publify transforma tu editorial
                    </motion.p>
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white/90 text-sm drop-shadow"
                    >
                      🎬 Demo completo • 3 minutos • En español
                    </motion.p>
                  </div>
                  
                  {/* Corner decorative elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
                </AspectRatio>
              )}
            </div>
          </motion.div>

          {/* Enhanced Feature highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6">
              {mockups.map((mockup, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.03, x: 5 }}
                  className={`relative p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                    activeDemo === index 
                      ? 'bg-gradient-to-r from-[#FB923C]/10 to-primary/5 border-[#FB923C] shadow-lg shadow-[#FB923C]/20' 
                      : 'bg-card/80 border-border hover:border-[#FB923C]/50 hover:shadow-md'
                  }`}
                  onClick={() => setActiveDemo(index)}
                >
                  {/* Interactive glow effect */}
                  {activeDemo === index && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute inset-0 bg-gradient-to-r from-[#FB923C]/5 to-primary/5 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className="relative flex items-start gap-4">
                    <motion.div 
                      animate={activeDemo === index ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5 }}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        activeDemo === index 
                          ? 'bg-gradient-to-r from-[#FB923C] to-primary text-white shadow-lg' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {mockup.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 text-foreground">
                        {mockup.title}
                        {activeDemo === index && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="ml-2 text-[#FB923C]"
                          >
                            ✨
                          </motion.span>
                        )}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{mockup.description}</p>
                      
                      {activeDemo === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 text-sm text-[#FB923C] font-medium"
                        >
                          👆 Haz clic en el video para verlo en acción
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Enhanced urgency indicator */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-8 p-6 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30 shadow-lg"
            >
              <div className="flex items-start gap-3 mb-3">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 bg-green-500 rounded-full mt-1"
                />
                <div>
                  <span className="font-bold text-green-800 dark:text-green-400 text-lg">🚀 Acceso anticipado activo</span>
                  <p className="text-green-700 dark:text-green-300 text-sm mt-1 leading-relaxed">
                    <strong>267 autores</strong> se han unido esta semana. 
                    <motion.span
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="block mt-1 font-semibold"
                    >
                      ⚡ Solo quedan 33 plazas para enero 2025
                    </motion.span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};