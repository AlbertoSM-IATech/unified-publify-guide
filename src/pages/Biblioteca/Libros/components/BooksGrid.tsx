
import { BookGridItem } from "./BookGridItem";
import { Book } from "../types/bookTypes";

interface BooksGridProps {
  libros: Book[];
  getStatusColor: (estado: string) => string;
  getContentColor: (contenido: string) => string;
}

export const BooksGrid = ({ libros, getStatusColor, getContentColor }: BooksGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {libros.map((libro) => (
        <BookGridItem 
          key={libro.id} 
          libro={libro} 
          getStatusColor={getStatusColor}
          getContentColor={getContentColor}
        />
      ))}
    </div>
  );
};
