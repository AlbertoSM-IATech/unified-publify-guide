
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Lock, User, ArrowRight } from "lucide-react";
import { FormField } from "@/components/form/FormField";
import { useRegisterForm } from "./hooks/useRegisterForm";
import { TermsCheckbox } from "./components/TermsCheckbox";

export const Register = () => {
  const {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleDirectAccess
  } = useRegisterForm();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold">Crear cuenta</h1>
          <p className="mt-2 text-muted-foreground">
            Registra tus datos para acceder a Publify
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <TermsCheckbox
            checked={formData.acceptTerms}
            onCheckedChange={(checked) => handleChange({
              target: { name: 'acceptTerms', type: 'checkbox', checked }
            } as React.ChangeEvent<HTMLInputElement>)}
            error={errors.acceptTerms}
          />

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
