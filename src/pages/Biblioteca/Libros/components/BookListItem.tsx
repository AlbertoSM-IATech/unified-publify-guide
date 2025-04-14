
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { calculateNetRoyalties } from "../utils/formatUtils";
import { memo, useState } from 'react';
import { generateAmazonLink } from "../utils/bookDetailUtils";

interface BookListItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BookListItem = memo(({ libro, getStatusColor, getContentColor }: BookListItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const netRoyalties = calculateNetRoyalties(libro.hardcover || libro.paperback || libro.ebook).replace('.', ',');
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Set default placeholder
    const target = e.target as HTMLImageElement;
    target.src = "/placeholders/default-book-cover.png";
    setImageLoaded(true);
  };

  return (
    <motion.tr 
      className="hover:bg-muted/20 transition-colors"
      whileHover={{
        backgroundColor: "rgba(251, 146, 60, 0.05)",
        boxShadow: "0 4px 12px -2px rgba(251, 146, 60, 0.15)",
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-8 flex-shrink-0 overflow-hidden rounded-sm">
            {libro.imageUrl ? (
              <img 
                src={libro.imageUrl} 
                alt={libro.titulo} 
                className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                width={32}
                height={48}
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            ) : (
              <img 
                src="/placeholders/default-book-cover.png" 
                alt="Default Book Cover" 
                className="h-full w-full object-cover"
                loading="lazy"
              />
            )}
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
    </motion.tr>
  );
});

BookListItem.displayName = 'BookListItem';
