
import { useState } from "react";
import { User, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabaseService } from "@/services/supabase"; // Mantenemos la importación pero usará mock
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProfileImageProps {
  initialImage: string | null;
  onImageChange: (imageData: string) => void;
}

export const ProfileImage = ({ initialImage, onImageChange }: ProfileImageProps) => {
  const [image, setImage] = useState<string | null>(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const { user, updateUser } = useAuth();
  const { toast } = useToast();

  // Default avatar image
  const DEFAULT_AVATAR = "https://i.pravatar.cc/150?img=5";

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Use FileReader to display preview immediately
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setImage(imageData);
      };
      reader.readAsDataURL(file);
      
      // Simulate upload with a delay
      if (user?.id) {
        try {
          setIsUploading(true);
          
          // Simular un delay para la carga
          setTimeout(async () => {
            try {
              // Usar la imagen del avatar por defecto que se solicita
              const mockAvatarUrl = DEFAULT_AVATAR;
              setImage(mockAvatarUrl);
              
              // Update user's avatar URL in their profile
              if (user?.id) {
                await supabaseService.profile.updateAvatar(user.id, mockAvatarUrl);
                
                // Update local user context
                updateUser({
                  avatarUrl: mockAvatarUrl
                });
                
                // Notify parent component
                onImageChange(mockAvatarUrl);
                
                toast({
                  title: "Imagen actualizada",
                  description: "Tu foto de perfil ha sido actualizada"
                });
              }
            } catch (error) {
              console.error('[MOCK] Error updating avatar:', error);
              toast({
                title: "Error",
                description: "No se pudo actualizar la imagen de perfil",
                variant: "destructive"
              });
            } finally {
              setIsUploading(false);
            }
          }, 1000);
        } catch (error) {
          console.error('[MOCK] Error uploading image:', error);
          toast({
            title: "Error",
            description: "No se pudo cargar la imagen",
            variant: "destructive"
          });
          setIsUploading(false);
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <Avatar className="h-24 w-24">
        {image ? (
          <AvatarImage src={image} alt="Profile" />
        ) : (
          <AvatarFallback>
            <User size={40} className="text-muted-foreground" />
          </AvatarFallback>
        )}
      </Avatar>
      
      <label className={`mt-4 flex w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <Upload size={16} className="mr-2" />
        {isUploading ? "Subiendo..." : "Cambiar imagen"}
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleImageChange}
          disabled={isUploading}
        />
      </label>
    </div>
  );
};
