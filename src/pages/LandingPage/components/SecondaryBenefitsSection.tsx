
import { motion } from "framer-motion";
import { Clock, Target, Shield, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: <Clock className="w-8 h-8 text-blue-500" />,
    title: "Ahorra 15+ horas semanales",
    description: "Automatiza tareas repetitivas y enfócate en escribir"
  },
  {
    icon: <Target className="w-8 h-8 text-green-500" />,
    title: "Incrementa ventas 300%",
    description: "Estrategias probadas por autores bestseller"
  },
  {
    icon: <Shield className="w-8 h-8 text-purple-500" />,
    title: "Datos 100% seguros",
    description: "Encriptación bancaria y copias de seguridad automáticas"
  },
  {
    icon: <Sparkles className="w-8 h-8 text-[#FB923C]" />,
    title: "Soporte VIP incluido",
    description: "Expertos editoriales disponibles 24/7"
  }
];

export const SecondaryBenefitsSection = () => {
  return (
    <section className="py-16 bg-muted/30 dark:bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Más beneficios que te encantarán
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
