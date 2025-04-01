
import { BookGridItem } from "./BookGridItem";

interface BooksGridProps {
  libros: Array<{
    id: number;
    titulo: string;
    subtitulo?: string;
    autor: string;
    isbn: string;
    asin: string;
    estado: string;
    contenido: string;
    fechaPublicacion: string | null;
    imageUrl: string;
  }>;
  getStatusColor: (estado: string) => string;
  getContentColor: (contenido: string) => string;
}

export const BooksGrid = ({ libros, getStatusColor, getContentColor }: BooksGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
