
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
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ve Publify en acción
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descubre por qué más de 2,800 autores han elegido Publify para hacer crecer su negocio editorial
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Demo video/mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-xl overflow-hidden border-2 border-[#FB923C]/20 bg-black/5 backdrop-blur-sm">
              {videoPlaying ? (
                <AspectRatio ratio={16 / 9}>
                  <iframe 
                    className="w-full h-full" 
                    src="https://www.youtube.com/embed/videoseries?list=PLk6VGnSO9jRyDZkngVHPyLTMdYHiG6jYe&autoplay=1&controls=1&showinfo=0&rel=0" 
                    title="Publify Demo Completo" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={16 / 9} className="relative bg-gradient-to-br from-primary/20 to-[#FB923C]/20 flex items-center justify-center cursor-pointer" onClick={() => setVideoPlaying(true)}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 bg-[#FB923C] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Play size={32} className="text-white ml-1" />
                  </motion.div>
                  <p className="absolute bottom-6 text-white font-medium">Demo completo - 3 minutos</p>
                </AspectRatio>
              )}
            </div>
          </motion.div>

          {/* Mockup details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6">
              {mockups.map((mockup, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-lg border cursor-pointer transition-all ${
                    activeDemo === index 
                      ? 'bg-[#FB923C]/10 border-[#FB923C] shadow-md' 
                      : 'bg-white border-gray-200 hover:border-[#FB923C]/50'
                  }`}
                  onClick={() => setActiveDemo(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${
                      activeDemo === index ? 'bg-[#FB923C] text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {mockup.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{mockup.title}</h3>
                      <p className="text-muted-foreground">{mockup.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-medium text-green-800">Disponible ahora</span>
              </div>
              <p className="text-green-700 text-sm">
                Más de 200 autores se han unido esta semana. 
                <strong> Solo quedan 47 plazas para acceso anticipado.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
