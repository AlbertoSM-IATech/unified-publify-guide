
import { Book } from "../../types/bookTypes";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

interface BookCoverProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

// Default optimized book cover image
const DEFAULT_COVER_URL = "/placeholders/portada-ejemplo.jpg";

export const BookCover = ({
  book,
  isEditing,
  onUpdateBook
}: BookCoverProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Track preview URL separately from book data to enable immediate visual feedback
  const [previewUrl, setPreviewUrl] = useState<string>(book.imageUrl || book.portadaUrl || DEFAULT_COVER_URL);

  // Update preview URL when book data changes
  useEffect(() => {
    setPreviewUrl(book.imageUrl || book.portadaUrl || DEFAULT_COVER_URL);
  }, [book.imageUrl, book.portadaUrl]);

  // Handle image error
  const handleImageError = () => {
    console.log(`Failed to load cover image for book: ${book.id}, using default`);
    setPreviewUrl(DEFAULT_COVER_URL);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate image dimensions and file
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const expectedRatio = 1600/2560;
        
        if (Math.abs(aspectRatio - expectedRatio) > 0.1) {
          toast({
            title: "Dimensiones incorrectas",
            description: "La imagen debe tener una proporción de 1600x2560 píxeles",
            variant: "destructive"
          });
          return;
        }
        
        // Create preview URL and update book data
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl); // Update preview immediately
        
        // Update the book data with the new image URL
        // We pass file information too in case we need to save to server later
        onUpdateBook({
          imageUrl,
          portadaUrl: imageUrl, // Update both fields for consistency
          coverFile: file
        });
        
        toast({
          description: "Portada actualizada. Recuerda guardar los cambios para hacer permanente esta modificación.",
        });
      };
      
      img.onerror = () => {
        toast({
          title: "Error al cargar la imagen",
          description: "No se pudo cargar la imagen seleccionada. Por favor, intenta con otra imagen.",
          variant: "destructive"
        });
      };
      
      img.src = URL.createObjectURL(file);
    }
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AspectRatio ratio={1600/2560} className="bg-muted">
        <motion.img
          src={previewUrl}
          alt={`Portada de ${book.titulo}`}
          className="object-cover w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          onError={handleImageError}
        />
        <AnimatePresence>
          {isEditing && isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50"
            >
              <Button
                variant="secondary"
                size="sm"
                className="relative overflow-hidden"
                onClick={() => document.getElementById('cover-upload')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                Cambiar portada
              </Button>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </AspectRatio>
    </div>
  );
};
