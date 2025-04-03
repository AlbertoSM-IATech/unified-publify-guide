
import { User, Mail, Key } from "lucide-react";
import { Button } from "@/components/common/Button";
import { FormField } from "@/components/form/FormField";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormProps {
  initialData: {
    nombre: string;
    email: string;
  };
  onSubmit: (data: any) => void;
}

export const ProfileForm = ({ initialData, onSubmit }: ProfileFormProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nombre: initialData.nombre || "",
    email: initialData.email || "",
    password: "",
    confirmPassword: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate password match if changing password
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Call the parent onSubmit function
    onSubmit(formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Nombre"
          id="nombre"
          type="text"
          placeholder="Tu nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          icon={<User size={16} className="text-muted-foreground" />}
        />
        
        <FormField
          label="Email"
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleInputChange}
          icon={<Mail size={16} className="text-muted-foreground" />}
        />
      </div>

      <FormField
        label="Nueva contraseña"
        id="password"
        type="password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleInputChange}
        icon={<Key size={16} className="text-muted-foreground" />}
      />
      <p className="mt-1 text-xs text-muted-foreground">
        Deja en blanco si no quieres cambiar tu contraseña
      </p>
      
      <FormField
        label="Confirmar nueva contraseña"
        id="confirmPassword"
        type="password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        icon={<Key size={16} className="text-muted-foreground" />}
      />

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </div>
    </form>
  );
};
