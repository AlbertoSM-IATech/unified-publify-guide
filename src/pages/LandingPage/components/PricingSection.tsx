
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "trial",
    name: "Trial Starter",
    price: "Gratis",
    period: "14 días",
    periodSubtext: "(ampliable a 30 días)",
    description: "Probar sin riesgo",
    features: [
      "1 usuario",
      "Hasta 20 libros",
      "Biblioteca editorial completa",
      "Investigación (notas/checklists)",
      "Nuevas funcionalidades",
      "2 GB almacenamiento por libro",
      "Finanzas básicas (manuales)",
      "Soporte base (FAQ)"
    ],
    popular: false,
    badge: null,
    buttonText: "Probar gratis",
    buttonVariant: "outline" as const,
    phases: null
  },
  {
    id: "starter",
    name: "Starter",
    tagline: "Pon tu editorial en orden",
    price: "19",
    period: "€/mes",
    annualPrice: "190 €/año",
    annualPeriod: "(33,31 €/mes)",
    description: "Autores serios con pocos títulos",
    features: [
      "2 usuarios",
      "Hasta 20 libros",
      "Biblioteca editorial completa",
      "Investigación (notas/checklists)",
      "Todas las nuevas funcionalidades",
      "2 GB almacenamiento por libro",
      "Finanzas básicas (manuales)",
      "Soporte < 72h"
    ],
    popular: false,
    comingSoon: true,
    badge: null,
    buttonText: "Próximamente",
    buttonVariant: "outline" as const,
    phases: {
      betaTesters: {
        price: "0€ para siempre (sin marketing)",
        note: "En fase beta no hay marketing disponible."
      },
      earlyAdopters: {
        option1: "299€ (pago único) licencia lifetime (sin marketing)",
        option2: "1 mes gratis y después 19,99€/mes (durante solo 1 año)"
      },
      preLaunch: {
        price: "1 mes gratis + 29,97€/mes para siempre (solo mientras dure la suscripción)",
        discount: "(Ahorra 10€/mes = 25% dto.)"
      }
    }
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Más popular: escala y automatiza",
    price: "97",
    period: "€/mes",
    annualPrice: "970 €/año",
    annualPeriod: "(80,83 €/mes)",
    description: "Publishers profesionales",
    features: [
      "3 usuarios (ampliables)",
      "Libros ilimitados",
      "Biblioteca editorial completa",
      "Investigación (notas/checklists)",
      "Todas las nuevas funcionalidades",
      "Marketing integrado incluido",
      "Hasta 2.000 emails/mes",
      "3 GB almacenamiento por libro",
      "Finanzas avanzadas (por libro + globales)",
      "Soporte < 24h (prioritario)"
    ],
    marketingModules: [
      "Constructor web nativo (página de autor/editorial, landings, entrega de lead magnets)",
      "Formularios de captación (embebibles por Libro/Serie, con consentimiento RGPD y asociación automática)",
      "CRM de contactos y listas (contacto único con tags, origen y timeline)",
      "Email marketing esencial",
      "Pipeline de leads básico (Nuevo → Interesado → Compró → Postventa; drag & drop + regla auto 'Compró')",
      "Automatizaciones esenciales",
      "Generador de Códigos QR"
    ],
    popular: true,
    badge: "Más Popular",
    buttonText: "Próximamente",
    buttonVariant: "default" as const,
    comingSoon: true,
    phases: {
      betaTesters: {
        price: "Solo pagan la diferencia: +39,97€/mes mientras aguante la suscripción (sin marketing)",
        discount: "(ahorra 17€/mes - 30% dto.)",
        note: "En fase beta no hay marketing disponible."
      },
      earlyAdopters: {
        price: "Con Marketing: pagan la diferencia de 39,97€/mes",
        discount: "(ahorra 17€/mes - 30% dto.)"
      },
      preLaunch: {
        price: "OFERTA DE LANZAMIENTO: +68€/mes (todo incluido) para siempre (solo mientras dure la suscripción)",
        discount: "(ahorra 29€/mes = 30% dto.)"
      }
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const PricingSection = () => {
  const navigate = useNavigate();

  const handlePlanSelection = (planId: string) => {
    if (planId === "beta") {
      // Para el plan beta, redirigir al registro
      navigate("/register");
    } else {
      // Para otros planes, mostrar información
      navigate("/contacto");
    }
  };

  return (
    <section id="precios" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4">
              🚀 Fase Beta - Acceso Limitado
            </Badge>
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">
              Planes y Precios
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estamos en fase beta enfocados en perfeccionar la Biblioteca editorial. Marketing 360 y Finanzas llegarán progresivamente en fases posteriores.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Precios sin IVA
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {plans.map((plan) => (
              <motion.div key={plan.id} variants={cardVariants}>
                <Card className={`relative h-full flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  {plan.popular && plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1">
                        <Star className="w-3 h-3 mr-1" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    {plan.tagline && (
                      <p className="text-xs text-muted-foreground italic mt-1">{plan.tagline}</p>
                    )}
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground text-base"> {plan.period}</span>
                      )}
                      {plan.periodSubtext && (
                        <span className="text-muted-foreground text-xs block mt-1">{plan.periodSubtext}</span>
                      )}
                      {plan.annualPrice && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {plan.annualPrice} <span className="text-xs">{plan.annualPeriod}</span>
                        </p>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="flex flex-col flex-1">
                    <ul className="space-y-2 mb-6 flex-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.marketingModules && (
                      <div className="mb-6 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <p className="text-xs font-semibold mb-2 text-primary">Incluye Marketing Pro:</p>
                        <ul className="space-y-1">
                          {plan.marketingModules.slice(0, 4).map((module, index) => (
                            <li key={index} className="text-xs text-muted-foreground flex items-start">
                              <Check className="w-3 h-3 text-primary mr-1 mt-0.5 flex-shrink-0" />
                              <span>{module}</span>
                            </li>
                          ))}
                          <li className="text-xs text-primary font-medium mt-1">+ {plan.marketingModules.length - 4} más</li>
                        </ul>
                      </div>
                    )}

                    {plan.phases && (
                      <div className="mb-6 space-y-3 text-xs">
                        <div className="p-2 bg-muted/50 rounded border">
                          <p className="font-semibold text-primary mb-1">Beta Testers (10 usuarios):</p>
                          <p className="text-muted-foreground">{plan.phases.betaTesters.price}</p>
                          {plan.phases.betaTesters.discount && (
                            <p className="text-green-600 dark:text-green-400 font-medium">{plan.phases.betaTesters.discount}</p>
                          )}
                          {plan.phases.betaTesters.note && (
                            <p className="text-muted-foreground italic mt-1">{plan.phases.betaTesters.note}</p>
                          )}
                        </div>

                        {plan.phases.earlyAdopters && (
                          <div className="p-2 bg-muted/50 rounded border">
                            <p className="font-semibold text-primary mb-1">Early Adopters (50 usuarios):</p>
                            {plan.phases.earlyAdopters.option1 && (
                              <>
                                <p className="text-muted-foreground">{plan.phases.earlyAdopters.option1}</p>
                                <p className="text-muted-foreground mt-1">o {plan.phases.earlyAdopters.option2}</p>
                              </>
                            )}
                            {plan.phases.earlyAdopters.price && (
                              <>
                                <p className="text-muted-foreground">{plan.phases.earlyAdopters.price}</p>
                                <p className="text-green-600 dark:text-green-400 font-medium">{plan.phases.earlyAdopters.discount}</p>
                              </>
                            )}
                          </div>
                        )}

                        {plan.phases.preLaunch && (
                          <div className="p-2 bg-muted/50 rounded border">
                            <p className="font-semibold text-primary mb-1">Oferta Lanzamiento (30 días):</p>
                            <p className="text-muted-foreground">{plan.phases.preLaunch.price}</p>
                            <p className="text-green-600 dark:text-green-400 font-medium">{plan.phases.preLaunch.discount}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <Button
                      variant={plan.buttonVariant}
                      size="lg"
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : ''}`}
                      onClick={() => handlePlanSelection(plan.id)}
                      disabled={plan.comingSoon}
                    >
                      {plan.buttonText}
                    </Button>
                    {plan.comingSoon && (
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Disponible en fase Early Adopters
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-muted-foreground">
            ¿Necesitas un plan personalizado? {" "}
            <a href="/contacto" className="text-primary hover:underline font-medium">
              Contáctanos
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
