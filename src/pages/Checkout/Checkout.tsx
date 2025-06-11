
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, ArrowLeft, CreditCard, Shield, Lock } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";

const planDetails = {
  starter: {
    name: "Starter",
    price: "9.99",
    description: "Ideal para autores que empiezan a publicar",
    features: [
      "Hasta 15 libros",
      "Gestión avanzada de series",
      "Análisis de rendimiento",
      "Seguimiento de ventas",
      "Soporte prioritario"
    ],
    stripePriceId: "price_starter_monthly" // Este será el ID real de Stripe
  },
  pro: {
    name: "Pro",
    price: "24.99",
    description: "Para autores profesionales con múltiples proyectos",
    features: [
      "Libros ilimitados",
      "Gestión completa de investigaciones",
      "Dashboard avanzado",
      "Automatización de marketing",
      "Análisis financiero detallado"
    ],
    stripePriceId: "price_pro_monthly" // Este será el ID real de Stripe
  }
};

export const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    company: "",
    country: "España"
  });

  const planId = searchParams.get("plan") as keyof typeof planDetails;
  const plan = planDetails[planId];

  useEffect(() => {
    // Si no hay plan válido, redirigir a la landing
    if (!plan) {
      navigate("/");
    }
  }, [plan, navigate]);

  if (!plan) {
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      // Aquí se integrará con Stripe
      console.log("Iniciando checkout con Stripe...", {
        plan: planId,
        stripePriceId: plan.stripePriceId,
        customerData: formData
      });
      
      // TODO: Implementar integración con Stripe
      // const response = await supabase.functions.invoke('create-checkout', {
      //   body: {
      //     priceId: plan.stripePriceId,
      //     customerEmail: formData.email,
      //     customerName: formData.fullName,
      //     successUrl: `${window.location.origin}/checkout/success`,
      //     cancelUrl: `${window.location.origin}/checkout/cancel`
      //   }
      // });
      
      // if (response.data?.url) {
      //   window.open(response.data.url, '_blank');
      // }
      
      // Por ahora, simular proceso
      setTimeout(() => {
        alert("Checkout preparado para integración con Stripe. ¡Pronto podrás completar tu compra!");
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error("Error en el checkout:", error);
      setIsLoading(false);
    }
  };

  const isFormValid = formData.email && formData.fullName;

  return (
    <PageLayout showBreadcrumbs={false}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver a planes
            </Button>
            <h1 className="text-3xl font-bold">Completar Suscripción</h1>
            <p className="text-muted-foreground mt-2">
              Estás a un paso de comenzar con el plan {plan.name}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulario de checkout */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-[#FB923C]" />
                  Información de Facturación
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fullName">Nombre completo *</Label>
                    <Input
                      id="fullName"
                      placeholder="Tu nombre completo"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Empresa (opcional)</Label>
                    <Input
                      id="company"
                      placeholder="Nombre de tu empresa"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 mr-2 text-green-500" />
                    Pago seguro procesado por Stripe
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Lock className="w-4 h-4 mr-2 text-green-500" />
                    Encriptación SSL de 256 bits
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Al proceder con el pago, aceptas nuestros términos de servicio y política de privacidad.
                    Puedes cancelar tu suscripción en cualquier momento.
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-[#FB923C] hover:bg-[#FB923C]/90"
                  onClick={handleCheckout}
                  disabled={!isFormValid || isLoading}
                >
                  {isLoading ? "Procesando..." : `Suscribirse por €${plan.price}/mes`}
                </Button>
              </CardContent>
            </Card>

            {/* Resumen del plan */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Plan {plan.name}</h3>
                    <p className="text-muted-foreground text-sm">{plan.description}</p>
                  </div>
                  <Badge className="bg-[#FB923C] hover:bg-[#FB923C]/90">
                    Mensual
                  </Badge>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Incluye:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>€{plan.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>IVA (21%)</span>
                    <span>€{(parseFloat(plan.price) * 0.21).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>€{(parseFloat(plan.price) * 1.21).toFixed(2)}/mes</span>
                  </div>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">¿Por qué elegir este plan?</h4>
                  <p className="text-xs text-muted-foreground">
                    El plan {plan.name} está diseñado para {plan.name === "Starter" ? "autores que están comenzando su carrera" : "escritores profesionales"} 
                    y te proporcionará todas las herramientas necesarias para gestionar tu obra literaria de manera eficiente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Checkout;
