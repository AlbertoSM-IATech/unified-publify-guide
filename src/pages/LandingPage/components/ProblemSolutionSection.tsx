
import { motion } from "framer-motion";
import { AlertTriangle, Target, TrendingUp } from "lucide-react";

const problems = [
  {
    icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
    title: "Caos editorial",
    description: "Documentos dispersos, deadlines perdidos, ventas sin tracking"
  },
  {
    icon: <Target className="w-8 h-8 text-orange-500" />,
    title: "Marketing improvisado", 
    description: "Sin estrategia clara, audiencia dispersa, ROI desconocido"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-yellow-500" />,
    title: "Finanzas opacas",
    description: "Gastos sin control, regalías confusas, rentabilidad incierta"
  }
];

const solutions = [
  "Centraliza toda tu editorial en un solo dashboard",
  "Automatiza tu marketing y multiplica tu alcance",
  "Controla cada euro y maximiza tu rentabilidad"
];

export const ProblemSolutionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-red-50 to-green-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Te suena familiar?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            El 87% de autores independientes pierden más de 10 horas semanales en tareas que podrían automatizar
          </p>
        </motion.div>

        {/* Problems */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur p-6 rounded-xl border border-red-200 text-center"
            >
              <div className="flex justify-center mb-4">
                {problem.icon}
              </div>
              <h3 className="font-semibold text-lg mb-3">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 mx-auto bg-[#FB923C] rounded-full flex items-center justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-white text-2xl"
            >
              ↓
            </motion.div>
          </div>
          <p className="mt-4 text-[#FB923C] font-semibold text-lg">
            Publify resuelve esto automáticamente
          </p>
        </motion.div>

        {/* Solutions */}
        <div className="space-y-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-green-100 p-4 rounded-lg"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">✓</span>
              </div>
              <p className="text-lg font-medium">{solution}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
