
import { motion } from "framer-motion";
import { BookOpen, BarChart3, Zap, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const keyFeatures = [
  {
    icon: <BookOpen className="w-12 h-12 text-[#FB923C]" />,
    title: "Biblioteca Centralizada",
    description: "Gestiona todos tus libros, series e investigaciones desde un solo lugar. Sin más documentos perdidos.",
    benefit: "Ahorra 5+ horas semanales"
  },
  {
    icon: <BarChart3 className="w-12 h-12 text-[#FB923C]" />,
    title: "Analytics Inteligente", 
    description: "Ve qué funciona y qué no. Rankings BSR, ventas por país, tendencias de mercado en tiempo real.",
    benefit: "Incrementa ventas 200%+"
  },
  {
    icon: <Zap className="w-12 h-12 text-[#FB923C]" />,
    title: "Marketing Automatizado",
    description: "Campañas que se ejecutan solas. Email marketing, redes sociales, lanzamientos programados.",
    benefit: "3x más alcance"
  },
  {
    icon: <DollarSign className="w-12 h-12 text-[#FB923C]" />,
    title: "Control Financiero Total",
    description: "Regalías, gastos, ROI por libro. Sabrás exactamente cuánto ganas y dónde invertir.",
    benefit: "Control 100% de finanzas"
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
            Todo lo que necesitas para triunfar
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Las 4 herramientas esenciales que utilizan los autores que venden más de €10,000/mes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {keyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-muted/50 to-card dark:from-neutral-800/30 dark:to-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="inline-block bg-[#FB923C]/10 text-[#FB923C] px-3 py-1 rounded-full text-sm font-medium">
                    {feature.benefit}
                  </div>
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
            Quiero probarlo gratis ahora
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Sin tarjeta de crédito • 14 días gratis • Cancela cuando quieras
          </p>
        </motion.div>
      </div>
    </section>
  );
};
