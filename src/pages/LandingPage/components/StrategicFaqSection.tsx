
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const strategicFaqs = [
  {
    question: "¿Realmente funciona para autores pequeños?",
    answer: "Sí, especialmente para autores pequeños. El 78% de nuestros usuarios han publicado menos de 5 libros y ven resultados en las primeras 2 semanas. Publify está diseñado para hacer que autores individuales compitan como grandes editoriales."
  },
  {
    question: "¿Cuánto tiempo necesito para ver resultados?",
    answer: "La mayoría de autores ven mejoras en organización inmediatamente, incrementos en ventas en 2-4 semanas, y ROI positivo en el primer mes. Te acompañamos paso a paso para acelerar tu éxito."
  },
  {
    question: "¿Es compatible con KDP, Draft2Digital, etc?",
    answer: "Totalmente. Publify se integra con todas las plataformas principales: Amazon KDP, Draft2Digital, IngramSpark, Apple Books, Kobo, y más. Sincronización automática de datos y ventas."
  },
  {
    question: "¿Qué pasa si no me gusta después de pagar?",
    answer: "Garantía total de 30 días. Si no estás completamente satisfecho, te devolvemos cada céntimo sin preguntas. Además, puedes exportar todos tus datos en cualquier momento."
  },
  {
    question: "¿Necesito conocimientos técnicos?",
    answer: "Para nada. Publify está diseñado para escritores, no para programadores. Si sabes usar Word o email, sabes usar Publify. Incluimos onboarding personalizado y soporte en español."
  }
];

export const StrategicFaqSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Preguntas frecuentes
          </h2>
          <p className="text-xl text-muted-foreground">
            Resolvemos las dudas más comunes antes de dar el paso
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {strategicFaqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-muted/30 dark:bg-neutral-800/30 rounded-lg border border-border px-6 py-2"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-6 bg-[#FB923C]/5 dark:bg-[#FB923C]/10 rounded-lg border border-[#FB923C]/20"
        >
          <p className="text-lg mb-2 text-foreground">
            ¿Tienes otra pregunta?
          </p>
          <p className="text-muted-foreground">
            Escríbenos a <a href="mailto:hola@publify.ai" className="text-[#FB923C] hover:underline">hola@publify.ai</a> 
            {" "}y te respondemos en menos de 2 horas
          </p>
        </motion.div>
      </div>
    </section>
  );
};
