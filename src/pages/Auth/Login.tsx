
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("demo@publify.com");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // TEMPORARY: Authentication is disabled, just simulate login
      await login(email, password);
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
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Link
                to="/"
                className="text-xs text-primary hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
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
            to="/"
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
