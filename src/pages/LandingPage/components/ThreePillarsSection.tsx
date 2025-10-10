import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const pillars = [
  {
    icon: BookOpen,
    title: "Biblioteca editorial",
    description: "Centraliza ASIN/ISBN, metadatos y archivos finales. Todo ordenado por libro y equipo.",
    cta: "Ver más"
  },
  {
    icon: Target,
    title: "Marketing 360 (integrado con GoHighLevel)",
    description: "Webs/landings, formularios, CRM, embudos y email desde un mismo flujo.",
    cta: "Ver más"
  },
  {
    icon: BarChart3,
    title: "Finanzas y trazabilidad",
    description: "Regalías, gastos y métricas clave en un panel claro para decidir con datos.",
    cta: "Ver más"
  }
];

export const ThreePillarsSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal variant="zoom" duration={0.8}>
            <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Los 3 pilares de Publify
            </h2>
              <p className="text-xl text-muted-foreground">
                Una plataforma completa diseñada para tu crecimiento editorial
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <ScrollReveal
                key={index}
                variant="flip"
                delay={index * 0.2}
                duration={0.8}
                className="h-full"
              >
                <Card className="h-full bg-card border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <pillar.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">
                      {pillar.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </CardDescription>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-colors duration-300"
                    >
                      {pillar.cta}
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};