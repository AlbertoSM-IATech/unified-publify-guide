
import { motion } from "framer-motion";
import { Target, Brain, BarChart3, TrendingUp, Users2 } from "lucide-react";

const benefits = [
  {
    icon: <Target className="w-8 h-8 text-[#FB923C]" />,
    title: "Todo centralizado",
    description: "Archivos, tareas, enlaces y decisiones en un único lugar pensado para tu editorial"
  },
  {
    icon: <Brain className="w-8 h-8 text-green-500" />,
    title: "Tu cabeza despejada",
    description: "Menos estrés, más foco en lo que mueve tu editorial hacia adelante"
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    title: "Decisiones con datos",
    description: "Ve qué funciona, qué necesita atención y qué puedes escalar"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
    title: "Escalas sin fricción",
    description: "Cada nuevo título se apoya en un sistema que ya funciona"
  },
  {
    icon: <Users2 className="w-8 h-8 text-orange-500" />,
    title: "Puedes delegar",
    description: "Tu equipo sabe qué hacer porque el sistema lo indica con claridad"
  }
];

export const SecondaryBenefitsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Beneficios tangibles (no promesas vacías)
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Publify se convierte en la columna vertebral de tu negocio editorial
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg text-center shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold mb-3 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-[#FB923C]/10 to-primary/10 dark:from-[#FB923C]/20 dark:to-primary/20 p-8 rounded-xl border border-[#FB923C]/20">
            <h3 className="text-xl font-bold mb-4 text-foreground">
              "Publify no se limita a ser útil. Se convierte en la columna vertebral de tu negocio editorial."
            </h3>
            <p className="text-muted-foreground">
              Sistema completo • Gestión profesional • Crecimiento ordenado
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
