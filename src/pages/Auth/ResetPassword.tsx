
import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Lock } from "lucide-react";
import { FormField } from "@/components/form/FormField";
import { required, minLength, matches } from "@/utils/validationRules";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!required().test(formData.password)) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!minLength(6).test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Validar que exista un token
    if (!token) {
      toast({
        title: "Error",
        description: "Token de recuperación inválido o ausente",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // TEMPORARY: Simulate resetting password
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Contraseña actualizada",
        description: "Tu contraseña ha sido actualizada correctamente"
      });
      
      // Redirigir al login
      navigate("/login", { replace: true });
    } catch (error) {
      toast({
        title: "Error al actualizar contraseña",
        description: "No se pudo actualizar la contraseña. Por favor, inténtalo de nuevo.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar que existe un token (simulado)
  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <h1 className="font-heading text-3xl font-bold">Enlace inválido</h1>
          <p className="text-muted-foreground">
            El enlace de recuperación de contraseña es inválido o ha expirado.
          </p>
          <Button asChild>
            <Link to="/auth/forgot-password">
              Solicitar un nuevo enlace
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold">Restablecer contraseña</h1>
          <p className="mt-2 text-muted-foreground">
            Crea una nueva contraseña para tu cuenta
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Nueva contraseña"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={<Lock className="h-4 w-4 text-muted-foreground" />}
            required
          />

          <FormField
            label="Confirmar contraseña"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={<Lock className="h-4 w-4 text-muted-foreground" />}
            required
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Actualizando..." : "Actualizar contraseña"}
          </Button>
        </form>

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

export default ResetPassword;
