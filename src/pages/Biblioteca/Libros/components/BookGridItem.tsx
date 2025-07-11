
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Book } from "../types/bookTypes";
import { calculateNetRoyalties } from "../utils/formatUtils";
import { memo, useState } from "react";
import { DEFAULT_COVER_URL } from "@/services/supabase/books/constants"; 
import { BookOpenText } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";

interface BookGridItemProps {
  libro: Book;
  collections?: { id: number; nombre: string }[];
  investigationName?: string;
}

export const BookGridItem = memo(({ 
  libro, 
  collections = [],
  investigationName
}: BookGridItemProps) => {
  const [imgSrc, setImgSrc] = useState<string>(libro.imageUrl || libro.portadaUrl || DEFAULT_COVER_URL);
  
  const handleImageError = () => {
    setImgSrc(DEFAULT_COVER_URL);
  };
  
  const netRoyalties = calculateNetRoyalties(libro.hardcover || libro.paperback || libro.ebook).replace('.', ',');
  
  return (
    <Card className="overflow-hidden border h-full hover:border-[#FB923C]/40 hover:shadow-md transition-all duration-200 flex flex-row">
      <Link
        to={`/biblioteca/libros/${libro.id}`}
        className="flex flex-row h-full w-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#FB923C] focus:ring-offset-2 rounded-sm group"
      >
        {/* Image Section */}
        <div className="w-1/3 flex-shrink-0 h-full">
          <AspectRatio ratio={1600 / 2560} className="h-full w-full bg-muted">
            <img
              src={imgSrc}
              alt={libro.titulo}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
              onError={handleImageError}
              loading="lazy"
            />
          </AspectRatio>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="font-medium text-[#FB923C] line-clamp-2 mb-1">{libro.titulo}</h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{libro.autor}</p>
            
            <div className="flex justify-between items-center mb-2">
              {/* Usar StatusBadge para el estado */}
              <StatusBadge status={libro.estado} />
              <span className="font-medium text-green-500 text-sm">
                {netRoyalties}€
              </span>
            </div>
            {/* Usar StatusBadge para el tipo de contenido */}
            <div className="mb-3">
              <StatusBadge status={libro.contenido} />
            </div>
          </div>
          
          <div className="mt-auto space-y-2">
            {collections.length > 0 && (
              <div>
                <div className="text-xs text-muted-foreground mb-1">Series:</div>
                <div className="flex flex-wrap gap-1">
                  {collections.map(col => (
                    <Badge 
                      key={col.id} 
                      variant="outline"
                      className="text-xs px-1.5 py-0.5"
                    >
                      {col.nombre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {investigationName && (
              <div>
                <div className="text-xs text-muted-foreground mb-1 flex items-center">
                  <BookOpenText size={12} className="mr-1 text-muted-foreground" />
                  Investigación:
                </div>
                <p className="text-xs text-foreground truncate max-w-[150px]" title={investigationName}>
                  {investigationName}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
});

BookGridItem.displayName = 'BookGridItem';
