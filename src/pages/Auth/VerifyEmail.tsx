
import { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MailCheck, RefreshCw } from "lucide-react";

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  
  // Verificar automáticamente si hay token
  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);
  
  const verifyEmail = async () => {
    setIsVerifying(true);
    
    try {
      // TEMPORARY: Simulate email verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsVerified(true);
      toast({
        title: "Email verificado",
        description: "Tu correo electrónico ha sido verificado correctamente"
      });
      
      // Delayed redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast({
        title: "Error de verificación",
        description: "No se pudo verificar tu correo electrónico. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsVerifying(false);
    }
  };
  
  const handleResendEmail = async () => {
    setResendingEmail(true);
    
    try {
      // TEMPORARY: Simulate resending verification email
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Email reenviado",
        description: "Hemos reenviado el correo de verificación"
      });
    } catch (error) {
      toast({
        title: "Error al reenviar",
        description: "No se pudo reenviar el correo de verificación. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setResendingEmail(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold">
            {isVerified ? "Email verificado" : "Verifica tu email"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isVerified 
              ? "Tu correo ha sido verificado correctamente" 
              : token 
                ? "Estamos verificando tu correo electrónico..." 
                : "Hemos enviado un correo de verificación a tu dirección email"}
          </p>
        </div>
        
        <div className="flex justify-center py-6">
          <div className="rounded-full bg-muted/20 p-6">
            <MailCheck className={`h-12 w-12 ${isVerified ? 'text-green-500' : 'text-muted-foreground'}`} />
          </div>
        </div>
        
        {!token && !isVerified && (
          <div className="space-y-4">
            <div className="rounded-lg border p-4 bg-muted/20">
              <p className="text-sm">
                {email ? (
                  <>Hemos enviado un correo a <span className="font-semibold">{email}</span>.</>
                ) : (
                  <>Hemos enviado un correo a tu dirección de email.</>
                )}
                {' '}Por favor, haz clic en el enlace de verificación para completar tu registro.
              </p>
            </div>
            
            <Button
              onClick={handleResendEmail}
              variant="outline"
              className="w-full"
              disabled={resendingEmail}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {resendingEmail ? "Reenviando..." : "Reenviar email de verificación"}
            </Button>
            
            <div className="p-4 border rounded-md bg-muted/10">
              <p className="text-sm text-center text-muted-foreground">
                ¿No recibiste el correo? Revisa tu carpeta de spam o correo no deseado.
              </p>
            </div>
          </div>
        )}
        
        {isVerified && (
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Serás redirigido automáticamente al dashboard en unos segundos...
            </p>
            <Button asChild>
              <Link to="/dashboard">
                Ir al dashboard ahora
              </Link>
            </Button>
          </div>
        )}
        
        {isVerifying && (
          <div className="flex justify-center">
            <div className="animate-pulse text-center">
              <p className="text-muted-foreground">Verificando tu correo electrónico...</p>
            </div>
          </div>
        )}

        <div className="text-center">
          <Button asChild variant="ghost" size="sm">
            <Link to="/login">
              <ArrowLeft size={16} className="mr-2" />
              Volver al inicio de sesión
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
