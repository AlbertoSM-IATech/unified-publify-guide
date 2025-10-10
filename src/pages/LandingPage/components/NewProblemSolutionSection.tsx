import { FileX2, Zap, TrendingUp, BookOpen, Target, BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

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
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="fade" duration={0.8}>
            <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cuando todo está disperso, se pierde foco
            </h2>
              <p className="text-xl text-muted-foreground">
                Publify te devuelve el control: unifica catálogo, automatiza marketing y hace trazables tus resultados.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Problems */}
            <div className="space-y-6">
              <ScrollReveal variant="slide-right" delay={0.2}>
                <h3 className="text-2xl font-bold text-destructive mb-8 text-center md:text-left">
                  El problema actual
                </h3>
              </ScrollReveal>
              {problems.map((problem, index) => (
                <ScrollReveal
                  key={index}
                  variant="slide-right"
                  delay={0.3 + index * 0.15}
                  duration={0.5}
                >
                  <div className="flex items-center gap-4 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <problem.icon className="w-6 h-6 text-destructive flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-lg font-medium text-foreground">{problem.text}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Solutions */}
            <div className="space-y-6">
              <ScrollReveal variant="slide-left" delay={0.2}>
                <h3 className="text-2xl font-bold text-primary mb-8 text-center md:text-left">
                  Cómo lo resuelve Publify
                </h3>
              </ScrollReveal>
              {solutions.map((solution, index) => (
                <ScrollReveal
                  key={index}
                  variant="slide-left"
                  delay={0.3 + index * 0.15}
                  duration={0.5}
                >
                  <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <solution.icon className="w-6 h-6 text-primary flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-lg font-medium text-foreground">{solution.text}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};