
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ContactFaq = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Preguntas frecuentes</CardTitle>
          <CardDescription>
            Respuestas a las consultas más comunes
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">¿Cuánto tiempo tarda en responder el equipo?</h3>
            <p className="text-muted-foreground">
              Normalmente respondemos en un plazo de 24 a 48 horas hábiles.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">¿Ofrecen soporte personalizado?</h3>
            <p className="text-muted-foreground">
              Sí, dependiendo de tu plan de acceso.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">¿Cómo puedo cambiar mi plan?</h3>
            <p className="text-muted-foreground">
              Puedes gestionar tu suscripción desde la sección de Configuración una vez hayas iniciado sesión.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">¿Ofrecen integraciones con otras plataformas?</h3>
            <p className="text-muted-foreground">
              Actualmente ofrecemos integraciones con las principales plataformas de distribución y tiendas online.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
