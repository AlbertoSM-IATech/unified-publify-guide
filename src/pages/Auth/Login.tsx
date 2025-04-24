
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/form/FormField";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Mail, Lock, LogIn } from "lucide-react";
import { required, email } from "@/utils/validationRules";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState("demo@publify.com");
  const [password, setPassword] = useState("password");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!required().test(userEmail)) {
      newErrors.email = "El email es obligatorio";
    } else if (!email().test(userEmail)) {
      newErrors.email = "El formato del email no es válido";
    }
    
    if (!required().test(password)) {
      newErrors.password = "La contraseña es obligatoria";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // TEMPORARY: Authentication is disabled, just simulate login
      await login(userEmail, password);
      toast({
        title: "Inicio de sesión exitoso",
        description: "Modo de desarrollo: Autenticación desactivada temporalmente",
      });
      navigate("/dashboard");
    } catch (error) {
      // This should never happen in dev mode
      toast({
        title: "Error de inicio de sesión",
        description: "Credenciales inválidas. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // TEMPORARY: Direct access to dashboard without login
  const handleDirectAccess = () => {
    toast({
      title: "Acceso directo activado",
      description: "Modo de desarrollo: Navegando directamente al dashboard",
    });
    navigate("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setUserEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold">Iniciar sesión</h1>
          <p className="mt-2 text-muted-foreground">
            Ingresa tus credenciales para acceder a Publify
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <FormField
            label="Correo electrónico"
            id="email"
            name="email"
            type="email"
            placeholder="tu@correo.com"
            value={userEmail}
            onChange={handleChange}
            error={errors.email}
            icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            required
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <FormField
              label=""
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={handleChange}
              error={errors.password}
              icon={<Lock className="h-4 w-4 text-muted-foreground" />}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"} <LogIn className="ml-2 h-4 w-4" />
          </Button>
          
          {/* TEMPORARY: Direct access button for development */}
          <Button
            type="button"
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={handleDirectAccess}
          >
            Acceso Directo (Modo Desarrollo)
          </Button>
        </form>

        <div className="text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/register"
            className="text-primary hover:underline"
          >
            Registrarse
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

export default Login;
