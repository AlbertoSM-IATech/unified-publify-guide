
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Image } from "lucide-react";

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

export const VisualsSection = () => {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Image size={24} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Visualiza tu éxito editorial</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre cómo Publify te ofrece herramientas visuales potentes para gestionar y hacer crecer tu negocio editorial
          </p>
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
      </div>
    </section>
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
          delay: index * 0.1,
          duration: 0.7,
          type: "spring",
          stiffness: 100
        }
      }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 }
      }}
      viewport={{ once: true }}
      className="rounded-lg overflow-hidden bg-background border relative will-change-transform"
    >
      <div className="aspect-[16/9] overflow-hidden">
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
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
        <p className="text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  );
};
