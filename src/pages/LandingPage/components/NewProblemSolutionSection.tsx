import { motion } from "framer-motion";
import { FileX2, Zap, TrendingUp, BookOpen, Target, BarChart3 } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const problems = [
  {
    icon: FileX2,
    text: "Documentos sueltos"
  },
  {
    icon: Zap,
    text: "Campañas en mil herramientas"
  },
  {
    icon: TrendingUp,
    text: "Números confusos"
  }
];

const solutions = [
  {
    icon: BookOpen,
    text: "Catálogo unificado"
  },
  {
    icon: Target,
    text: "Marketing 360 integrado"
  },
  {
    icon: BarChart3,
    text: "Finanzas claras y trazables"
  }
];

export const NewProblemSolutionSection = () => {
  return (
    <section className="py-24 bg-muted/30">
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
              Cuando todo está disperso, se pierde foco
            </h2>
            <p className="text-xl text-muted-foreground">
              Publify te devuelve el control: unifica catálogo, automatiza marketing y hace trazables tus resultados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Problems */}
            <motion.div
              variants={fadeIn}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-destructive mb-8 text-center md:text-left">
                El problema actual
              </h3>
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-4 p-4 bg-destructive/5 border border-destructive/20 rounded-lg"
                >
                  <problem.icon className="w-6 h-6 text-destructive flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-lg font-medium text-foreground">{problem.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Solutions */}
            <motion.div
              variants={fadeIn}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-primary mb-8 text-center md:text-left">
                Cómo lo resuelve Publify
              </h3>
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg"
                >
                  <solution.icon className="w-6 h-6 text-primary flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-lg font-medium text-foreground">{solution.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};