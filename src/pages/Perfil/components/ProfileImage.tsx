
import { useState } from "react";
import { User, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileImageProps {
  initialImage: string | null;
  onImageChange: (imageData: string) => void;
}

export const ProfileImage = ({ initialImage, onImageChange }: ProfileImageProps) => {
  const [image, setImage] = useState<string | null>(initialImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setImage(imageData);
        onImageChange(imageData);
      };
      reader.readAsDataURL(file);
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
      
      <label className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted">
        <Upload size={16} className="mr-2" />
        Cambiar imagen
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};
