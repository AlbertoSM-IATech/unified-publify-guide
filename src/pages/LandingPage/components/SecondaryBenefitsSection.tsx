
import { motion } from "framer-motion";
import { Target, Brain, BarChart3, TrendingUp, Users2 } from "lucide-react";

const realBenefits = [
  {
    icon: <Target className="w-8 h-8 text-[#FB923C]" />,
    title: "5+ horas recuperadas semanalmente",
    description: "No más saltos entre Google Drive, KDP, Excel, plataformas de email... Todo centralizado.",
    example: "De 3 horas actualizando datos → 10 minutos"
  },
  {
    icon: <Brain className="w-8 h-8 text-green-500" />,
    title: "Menos estrés, más claridad",
    description: "Sabes exactamente qué libros funcionan, cuáles necesitan atención y dónde invertir tiempo.",
    example: "Decisiones rápidas basadas en datos reales"
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    title: "Finanzas que puedes entender",
    description: "Ve de un vistazo cuánto ganas con cada libro, qué gastos tienes y tu rentabilidad real.",
    example: "Panel visual en lugar de Excel complicados"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
    title: "Marketing que funciona solo",
    description: "Automatizaciones que captan leads, nutren contactos y convierten mientras tú creas.",
    example: "De 0 a campañas automáticas en minutos"
  },
  {
    icon: <Users2 className="w-8 h-8 text-orange-500" />,
    title: "Escalabilidad real",
    description: "Da igual si tienes 5 libros o 50: el sistema crece contigo sin complicarse.",
    example: "Mismo workflow para 1 libro que para 100"
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
          {realBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-semibold mb-3 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">{benefit.description}</p>
              <div className="bg-[#FB923C]/10 border border-[#FB923C]/20 rounded-lg p-2">
                <p className="text-xs font-medium text-[#FB923C]">
                  ✨ {benefit.example}
                </p>
              </div>
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
