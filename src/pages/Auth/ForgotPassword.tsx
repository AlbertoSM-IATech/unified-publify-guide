
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, ArrowRight } from "lucide-react";
import { FormField } from "@/components/form/FormField";
import { required, email } from "@/utils/validationRules";

export const ForgotPassword = () => {
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar email
    if (!required().test(userEmail)) {
      setError("El email es obligatorio");
      return;
    }
    
    if (!email().test(userEmail)) {
      setError("El formato del email no es válido");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // TEMPORARY: Simulate sending reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Email enviado",
        description: "Modo de desarrollo: Simulando envío de correo de recuperación"
      });
      
      setEmailSent(true);
    } catch (error) {
      toast({
        title: "Error al enviar el email",
        description: "No se pudo enviar el correo de recuperación. Inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = () => {
    // Reset state to allow resubmission
    setEmailSent(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold">
            {emailSent ? "Revisa tu email" : "Recuperar contraseña"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {emailSent 
              ? "Te hemos enviado un email con instrucciones para recuperar tu contraseña" 
              : "Introduce tu email y te enviaremos instrucciones para recuperar tu contraseña"}
          </p>
        </div>

        {!emailSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Correo electrónico"
              id="email"
              name="email"
              type="email"
              placeholder="tu@correo.com"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
                setError("");
              }}
              error={error}
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar instrucciones"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/20">
              <p className="text-sm">
                Hemos enviado un correo a <span className="font-semibold">{userEmail}</span> con 
                instrucciones para recuperar tu contraseña.
              </p>
            </div>
            
            <Button
              onClick={handleResendEmail}
              variant="outline"
              className="w-full"
            >
              No recibí el correo, reenviar
            </Button>
          </div>
        )}

        <div className="text-center text-sm">
          <Link
            to="/login"
            className="text-primary hover:underline"
          >
            Volver al inicio de sesión
          </Link>
        </div>

        <div className="text-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft size={16} className="mr-2" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
