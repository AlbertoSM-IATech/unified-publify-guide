import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const faqs = [
  {
    question: "¿Está disponible ya?",
    answer: "Estamos en fase de lanzamiento progresivo con acceso prioritario. Los primeros usuarios ya están probando la plataforma y proporcionando feedback valioso que nos ayuda a perfeccionar la experiencia."
  },
  {
    question: "¿Puedo migrar mi catálogo actual?",
    answer: "¡Por supuesto! Te guiamos paso a paso con plantillas predefinidas y checklist detallados. Nuestro equipo de onboarding te acompaña en todo el proceso de migración para que sea rápido y sin pérdidas."
  },
  {
    question: "¿Cómo tratáis mis datos?",
    answer: "Seguridad y privacidad por defecto. Todos tus datos están cifrados y alojados en servidores seguros. Te explicamos todo el proceso de tratamiento de datos antes de empezar y cumples totalmente con RGPD."
  },
  {
    question: "¿Precios?",
    answer: "Compartiremos las condiciones especiales para early-adopters al solicitar acceso. Tendrás precios preferenciales y condiciones exclusivas por ser de los primeros en confiar en Publify."
  },
  {
    question: "¿Roadmap?",
    answer: "Biblioteca, Marketing 360 y Finanzas son el núcleo actual. Vamos abriendo nuevas integraciones (Amazon Ads, más plataformas de email, IA para copy) y mejoras según la prioridad de nuestros usuarios activos."
  }
];

export const FaqSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Resolvemos las dudas más comunes sobre Publify
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border border-border rounded-lg px-6 bg-card hover:border-primary/20 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};