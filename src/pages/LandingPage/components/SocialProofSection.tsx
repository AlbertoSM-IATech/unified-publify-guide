import { Users, TrendingUp, Clock, Award, BookOpen, BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";


const stats = [
  { icon: Users, value: "500+", label: "Publishers activos" },
  { icon: BookOpen, value: "3,200+", label: "Libros gestionados" },
  { icon: Clock, value: "8h", label: "Ahorradas por semana" },
  { icon: TrendingUp, value: "35%", label: "Aumento en ventas" },
];

const quickTestimonials = [
  {
    text: "Recuperé el control de mi catálogo en menos de una semana.",
    author: "Ana Ruiz",
    role: "6 libros publicados"
  },
  {
    text: "Las automatizaciones de marketing me han duplicado los leads.",
    author: "Javier López",
    role: "Editorial indie"
  },
  {
    text: "Por fin entiendo de dónde viene cada euro que gano.",
    author: "Carmen Torres",
    role: "Autora bestseller"
  }
];

export const SocialProofSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Main testimonial */}
        <ScrollReveal variant="zoom" duration={0.8}>
          <div className="max-w-4xl mx-auto text-center mb-16">
            <blockquote className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="mb-6">
                <Award className="w-12 h-12 mx-auto text-primary mb-4" />
              </div>
              <p className="text-2xl md:text-3xl font-medium text-foreground mb-6 leading-relaxed">
                "Por fin tenemos todo en un mismo sitio. Menos horas de caos, más horas de escribir."
              </p>
              <footer className="text-muted-foreground text-lg">
                — <cite className="not-italic font-semibold text-foreground">María González</cite>, Autora & Editorial
              </footer>
            </blockquote>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <ScrollReveal
                key={index}
                variant="slide-up"
                delay={index * 0.1}
                duration={0.5}
              >
                <div className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Quick testimonials */}
        <ScrollReveal variant="fade" delay={0.2}>
          <div className="max-w-6xl mx-auto">
            <h3 className="text-center text-xl font-semibold mb-8 text-muted-foreground">
              Lo que dicen nuestros usuarios
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {quickTestimonials.map((testimonial, index) => (
                <ScrollReveal
                  key={index}
                  variant="rotate"
                  delay={index * 0.15}
                  duration={0.6}
                >
                  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors h-full">
                    <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-sm">{testimonial.author}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal variant="slide-up" delay={0.3} duration={0.7}>
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">Diseñado específicamente para</p>
            <div className="flex flex-wrap justify-center gap-6 items-center">
              <div className="px-6 py-3 bg-muted/50 rounded-lg border border-border">
                <span className="font-semibold">Amazon KDP</span>
              </div>
              <div className="px-6 py-3 bg-muted/50 rounded-lg border border-border">
                <span className="font-semibold">Autores independientes</span>
              </div>
              <div className="px-6 py-3 bg-muted/50 rounded-lg border border-border">
                <span className="font-semibold">Editoriales indie</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};