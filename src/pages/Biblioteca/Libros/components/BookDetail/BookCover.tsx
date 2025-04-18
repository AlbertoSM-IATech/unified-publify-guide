
import { Book } from "../../types/bookTypes";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would normally upload the file to your storage service
      // For now, we'll create a local URL
      const imageUrl = URL.createObjectURL(file);
      onUpdateBook({ imageUrl });
    }
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AspectRatio ratio={1600/2560} className="bg-muted">
        <motion.img
          src={book.imageUrl || "/placeholders/default-book-cover.png"}
          alt={`Portada de ${book.titulo}`}
          className="object-cover w-full h-full rounded-t-lg"
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
