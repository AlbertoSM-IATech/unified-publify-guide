
import { motion } from "framer-motion";
import { Star, Users, BookOpen, TrendingUp } from "lucide-react";

const stats = [
  { icon: <Users className="w-6 h-6" />, number: "2,847", label: "Autores activos" },
  { icon: <BookOpen className="w-6 h-6" />, number: "12,394", label: "Libros gestionados" },
  { icon: <TrendingUp className="w-6 h-6" />, number: "847%", label: "Incremento promedio en ventas" },
  { icon: <Star className="w-6 h-6" />, number: "4.9/5", label: "Valoración promedio" }
];

const quickTestimonials = [
  {
    text: "Mis ventas se triplicaron en 2 meses",
    author: "Ana Martínez",
    role: "Romance bestseller"
  },
  {
    text: "Ahorro 15 horas a la semana",
    author: "Carlos López", 
    role: "Thriller independiente"
  },
  {
    text: "Por fin entiendo mis números",
    author: "Laura García",
    role: "Fantasía épica"
  }
];

export const EarlySocialProofSection = () => {
  return (
    <section className="py-16 bg-[#FB923C]/5">
      <div className="container mx-auto px-4">
        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Más de 2,800 autores confían en Publify
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-[#FB923C]">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="ml-2 font-semibold">4.9/5 en Trustpilot</span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-2 text-[#FB923C]">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-[#FB923C]">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {quickTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <p className="font-medium mb-3">"{testimonial.text}"</p>
              <div className="text-sm text-muted-foreground">
                <div className="font-medium">{testimonial.author}</div>
                <div>{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
