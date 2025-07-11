
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, Search, FileX, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const timeWasters = [
  {
    icon: <Search className="w-8 h-8 text-red-500" />,
    title: "5 horas semanales perdidas",
    description: "Saltando entre Google Drive, Excels, email marketing, herramientas de diseño, KDP, redes sociales...",
    impact: "260 horas anuales malgastadas"
  },
  {
    icon: <FileX className="w-8 h-8 text-red-500" />,
    title: "Archivos y datos dispersos",
    description: "Portadas en un sitio, manuscritos en otro, datos de ventas en Excel, leads en diferentes plataformas",
    impact: "Decisiones lentas y poco informadas"
  },
  {
    icon: <TrendingDown className="w-8 h-8 text-red-500" />,
    title: "Oportunidades perdidas",
    description: "Leads sin seguimiento, campañas descoordinadas, no sabes qué libros son rentables",
    impact: "Menos ventas de las que podrías tener"
  }
];

const solutionPoints = [
  {
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    title: "Una sola plataforma, todo centralizado",
    description: "Gestión de libros, marketing, finanzas y CRM desde un único panel",
    benefit: "Ahorra 5+ horas semanales"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    title: "Marketing automatizado sin complicaciones",
    description: "Landing pages, email marketing, funnels y CRM integrado en español",
    benefit: "Más leads, mejores conversiones"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    title: "Datos y finanzas cristalinas",
    description: "Ve el rendimiento real de cada libro, controla gastos e ingresos fácilmente",
    benefit: "Decisiones inteligentes basadas en datos"
  }
];

export const ProblemSolutionSection = () => {
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
            ¿Cuánto tiempo pierdes realmente cada semana?
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            La gestión editorial tradicional te tiene saltando entre herramientas como un malabarista digital. 
            <strong className="text-foreground"> Publify centraliza todo para que recuperes el control.</strong>
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Problem Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-red-600 dark:text-red-400">
              🔥 El caos editorial actual
            </h3>
            <div className="space-y-6">
              {timeWasters.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30"
                >
                  {point.icon}
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-foreground">{point.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{point.description}</p>
                    <p className="text-xs font-medium text-red-600 dark:text-red-400">
                      💸 {point.impact}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solution Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-green-600 dark:text-green-400">
              ✅ Publify: Un cambio de sistema
            </h3>
            <div className="space-y-6">
              {solutionPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30"
                >
                  {point.icon}
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 text-foreground">{point.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{point.description}</p>
                    <p className="text-xs font-medium text-green-600 dark:text-green-400">
                      ✨ {point.benefit}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-[#FB923C]/5 dark:bg-[#FB923C]/10 p-8 rounded-xl border border-[#FB923C]/20"
        >
          <h3 className="text-xl font-bold mb-4 text-foreground">
            Publify no te da más trabajo. Te devuelve la claridad que habías perdido.
          </h3>
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="bg-[#FB923C] hover:bg-[#FB923C]/90 px-8 py-6 text-lg"
          >
            Recupera el control de tu editorial
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Sistema completo de gestión editorial • Acceso inmediato
          </p>
        </motion.div>
      </div>
    </section>
  );
};
