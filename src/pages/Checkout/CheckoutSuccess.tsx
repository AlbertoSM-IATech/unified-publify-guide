
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import { PageLayout } from "@/components/layout/PageLayout";
import { CheckCircle, ArrowRight } from "lucide-react";

export const CheckoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí podrías verificar el estado del pago con Stripe
    // y actualizar la suscripción del usuario en la base de datos
    console.log("Verificando estado del pago...");
  }, []);

  return (
    <PageLayout showBreadcrumbs={false}>
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                ¡Pago Completado con Éxito!
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  Tu suscripción ha sido activada correctamente. Ya puedes comenzar a disfrutar de todas las funcionalidades de tu plan.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">¿Qué sigue ahora?</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li>• Recibirás un email de confirmación con tu factura</li>
                    <li>• Tu suscripción se renovará automáticamente cada mes</li>
                    <li>• Puedes gestionar tu suscripción desde tu perfil</li>
                    <li>• Tendrás acceso inmediato a todas las funciones premium</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  size="lg"
                  className="w-full bg-[#FB923C] hover:bg-[#FB923C]/90"
                  onClick={() => navigate("/dashboard")}
                >
                  Ir al Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  Volver al Inicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default CheckoutSuccess;
