
import { Card } from "@/components/ui/card";
import { Book } from "../../types/bookTypes";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";

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
  const defaultCoverUrl = "/placeholders/portada-ejemplo.jpg";
  
  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCoverUrl(e.target.value);
    onUpdateBook({ imageUrl: e.target.value });
  };
  
  return (
    <Card className="overflow-hidden relative">
      <div className="aspect-[2/3] w-full relative">
        <motion.img 
          src={defaultCoverUrl}
          alt={book.titulo || "Portada del libro"}
          className="w-full h-full object-cover"
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.2, ease: "easeOut" }
          }}
        />
        
        {/* Input para cambiar URL de portada (solo en modo edición) */}
        {isEditing && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-4">
            <Input
              type="text"
              placeholder="URL de la portada"
              value={coverUrl}
              onChange={handleCoverChange}
              className="bg-white/90 text-black"
            />
          </div>
        )}
      </div>
    </Card>
  );
};
