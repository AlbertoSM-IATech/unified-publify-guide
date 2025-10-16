
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "beta",
    name: "Beta Tester",
    price: "0",
    period: "Gratis para siempre",
    description: "Acceso exclusivo en fase beta - Solo 10 plazas",
    features: [
      "Hasta 20 libros",
      "Biblioteca editorial completa",
      "Gestión de investigaciones",
      "Todas las nuevas funcionalidades",
      "2 GB almacenamiento por libro",
      "Finanzas básicas",
      "Soporte prioritario",
      "Licencia vitalicia gratuita"
    ],
    popular: true,
    badge: "Fase Beta",
    buttonText: "Unirme a Beta",
    buttonVariant: "default" as const
  },
  {
    id: "starter",
    name: "Starter",
    price: "39.97",
    period: "por mes",
    description: "Pon tu editorial en orden desde el primer día",
    features: [
      "Hasta 20 libros",
      "2 usuarios",
      "Biblioteca editorial completa",
      "Gestión de investigaciones",
      "Todas las nuevas funcionalidades",
      "2 GB almacenamiento por libro",
      "Finanzas básicas",
      "Soporte < 72h"
    ],
    popular: false,
    comingSoon: true,
    buttonText: "Próximamente",
    buttonVariant: "outline" as const
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
    <section className="py-24 bg-muted/30">
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
            className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {plans.map((plan) => (
              <motion.div key={plan.id} variants={cardVariants}>
                <Card className={`relative h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
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
                    <div className="mt-4">
                      <span className="text-4xl font-bold">€{plan.price}</span>
                      {plan.price !== "0" && (
                        <span className="text-muted-foreground text-base">/{plan.period}</span>
                      )}
                      {plan.price === "0" && (
                        <span className="text-muted-foreground text-base block">{plan.period}</span>
                      )}
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="flex flex-col h-full">
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
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
            <a href="/contacto" className="text-[#FB923C] hover:underline font-medium">
              Contáctanos
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
