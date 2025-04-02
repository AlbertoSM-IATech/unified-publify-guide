
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BookOpen, File } from "lucide-react";
import { Book } from "../../types/bookTypes";

interface BookCoverProps {
  book: Book;
  isEditing: boolean;
}

export const BookCover = ({ book, isEditing }: BookCoverProps) => {
  return (
    <div className="bg-muted p-4">
      {book.imageUrl ? (
        <div className="mx-auto max-w-[250px]">
          <AspectRatio ratio={1600/2560} className="overflow-hidden rounded-md border border-border bg-muted">
            <img
              src={book.imageUrl}
              alt={book.titulo}
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        </div>
      ) : (
        <div className="mx-auto max-w-[250px]">
          <AspectRatio ratio={1600/2560} className="flex items-center justify-center rounded-md border border-border bg-muted">
            <BookOpen size={60} className="text-muted-foreground/50" />
          </AspectRatio>
        </div>
      )}
      {isEditing && (
        <div className="mt-4">
          <Button className="w-full" variant="secondary" size="sm">
            <File className="mr-2 h-4 w-4" />
            Subir Imagen de Portada
          </Button>
        </div>
      )}
    </div>
  );
};
