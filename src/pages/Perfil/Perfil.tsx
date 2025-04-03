
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { PageSection } from "@/components/layout/PageSection";
import { ProfileImage } from "./components/ProfileImage";
import { ProfileForm } from "./components/ProfileForm";
import { PreferencesSection } from "./components/PreferencesSection";
import { ContentCard } from "@/components/common/ContentCard";

export const Perfil = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
  const handleProfileUpdate = (formData: any) => {
    // In a real app, this would update the user profile through the API
    toast({
      title: "Perfil actualizado",
      description: "Los cambios han sido guardados correctamente",
    });
  };
  
  const handleImageChange = (imageData: string) => {
    setProfileImage(imageData);
  };

  return (
    <PageSection 
      title="Perfil"
      description="Gestiona tu perfil y preferencias personales"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Información principal */}
        <ContentCard className="md:col-span-4">
          <ProfileImage 
            initialImage={profileImage} 
            onImageChange={handleImageChange} 
          />
          <div className="text-center">
            <h2 className="text-lg font-medium">
              {user?.nombre || "Usuario"}
            </h2>
            <p className="text-muted-foreground">{user?.email || "usuario@ejemplo.com"}</p>
          </div>
        </ContentCard>

        {/* Formulario de datos personales */}
        <ContentCard 
          className="md:col-span-8"
          title="Información Personal"
          description="Actualiza tu información personal y cómo quieres que se muestre"
        >
          <ProfileForm 
            initialData={{
              nombre: user?.nombre || "",
              email: user?.email || ""
            }}
            onSubmit={handleProfileUpdate}
          />
        </ContentCard>

        {/* Preferencias */}
        <ContentCard 
          className="md:col-span-12"
          title="Preferencias"
          description="Personaliza la aplicación según tus necesidades"
        >
          <PreferencesSection />
        </ContentCard>
      </div>
    </PageSection>
  );
};

export default Perfil;
