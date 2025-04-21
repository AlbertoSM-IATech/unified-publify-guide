
import { Book } from "../../types/bookTypes";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";

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
  const [isHovered, setIsHovered] = useState(false);
  const defaultCoverUrl = "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg";
  const [previewUrl, setPreviewUrl] = useState<string>(book.imageUrl || defaultCoverUrl);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate image dimensions
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        if (Math.abs(aspectRatio - (1600/2560)) > 0.1) {
          toast({
            title: "Dimensiones incorrectas",
            description: "La imagen debe tener una proporción de 1600x2560 píxeles",
            variant: "destructive"
          });
          return;
        }
        
        // Create preview URL and update book data
        const imageUrl = URL.createObjectURL(file);
        setPreviewUrl(imageUrl);
        onUpdateBook({ imageUrl });
        
        toast({
          description: "Portada actualizada exitosamente",
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
