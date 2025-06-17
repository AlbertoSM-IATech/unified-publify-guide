
import { motion } from "framer-motion";
import { Users, FileText, Target, Star } from "lucide-react";

const stats = [
  { icon: <Users className="w-6 h-6" />, number: "2,847", label: "Publishers profesionales" },
  { icon: <FileText className="w-6 h-6" />, number: "12,394", label: "Títulos gestionados" },
  { icon: <Target className="w-6 h-6" />, number: "95%", label: "Reducción del caos editorial" },
  { icon: <Star className="w-6 h-6" />, number: "4.9/5", label: "Satisfacción del sistema" }
];

const testimonials = [
  {
    text: "Por fin tengo todo centralizado",
    author: "Ana Martínez",
    role: "Autora independiente"
  },
  {
    text: "Mi editorial ya no es un caos", 
    author: "Carlos López",
    role: "Publisher de thriller"
  },
  {
    text: "Publify cambió mi forma de trabajar",
    author: "Laura García",
    role: "Editorial emergente"
  }
];

export const EarlySocialProofSection = () => {
  return (
    <section className="py-16 bg-muted/50 dark:bg-neutral-800/30">
      <div className="container mx-auto px-4">
        {/* Target audience clarification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            Publify es para ti, Publisher Independiente
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-4xl mx-auto">
            Para autores independientes, emprendedores editoriales, equipos pequeños, editoriales emergentes 
            y especialmente para quienes están empezando en KDP y se sienten abrumados gestionando su negocio editorial.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 max-w-4xl mx-auto text-sm">
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="font-semibold text-[#FB923C] mb-1">Autores independientes</div>
              <div className="text-muted-foreground">Necesitan orden y visión estratégica</div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="font-semibold text-[#FB923C] mb-1">Emprendedores editoriales</div>
              <div className="text-muted-foreground">Compaginan escritura con otros trabajos</div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="font-semibold text-[#FB923C] mb-1">Equipos pequeños</div>
              <div className="text-muted-foreground">Buscan eficiencia sin sacrificar profesionalismo</div>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border">
              <div className="font-semibold text-[#FB923C] mb-1">Principiantes en KDP</div>
              <div className="text-muted-foreground">Abrumados por la gestión del negocio</div>
            </div>
          </div>
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-[#FB923C]">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <span className="ml-2 font-semibold">Sistema profesional desde el día uno</span>
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

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-sm border border-border"
            >
              <p className="font-medium mb-3 text-foreground">"{testimonial.text}"</p>
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
