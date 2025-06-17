
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, Search, FileX, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const problemPoints = [
  {
    icon: <Search className="w-6 h-6 text-red-500" />,
    title: "Tu Drive es un mercadillo digital",
    description: "Todo está ahí, pero nunca sabes dónde encontrarlo"
  },
  {
    icon: <Clock className="w-6 h-6 text-orange-500" />,
    title: "Decisiones sin contexto",
    description: "Actúas desde el cansancio, sin datos reales"
  },
  {
    icon: <FileX className="w-6 h-6 text-red-500" />,
    title: "Versiones que no reconoces",
    description: "Campañas olvidadas, correos sin abrir, caos total"
  }
];

const solutionPoints = [
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: "Sistema centralizado",
    description: "Todos los activos, datos y tareas editoriales en un solo lugar"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: "Automatización inteligente",
    description: "Los procesos rutinarios se ejecutan solos"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    title: "Visión clara del negocio",
    description: "Entiendes qué funciona y qué necesita atención"
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
            Si somos sinceros...
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Esa sensación cada vez más frecuente de que tu editorial se ha convertido en un monstruo 
            que consume tu tiempo, tu energía y tus ideas.
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
