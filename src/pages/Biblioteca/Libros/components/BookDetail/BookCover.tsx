
import { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Book } from "../../types/bookTypes";
import { BookOpen, Upload, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface BookCoverProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}

export const BookCover = ({ book, isEditing, onUpdateBook }: BookCoverProps) => {
  const [coverPreview, setCoverPreview] = useState<string | null>(book.imageUrl || null);
  
  // Update preview when book changes
  useEffect(() => {
    setCoverPreview(book.imageUrl || null);
  }, [book.imageUrl]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Archivo demasiado grande",
        description: "La imagen no debe superar los 5MB.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Formato no válido",
        description: "Por favor, sube únicamente archivos de imagen (jpg, png, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    // Create a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setCoverPreview(result);
      
      // In a real app, we would upload the file to a server and get a URL back
      // For now, we'll just use the data URL as the imageUrl
      if (onUpdateBook) {
        onUpdateBook({ imageUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };
  
  return (
    <motion.div 
      className="relative overflow-hidden bg-muted"
      whileHover={{ 
        boxShadow: "0 0 15px rgba(251, 146, 60, 0.5), 0 0 20px rgba(251, 146, 60, 0.3)"
      }}
      transition={{ duration: 0.3 }}
    >
      <AspectRatio ratio={1600/2560} className="w-full">
        {coverPreview ? (
          <motion.img 
            src={coverPreview} 
            alt={book.titulo} 
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FB923C]/10 to-[#3B82F6]/10 p-6">
            <BookOpen className="h-20 w-20 text-muted-foreground/50" />
          </div>
        )}
        
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 opacity-0 hover:opacity-100 transition-opacity duration-300">
            <label htmlFor="cover-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-3 rounded-md bg-background/20 p-6 text-white backdrop-blur-md">
                <UploadCloud className="h-12 w-12 text-[#FB923C]" />
                <span className="text-lg font-medium">Subir Portada</span>
                <span className="text-sm text-muted-foreground">JPG, PNG (Max. 5MB)</span>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="mt-2 w-full border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Seleccionar Archivo
                </Button>
              </div>
              <input 
                id="cover-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </AspectRatio>
    </motion.div>
  );
};
