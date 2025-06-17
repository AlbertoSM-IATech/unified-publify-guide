
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const problemPoints = [
  {
    icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
    title: "Documentos perdidos",
    description: "Archivos dispersos en Google Drive, Dropbox y tu ordenador"
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-500" />,
    title: "Tiempo perdido",
    description: "15+ horas semanales buscando información y organizando datos"
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
    title: "Ventas estancadas",
    description: "Sin datos claros, no sabes qué funciona ni qué mejorar"
  }
];

const solutionPoints = [
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: "Todo centralizado",
    description: "Libros, series, investigaciones y finanzas en un solo lugar"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: "Analytics automático",
    description: "Datos de ventas, rankings y tendencias actualizados en tiempo real"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: "Marketing inteligente",
    description: "Campañas automatizadas que funcionan mientras duermes"
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
            ¿Te suena familiar?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            La mayoría de autores pierde más tiempo organizando que escribiendo
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
              ❌ Sin Publify
            </h3>
            <div className="space-y-6">
              {problemPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800/30"
                >
                  {point.icon}
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">{point.title}</h4>
                    <p className="text-muted-foreground text-sm">{point.description}</p>
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
              ✅ Con Publify
            </h3>
            <div className="space-y-6">
              {solutionPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800/30"
                >
                  {point.icon}
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground">{point.title}</h4>
                    <p className="text-muted-foreground text-sm">{point.description}</p>
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
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="bg-[#FB923C] hover:bg-[#FB923C]/90 px-8 py-6 text-lg"
          >
            Quiero la solución completa
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Prueba gratis 14 días • Sin tarjeta de crédito
          </p>
        </motion.div>
      </div>
    </section>
  );
};
