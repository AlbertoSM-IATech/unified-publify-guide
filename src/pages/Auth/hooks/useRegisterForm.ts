
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { required, email, minLength } from "@/utils/validationRules";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<RegisterFormData>({
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

  const handleSubmit = async (e: React.FormEvent) => {
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

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    handleDirectAccess
  };
};
