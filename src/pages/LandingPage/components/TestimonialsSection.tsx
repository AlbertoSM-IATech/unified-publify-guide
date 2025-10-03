import { motion, useScroll, useTransform } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ContentCard } from "@/components/common/ContentCard";
import { User, Quote, ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
const testimonials = [
  {
    quote: "Antes tardaba 3 horas cada semana solo en actualizar hojas de cálculo. Ahora tengo todo automatizado y puedo ver el estado de mis 8 libros en segundos. Publify me devolvió el tiempo para escribir.",
    author: "María García",
    role: "Escritora independiente",
    books: "8 títulos publicados"
  },
  {
    quote: "Gestiono una pequeña editorial con 15 autores. Antes era un caos de emails y documentos perdidos. Con Publify, cada autor tiene su espacio y yo puedo supervisar todo desde un solo panel. Game changer.",
    author: "Alejandro Rodríguez",
    role: "Editor y fundador",
    books: "Editorial con 45 títulos"
  },
  {
    quote: "Lo mejor es el módulo de finanzas. Por fin entiendo cuánto gano realmente con cada libro después de restar todos los gastos. Tomé decisiones que aumentaron mis beneficios un 40% en 3 meses.",
    author: "Laura Sánchez",
    role: "Autopublicadora",
    books: "12 títulos en Amazon KDP"
  },
  {
    quote: "La integración con GoHighLevel para automatizar el marketing ha sido brutal. Mis embudos de venta funcionan solos mientras yo me enfoco en escribir el próximo libro. Ya no pierdo leads.",
    author: "Carlos Martínez",
    role: "Autor y formador",
    books: "5 bestsellers en su nicho"
  },
  {
    quote: "Pasé de tener archivos por todas partes (Drive, Dropbox, mi PC) a tener todo centralizado. La búsqueda es instantánea y nunca más perdí una versión final de portada o manuscrito.",
    author: "Isabel Fernández",
    role: "Escritora de ficción",
    books: "20+ novelas publicadas"
  },
  {
    quote: "Como formador, necesitaba una forma de dar soporte a mis alumnos autores. Publify me permitió crear un sistema donde cada uno gestiona su catálogo y yo puedo asesorarles mejor con datos reales.",
    author: "Roberto Navarro",
    role: "Consultor editorial",
    books: "150+ autores asesorados"
  },
  {
    quote: "Llevaba años usando mil herramientas diferentes. Publify unificó todo: desde la gestión de ISBN hasta el seguimiento de campañas publicitarias. Mi productividad se multiplicó por 3.",
    author: "Patricia Morales",
    role: "Autora y marketer",
    books: "15 títulos + 2 cursos"
  },
  {
    quote: "El panel de métricas me permite ver en tiempo real qué libros están vendiendo mejor y ajustar mi estrategia al instante. Datos claros = mejores decisiones = más ingresos.",
    author: "Fernando Campos",
    role: "Autor de no ficción",
    books: "Especialista en desarrollo personal"
  },
  {
    quote: "Antes perdía oportunidades porque no tenía tiempo de hacer seguimiento a los lectores interesados. Ahora todo está automatizado y mi lista de email crece cada día sin que yo tenga que hacer nada.",
    author: "Sofía Ramírez",
    role: "Escritora romántica",
    books: "25 novelas + newsletter con 10K suscriptores"
  },
  {
    quote: "Como editorial pequeña, no podíamos permitirnos software caro ni un equipo grande. Publify nos dio herramientas de nivel profesional a un precio accesible. Ahora competimos con editoriales mucho más grandes.",
    author: "David Ortega",
    role: "Co-fundador",
    books: "Editorial Horizonte - 60 títulos"
  },
  {
    quote: "La función de trazabilidad financiera es oro puro. Ahora sé exactamente cuánto he invertido en cada libro (edición, portada, ads) y cuánto he recuperado. Nunca más voy a ciegas.",
    author: "Elena Vega",
    role: "Autopublicadora",
    books: "10 títulos + blog de escritura"
  },
  {
    quote: "Publify se integró perfectamente con mis procesos existentes. No tuve que cambiar nada drásticamente, solo mejorar y centralizar. En dos semanas ya estaba operando al 100% con el sistema.",
    author: "Miguel Ángel Díaz",
    role: "Escritor y podcaster",
    books: "7 libros + 200 episodios"
  }
];
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
  
  const autoplayPlugin = useRef(
    Autoplay({ 
      delay: 4000, 
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  );
  
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
            Casos de éxito reales
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Autores y editoriales que ya están ahorrando tiempo, aumentando ventas y recuperando el control de su negocio
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
          <Carousel 
            className="w-full max-w-5xl mx-auto"
            plugins={[autoplayPlugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
          >
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
    books: string;
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
        <p className="text-xs text-muted-foreground mt-1">{testimonial.books}</p>
      </div>
    </motion.div>
  </ContentCard>;