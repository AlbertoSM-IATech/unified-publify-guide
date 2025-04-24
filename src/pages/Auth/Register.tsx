import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Lock, User, ArrowRight } from "lucide-react";
import { FormField } from "@/components/form/FormField";
import { Label } from "@/components/ui/label";
import { required, email, minLength, matches } from "@/utils/validationRules";

export const Register = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!required().test(formData.fullName)) {
      newErrors.fullName = "El nombre es obligatorio";
    }
    
    if (!required().test(formData.email)) {
      newErrors.email = "El email es obligatorio";
    } else if (!email().test(formData.email)) {
      newErrors.email = "El formato del email no es válido";
    }
    
    if (!required().test(formData.password)) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (!minLength(6).test(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Debes aceptar los términos y condiciones";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await signup(formData.email, formData.password);
      toast({
        title: "Registro exitoso",
        description: "Modo de desarrollo: Autenticación desactivada temporalmente",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error de registro",
        description: "No se pudo completar el registro. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDirectAccess = () => {
    toast({
      title: "Acceso directo activado",
      description: "Modo de desarrollo: Navegando directamente al dashboard",
    });
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold">Crear cuenta</h1>
          <p className="mt-2 text-muted-foreground">
            Registra tus datos para acceder a Publify
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <FormField
            label="Nombre completo"
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Tu nombre completo"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
            icon={<User className="h-4 w-4 text-muted-foreground" />}
            required
          />

          <FormField
            label="Correo electrónico"
            id="email"
            name="email"
            type="email"
            placeholder="tu@correo.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            required
          />

          <FormField
            label="Contraseña"
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

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="acceptTerms" 
                name="acceptTerms" 
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, acceptTerms: checked as boolean }))
                }
              />
              <label
                htmlFor="acceptTerms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepto los{" "}
                <Link 
                  to="/terminos-y-condiciones"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Términos y Condiciones
                </Link>
                {" "}y la{" "}
                <Link 
                  to="/politica-privacidad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Política de Privacidad
                </Link>
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-xs text-destructive">{errors.acceptTerms}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Crear cuenta"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button
            type="button"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={handleDirectAccess}
          >
            Acceso Directo (Modo Desarrollo)
          </Button>
        </form>

        <div className="text-center text-sm">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline"
          >
            Iniciar sesión
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

export default Register;
