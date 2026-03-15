import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Apuntarme tiene coste?",
    answer: "No. Apuntarte a la waitlist es completamente gratis. Solo necesitas tu nombre y email.",
    defaultOpen: false,
  },
  {
    question: "¿Cuándo abrís acceso?",
    answer: "A partir del 1 de abril de 2026, de forma progresiva. Las invitaciones se enviarán por orden de inscripción.",
    defaultOpen: true,
  },
  {
    question: "¿Cuántas plazas hay?",
    answer: "Entre 20 y 30 plazas para la fase de early adopters. Queremos asegurar un onboarding de calidad y feedback real.",
    defaultOpen: false,
  },
  {
    question: "¿Qué precio tendrá?",
    answer: "Precio escalonado en abril (Plan Plus): 15 €/mes si entras del 1 al 10, 20 €/mes del 11 al 20, y 25 €/mes del 21 al 30. Desde mayo: 29 €/mes Básico o 49 €/mes Plus. El precio de early adopter se mantiene para siempre mientras mantengas tu suscripción activa. Precios sin IVA.",
    defaultOpen: true,
  },
  {
    question: "¿Qué funcionalidades tiene ahora mismo?",
    answer: "El MVP incluye la Biblioteca editorial completa y control financiero por libro. Es la base del sistema operativo editorial: el cimiento funcional sobre el que se construyen las funcionalidades avanzadas (scoring de nichos, calendario editorial, análisis de campañas, QRs y más). No es una demo, es la primera pieza real de tu sistema.",
    defaultOpen: true,
  },
  {
    question: "¿Publify sustituye mis herramientas?",
    answer: "Publify sustituye el Excel donde calculas rentabilidad, las notas dispersas en WhatsApp y Notion, el seguimiento manual de tu catálogo y la falta de visión financiera por libro. No sustituye Amazon Ads ni KDP, sino que te da el contexto que esas herramientas no tienen.",
    defaultOpen: false,
  },
  {
    question: "¿Qué pasa si cancelo mi suscripción?",
    answer: "Si cancelas y vuelves más adelante, tendrás que pagar el precio vigente en ese momento, sin el descuento de early adopter.",
    defaultOpen: false,
  },
];

export const FaqSection = () => {
  const defaultOpenItems = faqs
    .map((faq, index) => (faq.defaultOpen ? `item-${index}` : null))
    .filter(Boolean) as string[];

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Preguntas{" "}
            <span className="text-primary">frecuentes</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="multiple" defaultValue={defaultOpenItems} className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card hover:border-primary/20 transition-colors"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
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
