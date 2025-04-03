
import { useEffect, useState } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Book } from "../../types/bookTypes";
import { BookOpen, Upload, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
    <div className="relative overflow-hidden rounded-t-lg bg-muted">
      <AspectRatio ratio={3/4} className="w-full">
        {coverPreview ? (
          <img 
            src={coverPreview} 
            alt={book.titulo} 
            className="h-full w-full object-cover transition-all hover:scale-105" 
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <BookOpen className="h-20 w-20 text-muted-foreground/30" />
          </div>
        )}
        
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <label htmlFor="cover-upload" className="cursor-pointer">
              <div className="flex flex-col items-center space-y-2 rounded-md bg-background/10 p-4 text-white backdrop-blur-sm">
                <UploadCloud className="h-10 w-10" />
                <span className="text-sm font-medium">Subir Portada</span>
                <span className="text-xs text-muted-foreground">JPG, PNG (Max. 5MB)</span>
                <Button variant="outline" size="sm" className="mt-2 w-full">
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
    </div>
  );
};
