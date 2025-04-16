
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Calendar } from "lucide-react";
import { calculateNetRoyalties } from "../utils/formatUtils";
import { memo } from 'react';

// Default book cover image
const DEFAULT_COVER_URL = "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg";

interface BookGridItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BookGridItem = memo(({
  libro,
  getStatusColor,
  getContentColor
}: BookGridItemProps) => {
  // Calculate net royalties for display
  const netRoyalties = calculateNetRoyalties(libro.hardcover || libro.paperback || libro.ebook).replace('.', ',');
  
  return (
    <Link to={`/biblioteca/libros/${libro.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg h-full">
      <div className="h-full transition-all duration-200 hover:shadow-md">
        <Card className="overflow-hidden h-full flex flex-col md:flex-row border dark:border-slate-800">
          {/* Book cover - Left side with proper aspect ratio */}
          <div className="relative md:w-1/3 w-full flex-shrink-0">
            <div className="aspect-[1600/2560] w-full h-full overflow-hidden bg-muted">
              <img 
                src={DEFAULT_COVER_URL} 
                alt={libro.titulo} 
                className="h-full w-full object-cover" 
                loading="lazy" 
                width="160" 
                height="256"
              />
            </div>
          </div>

          {/* Book info - Right side - OPTIMIZED FOR HEIGHT */}
          <CardContent className="flex flex-col justify-between p-3 md:p-3 md:w-2/3 w-full">
            <div className="space-y-1">
              {/* Reduced font size and line clamp for title */}
              <h3 className="line-clamp-1 font-heading font-semibold text-orange-400 text-2xl">
                {libro.titulo}
              </h3>
              
              {/* Subtitle with reduced margin */}
              {libro.subtitulo && 
                <p className="line-clamp-1 text-muted-foreground italic text-base font-semibold">
                  {libro.subtitulo}
                </p>
              }
              
              {/* Author with slightly reduced size */}
              <p className="line-clamp-1 text-foreground text-xs">
                {libro.autor}
              </p>
              
              {/* Status and content badges - More compact */}
              <div className="flex flex-wrap gap-1.5 my-1 py-1">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(libro.estado)}`}>
                  {libro.estado}
                </span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getContentColor(libro.contenido)}`}>
                  {libro.contenido}
                </span>
              </div>
              
              <div className="flex flex-col space-y-0.5">
                {libro.fechaPublicacion && 
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{new Date(libro.fechaPublicacion).toLocaleDateString()}</span>
                  </div>
                }
              </div>
            </div>

            {/* Net royalties display */}
            <div className="mt-1 text-sm text-green-500 font-medium">
              {netRoyalties}€
            </div>

            {/* "View details" text - Slightly reduced vertical margins */}
            <div className="mt-2 flex items-center justify-end text-primary">
              <div className="flex items-center font-medium text-xs">
                <Eye className="mr-1 h-3.5 w-3.5" />
                Ver detalle
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
});

BookGridItem.displayName = 'BookGridItem';
