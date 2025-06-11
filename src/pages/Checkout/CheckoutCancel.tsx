
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/common/Button";
import { PageLayout } from "@/components/layout/PageLayout";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

export const CheckoutCancel = () => {
  const navigate = useNavigate();

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
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-600">
                Pago Cancelado
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <p className="text-muted-foreground mb-4">
                  No se ha procesado ningún pago. Tu suscripción no ha sido activada.
                </p>
                
                <div className="bg-muted/50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-2">¿Tuviste algún problema?</h3>
                  <p className="text-sm text-muted-foreground text-left">
                    Si experimentaste algún error durante el proceso de pago o tienes dudas sobre los planes, 
                    no dudes en contactarnos. Estaremos encantados de ayudarte a encontrar la mejor opción para ti.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  size="lg"
                  className="w-full bg-[#FB923C] hover:bg-[#FB923C]/90"
                  onClick={() => navigate("/")}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Intentar de Nuevo
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/contacto")}
                >
                  Contactar Soporte
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
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

export default CheckoutCancel;
