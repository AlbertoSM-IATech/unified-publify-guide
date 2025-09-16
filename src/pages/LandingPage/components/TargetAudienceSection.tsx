import { motion } from "framer-motion";
import { User, Building2, GraduationCap } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const audiences = [
  {
    icon: User,
    title: "Autores profesionales",
    subtitle: "o en transición",
    benefits: [
      "Organización completa de tu catálogo",
      "Marketing automatizado para cada lanzamiento",
      "Control total de tus números y ROI"
    ]
  },
  {
    icon: Building2,
    title: "Microeditoriales",
    subtitle: "en crecimiento",
    benefits: [
      "Gestión centralizada de múltiples autores",
      "Procesos escalables y repetibles",
      "Reportes claros para la toma de decisiones"
    ]
  },
  {
    icon: GraduationCap,
    title: "Formadores",
    subtitle: "que publican contenido",
    benefits: [
      "Integración perfecta con tu ecosistema educativo",
      "Embudos de conversión optimizados",
      "Seguimiento completo del journey del cliente"
    ]
  }
];

export const TargetAudienceSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Para quién
            </h2>
            <p className="text-xl text-muted-foreground">
              Autores profesionales, microeditoriales y formadores que quieren orden, foco y crecimiento sin fricción.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {audiences.map((audience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/20 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                  <audience.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {audience.title}
                </h3>
                <p className="text-primary font-medium mb-6">
                  {audience.subtitle}
                </p>
                
                <ul className="space-y-3 text-left">
                  {audience.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};