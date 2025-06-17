
import { motion } from "framer-motion";
import { BookOpen, Search, Megaphone, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const keyFeatures = [
  {
    icon: <BookOpen className="w-12 h-12 text-[#FB923C]" />,
    title: "Gestión Editorial Visual",
    description: "Cada libro tiene su ficha completa: ASIN, ISBN, precios, portadas, BSR dinámico, archivos en la nube y enlaces web personalizados.",
    benefit: "Todo centralizado por título"
  },
  {
    icon: <Search className="w-12 h-12 text-[#FB923C]" />,
    title: "Panel de Investigación", 
    description: "Un espacio tipo Notion asociado a cada libro. Investiga, define estrategias, desarrolla contenido y organiza campañas.",
    benefit: "Tu espacio libre con contexto"
  },
  {
    icon: <Megaphone className="w-12 h-12 text-[#FB923C]" />,
    title: "Marketing Automatizado",
    description: "Landing pages, formularios, embudos de conversión, email marketing y analítica. Todo dentro del sistema.",
    benefit: "Marketing profesional unificado"
  },
  {
    icon: <Users className="w-12 h-12 text-[#FB923C]" />,
    title: "CRM Editorial",
    description: "Seguimiento de leads, historial de interacciones y gestión visual del pipeline. Adaptado a autores independientes.",
    benefit: "Entiende a tu audiencia"
  },
  {
    icon: <DollarSign className="w-12 h-12 text-[#FB923C]" />,
    title: "Control Financiero",
    description: "Balances de ingresos y gastos, gráficos claros y métricas clave para tomar decisiones como un negocio rentable.",
    benefit: "De hobby a negocio"
  }
];

export const KeyFeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-muted/30 dark:bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Módulos principales
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un sistema completo diseñado específicamente para publishers independientes que buscan orden y profesionalismo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{feature.description}</p>
                <div className="inline-block bg-[#FB923C]/10 text-[#FB923C] px-3 py-1 rounded-full text-sm font-medium">
                  {feature.benefit}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="bg-[#FB923C] hover:bg-[#FB923C]/90 px-8 py-6 text-lg"
          >
            Explora el sistema completo
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Acceso anticipado • Para profesionales serios • Acompañamiento incluido
          </p>
        </motion.div>
      </div>
    </section>
  );
};
