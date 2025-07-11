
import { motion } from "framer-motion";
import { BookOpen, Zap, LineChart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Gestión Editorial Completa",
    description: "Organiza libros, colecciones, investigaciones y todo tu contenido editorial en un sistema integrado.",
    benefits: [
      "Fichas detalladas de cada libro",
      "Seguimiento de estados y procesos",
      "Gestión de colecciones y series",
      "Control de versiones y archivos"
    ]
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Marketing Automatizado",
    description: "Crea y gestiona campañas de marketing sin complicaciones técnicas.",
    benefits: [
      "Landing pages profesionales",
      "Email marketing automatizado",
      "Formularios y lead magnets",
      "Análisis de conversiones"
    ]
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Análisis Financiero",
    description: "Controla tus ingresos, gastos y rentabilidad por libro y campaña.",
    benefits: [
      "Importación de regalías CSV",
      "Seguimiento de gastos por proyecto",
      "Informes de rentabilidad",
      "Dashboards visuales"
    ]
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Integraciones Potentes",
    description: "Conecta con las plataformas que ya usas para maximizar tu eficiencia.",
    benefits: [
      "Amazon KDP y otras plataformas",
      "Herramientas de diseño",
      "Sistemas de pago",
      "Analytics y métricas"
    ]
  }
];

export const KeyFeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
            Todo lo que necesitas en una plataforma
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Publify integra todas las herramientas esenciales para gestionar y hacer crecer tu negocio editorial
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-8 rounded-xl border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#FB923C]/10 rounded-lg text-[#FB923C]">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {feature.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-6 text-lg">
                {feature.description}
              </p>
              
              <ul className="space-y-3">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 bg-[#FB923C] rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="bg-[#FB923C] hover:bg-[#FB923C]/90 px-8 py-6 text-lg"
          >
            Explorar todas las funciones
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
