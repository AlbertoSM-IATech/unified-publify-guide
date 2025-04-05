import { motion, useScroll, useTransform } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ContentCard } from "@/components/common/ContentCard";
import { User, Quote, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
const testimonials = [{
  quote: "Publify me ha ahorrado más de 5 horas a la semana. Todo está en su sitio.",
  author: "María García",
  role: "Escritora independiente"
}, {
  quote: "Gracias a su panel editorial, pasé de tener 15 documentos a una sola vista centralizada.",
  author: "Alejandro Rodríguez",
  role: "Editor de contenido digital"
}, {
  quote: "Por fin tengo control de mis regalías y gastos sin abrir Excel.",
  author: "Laura Sánchez",
  role: "Autopublicadora con 12 títulos"
}, {
  quote: "La automatización del marketing ha sido un cambio radical en mi forma de promocionar mis libros.",
  author: "Carlos Martínez",
  role: "Editorial independiente"
}];
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
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
  }),
  hover: {
    y: -8,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};
const quoteIconVariants = {
  initial: {
    scale: 0.5,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};
export const TestimonialsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.6, 1, 0.6]);
  return <motion.section ref={ref} className="relative py-20 px-4 overflow-hidden bg-muted/20">
      {/* Dynamic background effect */}
      <motion.div className="absolute inset-0 -z-10" style={{
      y: backgroundY,
      opacity
    }}>
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#FB923C]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-primary/5 to-transparent" />
        <div className="absolute top-1/4 left-1/3 w-1/3 h-1/3 rounded-full bg-[#FB923C]/10 blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/3 w-1/3 h-1/3 rounded-full bg-primary/10 blur-[80px]" />
      </motion.div>
      
      <div className="container mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <motion.div className="rounded-full bg-[#FB923C]/10 p-3 text-[#FB923C]" initial="initial" whileInView="animate" viewport={{
            once: true
          }} variants={quoteIconVariants}>
              <Quote size={24} />
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Testimonios de usuarios tempranos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubre lo que dicen nuestros primeros usuarios sobre cómo Publify ha transformado su forma de gestionar su negocio editorial
          </p>
        </motion.div>

        {/* Mobile view: Stacked cards */}
        <div className="md:hidden space-y-4">
          {testimonials.map((testimonial, index) => <motion.div key={index} custom={index} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={cardVariants} whileHover="hover" className="will-change-transform">
              <TestimonialCard testimonial={testimonial} />
            </motion.div>)}
        </div>

        {/* Desktop view: Carousel */}
        <div className="hidden md:block">
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div custom={index} initial="hidden" whileInView="visible" viewport={{
                once: true
              }} variants={cardVariants} whileHover="hover" className="h-full will-change-transform">
                    <TestimonialCard testimonial={testimonial} />
                  </motion.div>
                </CarouselItem>)}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="relative left-0 right-auto" />
              <CarouselNext className="relative right-0 left-auto" />
            </div>
          </Carousel>
        </div>
        
        {/* CTA after testimonials */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        delay: 0.4,
        duration: 0.6
      }} className="mt-14 text-center">
          <motion.div whileHover={{
          scale: 1.05
        }} transition={{
          type: "spring",
          stiffness: 400,
          damping: 10
        }}>
            <Button onClick={() => navigate("/register")} className="bg-gradient-to-r from-primary to-[#FB923C] hover:shadow-lg px-[60px] py-[30px] font-semibold text-lg">
              Únete a ellos
              <motion.div className="ml-2" initial={{
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
        </motion.div>
      </div>
    </motion.section>;
};
interface TestimonialCardProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}
const TestimonialCard = ({
  testimonial
}: TestimonialCardProps) => <ContentCard className="h-full bg-background border shadow-sm backdrop-blur-sm" contentClassName="flex flex-col h-full">
    <div className="flex-1">
      <div className="text-[#FB923C] mb-4">
        <motion.div initial={{
        rotate: -10,
        scale: 0.9
      }} whileInView={{
        rotate: 0,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}>
          <Quote size={24} className="mx-auto" />
        </motion.div>
      </div>
      <p className="italic text-center mb-6">{testimonial.quote}</p>
    </div>
    <motion.div className="flex items-center justify-center gap-3 pt-4 mt-auto border-t" initial={{
    opacity: 0,
    y: 10
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    delay: 0.2,
    duration: 0.4
  }}>
      <div className="rounded-full bg-[#FB923C]/10 p-2">
        <User size={20} className="text-[#FB923C]" />
      </div>
      <div className="text-left">
        <p className="font-semibold">{testimonial.author}</p>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
    </motion.div>
  </ContentCard>;