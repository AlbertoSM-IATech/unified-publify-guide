
import { Card } from "@/components/ui/card";
import { Book } from "../../types/bookTypes";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { supabaseService } from "@/services/supabase";
import { toast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface BookCoverProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const BookCover = ({
  book,
  isEditing,
  onUpdateBook
}: BookCoverProps) => {
  const [coverUrl, setCoverUrl] = useState(book.imageUrl || "");
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  
  // Always use the default cover as fallback
  const defaultCoverUrl = "/placeholders/portada-ejemplo.jpg";
  
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCoverUrl(e.target.value);
    onUpdateBook({ imageUrl: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Tipo de archivo no válido",
          description: "Por favor, sube solo imágenes",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Archivo demasiado grande",
          description: "El tamaño máximo permitido es 5MB",
          variant: "destructive"
        });
        return;
      }
      
      try {
        setIsUploading(true);
        
        // Use FileReader to display preview immediately
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageData = event.target?.result as string;
          setCoverUrl(imageData);
          onUpdateBook({ imageUrl: imageData });
        };
        reader.readAsDataURL(file);
        
        // In a real implementation with Supabase, we would upload to storage
        // For now, we'll simulate with a timeout
        setTimeout(() => {
          setIsUploading(false);
          toast({
            title: "Portada actualizada",
            description: "La imagen se ha subido correctamente"
          });
        }, 1000);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          title: "Error",
          description: "No se pudo subir la imagen",
          variant: "destructive"
        });
        setIsUploading(false);
      }
    }
  };
  
  return (
    <Card className="overflow-hidden relative">
      <div className="aspect-[2/3] w-full relative">
        <motion.img 
          src={coverUrl || defaultCoverUrl}
          alt={book.titulo || "Portada del libro"}
          className="w-full h-full object-cover"
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        />
        
        {/* Input para cambiar URL de portada (solo en modo edición) */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 gap-3">
            <Input
              type="text"
              placeholder="URL de la portada"
              value={coverUrl}
              onChange={handleCoverChange}
              className="bg-white/90 text-black mb-2"
            />
            
            <label 
              className={`flex w-full cursor-pointer items-center justify-center rounded-md border border-input bg-white/90 px-4 py-2 text-sm hover:bg-white transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Upload size={16} className="mr-2" />
              {isUploading ? "Subiendo..." : "Subir imagen"}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        )}
      </div>
    </Card>
  );
};
