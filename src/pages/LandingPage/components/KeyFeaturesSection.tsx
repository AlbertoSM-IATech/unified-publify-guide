
import { motion } from "framer-motion";
import { BookOpen, Zap, LineChart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Centro de Control Editorial",
    description: "Gestiona toda tu biblioteca desde un dashboard intuitivo. Desde la idea hasta la venta, todo organizado.",
    benefits: [
      "Fichas completas con ASIN, ISBN, BSR dinámico",
      "Almacenamiento seguro en la nube de archivos",
      "Organización por colecciones y categorías",
      "Cálculo automático de regalías por formato",
      "Panel de investigación tipo Notion integrado"
    ],
    highlight: "Todo tu catálogo centralizado"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Marketing Sin Complicaciones",
    description: "Construye landing pages, automatiza emails y gestiona leads sin conocimientos técnicos.",
    benefits: [
      "Constructor web ilimitado sin código",
      "Email marketing con 2.000 emails/mes incluidos",
      "Funnels de venta visuales paso a paso",
      "CRM y pipeline integrado",
      "Chat web con IA conversacional"
    ],
    highlight: "Deja de pagar múltiples plataformas"
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Finanzas Cristalinas",
    description: "Ve realmente cuánto ganas con cada libro. Control total de ingresos, gastos y rentabilidad.",
    benefits: [
      "Dashboards visuales de rendimiento",
      "Seguimiento de gastos por proyecto",
      "Análisis de rentabilidad por libro",
      "Exportación de informes detallados",
      "Integración con datos de KDP"
    ],
    highlight: "Decisiones basadas en datos reales"
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "Automatización Inteligente",
    description: "Workflows automáticos que trabajan mientras tú creas. Todo sincronizado y con backups automáticos.",
    benefits: [
      "Sincronización total entre dispositivos",
      "Backups automáticos en la nube",
      "Flujos de trabajo personalizables",
      "Integraciones con herramientas que ya usas",
      "Notificaciones inteligentes"
    ],
    highlight: "Tu negocio funciona solo"
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
              
              <ul className="space-y-3 mb-4">
                {feature.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-foreground">
                    <div className="w-2 h-2 bg-[#FB923C] rounded-full mt-2 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-semibold text-[#FB923C]">
                  💡 {feature.highlight}
                </p>
              </div>
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
