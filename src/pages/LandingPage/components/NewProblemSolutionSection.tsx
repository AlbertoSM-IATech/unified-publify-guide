import { FileX2, Zap, TrendingUp, BookOpen, Target, BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
const problems = [
  {
    icon: Target,
    text: "Notion para las ideas."
  },
  {
    icon: FileX2,
    text: "Drive para los archivos."
  },
  {
    icon: TrendingUp,
    text: "Excel para las finanzas."
  },
  {
    icon: Zap,
    text: "Formularios, CRMs, email marketing, embudos..."
  }
];
const solutions = [
  {
    icon: BookOpen,
    text: "Centraliza tu catálogo editorial."
  },
  {
    icon: BarChart3,
    text: "Controla tus finanzas con sentido."
  },
  {
    icon: Target,
    text: "Gestiona el marketing post-venta."
  }
];
export const NewProblemSolutionSection = () => {
  return <section id="problema-solucion" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="fade" duration={0.8}>
            <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              La promesa era: "Sube tu libro y en 72h estará vendiéndose en Amazon".{" "}
              <span className="text-destructive">La realidad: caos, cientos de horas y un negocio que no escala.</span>
            </h2>
              <div className="text-lg text-muted-foreground max-w-3xl mx-auto space-y-4 text-left">
                <p>
                  Amazon te lo pintó bonito: "autopublica gratis y fácil". Lo que no te dijeron es que, si quieres vivir de esto, necesitarás invertir en diseño, edición, anuncios, herramientas, equipo... y tiempo. Mucho tiempo.
                </p>
                <p>
                  Y cuando por fin lo entiendes, ya estás atrapado en mil herramientas sueltas:
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Problems */}
            <div className="space-y-6">
              <ScrollReveal variant="slide-right" delay={0.2}>
                <h3 className="text-destructive mb-6 text-center md:text-center font-normal text-3xl">Terminas trabajando</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Como pulpo, con múltiples herramientas, datos dispersos, sin foco, sin sistema y con la sensación de que siempre vas tarde.
                </p>
              </ScrollReveal>
              {problems.map((problem, index) => <ScrollReveal key={index} variant="slide-right" delay={0.3 + index * 0.15} duration={0.5}>
                  <div className="flex items-center gap-4 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
                    <problem.icon className="w-6 h-6 text-destructive flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-lg font-medium text-foreground">{problem.text}</span>
                  </div>
                </ScrollReveal>)}
            </div>

            {/* Solutions */}
            <div className="space-y-6">
              <ScrollReveal variant="slide-left" delay={0.2}>
                <h3 className="text-primary mb-6 text-center md:text-center text-3xl font-normal">Un solo sitio para gobernarlos a todos</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Publify es el centro operativo del publisher moderno. No hace magia. Hace que tu negocio funcione. No más herramientas sueltas. No más caos. No más excusas.
                </p>
              </ScrollReveal>
              {solutions.map((solution, index) => <ScrollReveal key={index} variant="slide-left" delay={0.3 + index * 0.15} duration={0.5}>
                  <div className="flex items-center gap-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <solution.icon className="w-6 h-6 text-primary flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-lg font-medium text-foreground">{solution.text}</span>
                  </div>
                </ScrollReveal>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};