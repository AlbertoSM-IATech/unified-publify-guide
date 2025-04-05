
import { motion } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ContentCard } from "@/components/common/ContentCard";
import { User, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Publify me ha ahorrado más de 5 horas a la semana. Todo está en su sitio.",
    author: "María García",
    role: "Escritora independiente"
  },
  {
    quote: "Gracias a su panel editorial, pasé de tener 15 documentos a una sola vista centralizada.",
    author: "Alejandro Rodríguez",
    role: "Editor de contenido digital"
  },
  {
    quote: "Por fin tengo control de mis regalías y gastos sin abrir Excel.",
    author: "Laura Sánchez",
    role: "Autopublicadora con 12 títulos"
  },
  {
    quote: "La automatización del marketing ha sido un cambio radical en mi forma de promocionar mis libros.",
    author: "Carlos Martínez",
    role: "Editorial independiente"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  })
};

export const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 overflow-hidden bg-muted/20">
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
              <Quote size={24} />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Testimonios de usuarios tempranos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre lo que dicen nuestros primeros usuarios sobre cómo Publify ha transformado su forma de gestionar su negocio editorial
          </p>
        </motion.div>

        {/* Mobile view: Stacked cards */}
        <div className="md:hidden space-y-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="will-change-transform"
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Desktop view: Carousel */}
        <div className="hidden md:block">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="h-full will-change-transform"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
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

interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => (
  <ContentCard 
    className="h-full bg-background border shadow-sm"
    contentClassName="flex flex-col h-full"
  >
    <div className="flex-1">
      <div className="text-primary mb-4">
        <Quote size={24} className="mx-auto" />
      </div>
      <p className="italic text-center mb-6">{testimonial.quote}</p>
    </div>
    <div className="flex items-center justify-center gap-3 pt-4 mt-auto border-t">
      <div className="rounded-full bg-muted p-2">
        <User size={20} className="text-primary" />
      </div>
      <div className="text-left">
        <p className="font-semibold">{testimonial.author}</p>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
    </div>
  </ContentCard>
);
