
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "0",
    period: "Gratis para siempre",
    description: "Perfecto para comenzar tu proyecto literario",
    features: [
      "Hasta 3 libros",
      "Gestión básica de contenido",
      "Estadísticas básicas",
      "Soporte por email",
      "Plantillas básicas"
    ],
    popular: false,
    buttonText: "Comenzar Gratis",
    buttonVariant: "outline" as const
  },
  {
    id: "starter",
    name: "Starter",
    price: "9.99",
    period: "por mes",
    description: "Ideal para autores que empiezan a publicar",
    features: [
      "Hasta 15 libros",
      "Gestión avanzada de series",
      "Análisis de rendimiento",
      "Seguimiento de ventas",
      "Soporte prioritario",
      "Plantillas premium",
      "Exportación de datos"
    ],
    popular: true,
    buttonText: "Elegir Starter",
    buttonVariant: "default" as const
  },
  {
    id: "pro",
    name: "Pro",
    price: "24.99",
    period: "por mes",
    description: "Para autores profesionales con múltiples proyectos",
    features: [
      "Libros ilimitados",
      "Gestión completa de investigaciones",
      "Dashboard avanzado",
      "Automatización de marketing",
      "Análisis financiero detallado",
      "Integraciones con plataformas",
      "Soporte 24/7",
      "Funciones experimentales"
    ],
    popular: false,
    buttonText: "Elegir Pro",
    buttonVariant: "default" as const
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
    if (planId === "free") {
      // Para el plan gratuito, redirigir al registro
      navigate("/register");
    } else {
      // Para planes de pago, ir al checkout
      navigate(`/checkout?plan=${planId}`);
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
          <h2 className="text-3xl font-bold mb-4 md:text-4xl">
            Planes y Precios
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elige el plan perfecto para tu carrera literaria. Comienza gratis y escala según crezcan tus necesidades.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Precios sin IVA
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan) => (
            <motion.div key={plan.id} variants={cardVariants}>
              <Card className={`relative h-full ${plan.popular ? 'border-[#FB923C] shadow-lg' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#FB923C] hover:bg-[#FB923C]/90 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Más Popular
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
                    className={`w-full ${plan.popular ? 'bg-[#FB923C] hover:bg-[#FB923C]/90' : ''}`}
                    onClick={() => handlePlanSelection(plan.id)}
                  >
                    {plan.buttonText}
                  </Button>
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
