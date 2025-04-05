
import { motion, useScroll, useTransform } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const accordionItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export const FaqSection = () => {
  const faqs = [
    {
      question: "¿Necesito saber programar o diseñar?",
      answer: "No. Publify está hecho para ser intuitivo desde el primer clic, con una interfaz amigable diseñada para autores y editores, no para programadores."
    },
    {
      question: "¿Puedo importar libros desde otras plataformas?",
      answer: "Sí. Puedes traer tus datos desde Notion, Drive o Excel fácilmente con nuestras herramientas de importación."
    },
    {
      question: "¿Solo sirve para Amazon KDP?",
      answer: "Está optimizado para KDP, pero puedes adaptarlo a otras plataformas fácilmente. Trabajamos continuamente para añadir integración con más plataformas."
    },
    {
      question: "¿Cómo funciona el sistema de marketing?",
      answer: "Publify integra herramientas de marketing digital como creación de landing pages, formularios, campañas de email y análisis de resultados, todo desde un único panel."
    }
  ];

  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.6, 1, 0.6]);

  return (
    <motion.section 
      ref={ref}
      id="faq" 
      className="relative bg-muted/30 px-4 py-16 md:py-24 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{ y: backgroundY, opacity }}
      >
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-[#FB923C]/10 blur-[80px]" />
        <div className="absolute bottom-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-primary/10 blur-[80px]" />
      </motion.div>
      
      <div className="mx-auto max-w-3xl">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              transition: { 
                type: "spring",
                stiffness: 260,
                damping: 20,
              } 
            }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-gradient-to-r from-primary to-[#FB923C] mx-auto mb-6 rounded-full"
          />
          <h2 className="font-heading text-3xl font-bold">Preguntas Frecuentes</h2>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={accordionItemVariants}
              >
                <AccordionItem value={`item-${index}`} className="border-b border-border overflow-hidden">
                  <AccordionTrigger className="text-left font-heading py-4 hover:no-underline group">
                    <span className="flex-1 pr-2">{faq.question}</span>
                    <div className="w-6 h-6 rounded-full bg-[#FB923C]/10 flex items-center justify-center group-data-[state=open]:bg-[#FB923C]/20 transition-colors">
                      <motion.div
                        animate={{ rotate: 90 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20
                        }}
                      >
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: 90 }}
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                          }}
                        >
                          <span className="sr-only">Toggle</span>
                        </motion.div>
                      </motion.div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
        
        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <p className="text-muted-foreground mb-6">
            ¿Tienes más preguntas? Estamos aquí para ayudarte
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-primary to-[#FB923C] hover:shadow-lg hover:shadow-[#FB923C]/20"
            >
              Solicitar información
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
