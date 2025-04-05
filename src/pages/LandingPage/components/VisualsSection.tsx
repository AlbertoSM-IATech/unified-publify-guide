
import { motion, useScroll, useTransform } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Image, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Example mockup images - replace with your actual images
const mockupImages = [
  {
    title: "Dashboard Editorial",
    description: "Visualiza todas tus métricas en un solo lugar",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Biblioteca Digital",
    description: "Organiza todos tus libros y recursos",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Marketing Automatizado",
    description: "Gestiona campañas y embudos de venta",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Análisis de Regalías",
    description: "Controla tus ingresos y gastos",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const VisualsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.section 
      ref={ref}
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Dynamic background */}
      <motion.div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-0 right-0 w-3/4 h-1/2 bg-gradient-to-l from-[#FB923C]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-3/4 h-1/2 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-[#FB923C]/10 blur-[80px]" />
      </motion.div>

      <div className="container mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div 
            className="flex justify-center mb-4"
            variants={itemVariants}
          >
            <div className="rounded-full bg-gradient-to-r from-primary/10 to-[#FB923C]/10 p-3 text-[#FB923C]">
              <Image size={24} />
            </div>
          </motion.div>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold font-heading mb-4"
            variants={itemVariants}
          >
            Visualiza tu éxito editorial
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Descubre cómo Publify te ofrece herramientas visuales potentes para gestionar y hacer crecer tu negocio editorial
          </motion.p>
        </motion.div>

        <div className="mt-12">
          <Carousel className="w-full">
            <CarouselContent>
              {mockupImages.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2 xl:basis-1/3">
                  <MockupCard item={item} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative left-0 right-auto" />
              <CarouselNext className="relative right-0 left-auto" />
            </div>
          </Carousel>
        </div>
        
        {/* CTA after visuals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={() => navigate("/demo")}
              className="bg-gradient-to-r from-[#FB923C] to-primary hover:shadow-lg hover:shadow-[#FB923C]/20"
            >
              Ver todas las funciones
              <motion.div
                className="ml-2"
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

interface MockupCardProps {
  item: {
    title: string;
    description: string;
    image: string;
  };
  index: number;
}

const MockupCard = ({ item, index }: MockupCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15, scale: 0.95 }}
      whileInView={{ 
        opacity: 1, 
        rotateY: 0, 
        scale: 1,
        transition: { 
          delay: index * 0.1 + 0.2,
          duration: 0.7,
          type: "spring",
          stiffness: 100
        }
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        y: -10,
        transition: { type: "spring", stiffness: 400, damping: 17 }
      }}
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-lg overflow-hidden bg-background border relative will-change-transform"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-[#FB923C]/5 z-0" />
      
      <div className="aspect-[16/9] overflow-hidden relative z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, transition: { delay: index * 0.1 + 0.5, duration: 0.7 } }}
          viewport={{ once: true }}
        />
        <motion.img
          src={item.image}
          alt={item.title}
          initial={{ scale: 1.2, filter: "blur(5px)" }}
          whileInView={{ 
            scale: 1,
            filter: "blur(0px)",
            transition: { delay: index * 0.1 + 0.3, duration: 0.7 }
          }}
          className="w-full h-full object-cover"
        />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 text-white z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0, 
            transition: { delay: index * 0.1 + 0.7, duration: 0.5 } 
          }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-1 drop-shadow-md">{item.title}</h3>
          <p className="text-sm text-white/80 drop-shadow-md">{item.description}</p>
        </motion.div>
      </div>
      
      <div className="p-4 relative z-10">
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ 
            width: "100%",
            transition: { delay: index * 0.1 + 0.9, duration: 1 }
          }}
          viewport={{ once: true }}
          className="absolute top-0 left-0 h-px bg-gradient-to-r from-primary to-[#FB923C]/50"
        />
        <motion.p 
          className="text-sm text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ 
            opacity: 1, 
            transition: { delay: index * 0.1 + 1, duration: 0.5 } 
          }}
          viewport={{ once: true }}
        >
          Interfaz intuitiva y fácil de usar
        </motion.p>
      </div>
    </motion.div>
  );
};
