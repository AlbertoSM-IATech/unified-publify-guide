
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
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

  return (
    <section id="faq" className="bg-muted/30 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="font-heading text-3xl font-bold">Preguntas Frecuentes</h2>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left font-heading py-4 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
