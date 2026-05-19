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
    answer: "El publisher KDP opera un negocio complejo sin un sistema propio para gestionarlo. Trabaja con un mosaico de herramientas inconexas y avanza a base de parches. La fragmentación opera en cuatro frentes: (1) sistema casero (genéricas + dedicadas KDP en silos), (2) pipeline editorial deficiente, (3) sin control financiero estructurado, (4) información aislada. Esto genera errores, retrabajo, fatiga de decisión y bloquea la capacidad de escalar con control.",
  },
  {
    question: "¿Para quién es Publify?",
    answer: "Para publishers KDP que operan un negocio editorial complejo de forma \"casera\" — con un mosaico de herramientas genéricas (Drive, Excel, Notion, Trello) más dedicadas KDP en silos — y quieren reemplazarlo por una operación profesional. No se define por número de libros: aplica desde el primer libro; el dolor se intensifica con el volumen.",
  },
  {
    question: "¿Para quién NO es Publify?",
    answer: "Para publishers que solo quieren probar suerte con un PDF y no buscan profesionalizar la operación. Para quien busca una spy tool tipo Helium10. Para quien busca un maquetador o software de escritura. Para quien quiere \"una app que haga Ads por ti\".",
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
    answer: "No. Publify sustituye las herramientas genéricas (Drive, Excel, Notion, Trello…) que hoy adaptas para gestionar tu editorial. No sustituye las dedicadas KDP (Helium10, Publisher Rocket, BookBeam, Canva, Amazon Ads…): convive con ellas y aporta el contexto del libro para que dejes de tener información aislada en 7 sitios. En roadmap, Publify destilará los datos crudos de estas dedicadas — esa capa está fuera del MVP.",
  },
  {
    question: "¿Publify se conecta directamente con Amazon KDP o Amazon Ads?",
    answer: "No. Publify no se conecta directamente al panel de KDP ni modifica nada en tu cuenta. Tú importas o registras la información de forma controlada (CSV o copiar/pegar), evitando riesgos con los términos de Amazon.",
  },
  {
    question: "¿Qué puedo gestionar en Publify hoy (MVP)?",
    answer: "El MVP actual son dos módulos: Biblioteca (catálogo Biblioteca → Serie → Libro, con ficha operativa de cada libro: Workspace para investigar y decidir + Producción para metadatos, assets y pipeline) y Finanzas (rentabilidad por libro y agregada del catálogo). Publify no promete \"más ventas\": promete orden, foco y centralización para operar con claridad. El resto de capas (Marketing 360, integraciones) se incorporan después, sobre base validada.",
  },
  {
    question: "¿Qué planes existen y cuánto costará Publify después de esta promoción?",
    answer: "A partir del 1 de junio de 2026, los precios estándar son: Starter 19 €/mes (Biblioteca) · Plus 49 €/mes (Biblioteca + Finanzas). Trial: 14 días gratis sin tarjeta, equivalente a Plus. Pro 99 €/mes está reservado para el futuro Plan Marketing 360, condicionado a validar primero el núcleo. Si entras como Early Adopter, mantienes tu precio promocional para siempre mientras tu suscripción siga activa.",
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
    answer: "A día de hoy, no. Publify no es multi-asiento: no ofrece roles, invitaciones, permisos ni vistas por usuario, y no está en el roadmap inmediato. Lo que sí puedes hacer: gestionar internamente el trabajo de colaboradores externos (freelancers, diseñadores, ghostwriters) desde tu propio espacio — el pipeline editorial te permite trackear tareas y entregables, pero ellos no acceden a Publify.",
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
