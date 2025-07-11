
import { motion } from "framer-motion";
import { Star, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-8 h-8 text-[#FB923C]" />,
    number: "2,800+",
    label: "Autores activos"
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    number: "4.9/5",
    label: "Valoración media"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-green-500" />,
    number: "300%",
    label: "Crecimiento promedio en ventas"
  }
];

export const EarlySocialProofSection = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-muted-foreground text-lg">
            Más de 200 autores se han unido esta semana
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-background rounded-lg border shadow-sm"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2 text-foreground">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
