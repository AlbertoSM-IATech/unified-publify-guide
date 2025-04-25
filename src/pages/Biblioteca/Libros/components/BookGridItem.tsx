
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { calculateNetRoyalties } from "../utils/formatUtils";
import { memo, useState } from 'react';

// Default optimized book cover image
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
  const format = libro.hardcover || libro.paperback || libro.ebook;
  const netRoyalties = format ? calculateNetRoyalties(format).replace('.', ',') : '0,00';
  
  // Handle image errors
  const [imgSrc, setImgSrc] = useState(libro.imageUrl || libro.portadaUrl || DEFAULT_COVER_URL);
  
  const handleImageError = () => {
    console.log(`Failed to load image for book: ${libro.id}, falling back to default`);
    setImgSrc(DEFAULT_COVER_URL);
  };
  
  return (
    <Link to={`/biblioteca/libros/${libro.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md h-full">
      <Card className="overflow-hidden h-full flex border border-gray-800 bg-gray-900 text-white hover:shadow-md">
        {/* Book cover */}
        <div className="h-full w-1/4 flex-shrink-0">
          <img 
            src={imgSrc} 
            alt={libro.titulo} 
            className="h-full w-full object-cover" 
            loading="lazy" 
            width="96" 
            height="144" 
            onError={handleImageError}
          />
        </div>

        {/* Book info */}
        <div className="p-3 flex flex-col justify-between w-3/4">
          <div>
            <h3 className="line-clamp-1 font-medium text-lg">
              {libro.titulo}
            </h3>
            
            {libro.subtitulo && (
              <p className="line-clamp-1 text-gray-300 italic text-sm">
                {libro.subtitulo}
              </p>
            )}
            
            <p className="text-gray-400 text-xs">
              {libro.autor}
            </p>
            
            <div className="flex flex-wrap gap-1.5 py-1 mt-1">
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${getStatusColor(libro.estado)}`}>
                {libro.estado}
              </span>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${getContentColor(libro.contenido)}`}>
                {libro.contenido}
              </span>
            </div>
            
            {libro.fechaPublicacion && (
              <div className="flex items-center text-xs text-gray-400 mt-1">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{new Date(libro.fechaPublicacion).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="mt-2 flex justify-between items-center">
            <span className="font-bold text-green-500">{netRoyalties}€</span>
            <span className="text-orange-500 hover:underline text-xs">Ver detalle</span>
          </div>
        </div>
      </Card>
    </Link>
  );
});

BookGridItem.displayName = 'BookGridItem';
