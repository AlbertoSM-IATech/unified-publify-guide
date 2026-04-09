import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Qué es Publify, en una frase?",
    answer: "Publify es el Sistema Operativo Editorial para publishers de Amazon KDP: un sistema que centraliza tu negocio editorial con una promesa simple: Orden, Foco y Centralización.",
  },
  {
    question: "¿Qué problema resuelve Publify?",
    answer: "El problema raíz es la fragmentación: datos y procesos repartidos entre Excel, Drive, Notion y herramientas sueltas que no se hablan. Esto genera errores, retrabajo, fatiga de decisión y te impide escalar con control.",
  },
  {
    question: "¿Para quién es Publify?",
    answer: "Para publishers profesionalizándose o ya profesionales (con 1–100 libros) que quieren procesos repetibles y visibilidad de rentabilidad por libro.",
  },
  {
    question: "¿Para quién NO es Publify?",
    answer: "Para quien busca una spy tool tipo Helium10. Para quien busca un maquetador o software de escritura. Para quien quiere \"una app que haga Ads por ti\".",
  },
  {
    question: "¿Cómo funciona Publify? (estructura para entenderlo)",
    answer: "Publify está diseñado con un principio no negociable: el libro es el nodo central. Publify (capa global): visión y control del negocio completo. Libro (nodo central): cada libro tiene su Ficha. De la Ficha cuelgan dos ramas: Workspace (capa cognitiva, donde investigas y piensas) y Producción (capa operativa, donde ejecutas: archivos, metadatos, tareas, finanzas, etc.).",
  },
  {
    question: "¿Qué es exactamente la \"Ficha de Libro\"?",
    answer: "La Ficha es el centro de mando de cada libro: el contenedor estructurado donde viven metadatos, archivos, enlaces, estado del pipeline y finanzas. Es el nodo del sistema. El Workspace y la Producción cuelgan de aquí.",
  },
  {
    question: "¿Qué es el Workspace y para qué sirve?",
    answer: "El Workspace es la capa cognitiva de cada libro: un espacio libre pero estructurado para investigar nichos, documentar estrategia, guardar referencias y desarrollar el plan antes de ejecutar.",
  },
  {
    question: "¿Publify sustituye a Helium10, Publisher Rocket, BookBeam, etc.?",
    answer: "No. Publify no compite con herramientas especializadas. Publify las contextualiza dentro del ecosistema del libro para que dejes de tener información aislada en 7 sitios.",
  },
  {
    question: "¿Publify se conecta directamente con Amazon KDP o Amazon Ads?",
    answer: "No. Publify no se conecta directamente al panel de KDP ni modifica nada en tu cuenta. Tú importas o registras la información de forma controlada (CSV o copiar/pegar), evitando riesgos con los términos de Amazon.",
  },
  {
    question: "¿Qué puedo gestionar en Publify hoy (MVP)?",
    answer: "A nivel práctico, Publify organiza tu operativa por libro: Biblioteca (catálogo, series, estados), Producción (pipeline y ejecución), Finanzas (por libro y global), Research y contexto (según módulo y plan). Publify no promete \"más ventas\". Promete estructura profesional para operar con claridad.",
  },
  {
    question: "¿Qué planes existen y cuánto costará Publify después de esta promoción?",
    answer: "A partir del 1 de junio, los precios estándar serán: Trial: 30 días gratis, sin tarjeta (equivalente a Plus durante el trial). Starter: 19 €/mes. Plus: 49 €/mes. Pro: 99 €/mes (incluye Marketing 360, cuando aplique). Si entras como Early Adopter, mantienes tu precio promocional para siempre mientras tu suscripción siga activa.",
  },
  {
    question: "¿Cuántas plazas hay?",
    answer: "Objetivo operativo: 20–30 early adopters y, si todo va bien, llegar a una lista prioritaria de alrededor de 100 personas.",
  },
  {
    question: "¿Cuánto pagaré si entro como Early Adopter?",
    answer: "Durante el periodo Early Adopter, el acceso tendrá este precio escalonado (Plan Plus): 10–30 de abril: 15 €/mes. 1–15 de mayo: 20 €/mes. 16–31 de mayo: 25 €/mes. A partir del 1 de junio, el precio sube al estándar (19 €/mes Starter | 49 €/mes Plus).",
    defaultOpen: true,
  },
  {
    question: "¿Qué incluye el acceso Early Adopter?",
    answer: "Acceso prioritario al MVP. Posibilidad de influir en el roadmap con feedback (prioridad sobre mejoras de fricción real). Posible opción de licencia Lifetime más adelante, solo para early adopters (según oferta vigente).",
  },
  {
    question: "¿Hay permanencia? ¿Puedo cancelar?",
    answer: "No hay permanencia. Puedes cancelar cuando quieras y la baja es efectiva al final del periodo en curso.",
  },
  {
    question: "¿Puedo trabajar con mi equipo?",
    answer: "A día de hoy, no. Trabajar en equipo (roles, invitaciones, permisos y vistas por usuario) requiere mucho desarrollo y todavía no está incluido en el roadmap. Lo tenemos presente para futuro, pero por ahora Publify está optimizado para uso individual y operativa simple.",
  },
  {
    question: "¿Mis datos son míos? ¿Puedo exportarlos?",
    answer: "Sí. Puedes exportar tus datos en CSV en cualquier momento.",
  },
  {
    question: "¿Cumple RGPD?",
    answer: "Sí. Publify se plantea desde compliance y usa proveedores cloud. La política de privacidad detalla finalidades y derechos.",
  },
  {
    question: "¿Qué NO hace Publify (para evitar expectativas falsas)?",
    answer: "No sube libros a KDP automáticamente. No es una spy tool. No gestiona pujas automáticamente. No es contabilidad fiscal. No es un \"todo en uno genérico\".",
  },
  {
    question: "¿Cómo contacto si tengo dudas?",
    answer: "Escríbenos y te respondemos con el mejor siguiente paso según tu caso (catálogo, Ads, fase del negocio).",
  },
];

export const FaqSection = () => {
  const defaultOpenItems = faqs
    .map((faq, index) => ((faq as any).defaultOpen ? `item-${index}` : null))
    .filter(Boolean) as string[];

  return (
    <section id="faq" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent dark:via-accent/5 pointer-events-none" />
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20"
        >
          <p className="text-lg mb-2 text-foreground">
            ¿Tienes otra pregunta?
          </p>
          <p className="text-muted-foreground">
            Escríbenos a <a href="mailto:test.publify@gmail.com" className="text-primary hover:underline">test.publify@gmail.com</a>
            {" "}y te respondemos lo antes posible.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
