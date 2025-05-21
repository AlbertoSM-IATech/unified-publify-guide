
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Book } from "../types/bookTypes";
import { calculateNetRoyalties } from "../utils/formatUtils";
import { memo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_COVER_URL } from "@/services/supabase/books/constants"; 

interface BookGridItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
  collections?: { id: number; nombre: string }[];
}

export const BookGridItem = memo(({ 
  libro, 
  getStatusColor, 
  getContentColor,
  collections = [] 
}: BookGridItemProps) => {
  const [imgSrc, setImgSrc] = useState<string>(libro.imageUrl || libro.portadaUrl || DEFAULT_COVER_URL);
  
  const handleImageError = () => {
    setImgSrc(DEFAULT_COVER_URL);
  };
  
  const netRoyalties = calculateNetRoyalties(libro.hardcover || libro.paperback || libro.ebook).replace('.', ',');
  
  return (
    <Card className="overflow-hidden border h-full hover:border-[#FB923C]/40 hover:shadow-md transition-all duration-200 flex flex-col">
      <Link
        to={`/biblioteca/libros/${libro.id}`}
        className="flex flex-col h-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#FB923C] focus:ring-offset-2 rounded-sm"
      >
        <div className="relative w-full pt-[155%] overflow-hidden">
          <img
            src={imgSrc}
            alt={libro.titulo}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-200 hover:scale-105"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10">
            <h3 className="font-medium text-white line-clamp-2">{libro.titulo}</h3>
            <p className="text-sm text-white/80">{libro.autor}</p>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                  libro.estado
                )}`}
              >
                {libro.estado}
              </span>
              <span className="font-medium text-green-500 text-sm">
                {netRoyalties}€
              </span>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getContentColor(
                libro.contenido
              )}`}
            >
              {libro.contenido}
            </span>
          </div>
          
          {collections.length > 0 && (
            <div className="mt-3">
              <div className="text-xs text-muted-foreground mb-1">Colecciones:</div>
              <div className="flex flex-wrap gap-1">
                {collections.map(col => (
                  <Badge 
                    key={col.id} 
                    variant="outline"
                    className="text-xs px-1.5 py-0.5 truncate max-w-[120px]"
                  >
                    {col.nombre}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
});

BookGridItem.displayName = 'BookGridItem';
