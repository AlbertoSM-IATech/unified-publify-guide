
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Eye } from "lucide-react";
import { calculateNetRoyalties } from "../utils/formatUtils";
import { memo, useState } from 'react';

// Default book cover image
const DEFAULT_COVER_URL = "/placeholders/default-book-cover.png";

interface BookListItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BookListItem = memo(({ libro, getStatusColor, getContentColor }: BookListItemProps) => {
  const netRoyalties = calculateNetRoyalties(libro.hardcover || libro.paperback || libro.ebook).replace('.', ',');
  
  const [imgSrc, setImgSrc] = useState(libro.imageUrl || libro.portadaUrl || DEFAULT_COVER_URL);
  
  const handleImageError = () => {
    console.log(`Failed to load image for book: ${libro.id}, falling back to default`);
    setImgSrc(DEFAULT_COVER_URL);
  };
  
  return (
    <tr className="hover:bg-muted/20 transition-colors">
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-8 flex-shrink-0 overflow-hidden rounded-sm">
            <img 
              src={imgSrc} 
              alt={libro.titulo} 
              className="h-full w-full object-cover"
              loading="lazy"
              width="32"
              height="48"
              onError={handleImageError}
            />
          </div>
          <div>
            <div className="font-medium text-[#3B82F6]">
              <Link to={`/biblioteca/libros/${libro.id}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#3B82F6] rounded-sm">
                {libro.titulo}
              </Link>
            </div>
            {libro.subtitulo && (
              <div className="text-xs text-muted-foreground italic">{libro.subtitulo}</div>
            )}
            <div className="text-sm text-muted-foreground">{libro.autor}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-green-500 font-medium">
        {netRoyalties}€
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
            libro.estado
          )}`}
        >
          {libro.estado}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getContentColor(
            libro.contenido
          )}`}
        >
          {libro.contenido}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
        {libro.fechaPublicacion
          ? new Date(libro.fechaPublicacion).toLocaleDateString()
          : "No publicado"}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
        <Link
          to={`/biblioteca/libros/${libro.id}`}
          className="inline-flex items-center font-medium text-[#FB923C] hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#FB923C] rounded-sm"
        >
          <Eye className="mr-1 h-4 w-4" /> Ver detalles
        </Link>
      </td>
    </tr>
  );
});

BookListItem.displayName = 'BookListItem';
