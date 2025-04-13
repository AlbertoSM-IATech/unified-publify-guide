
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

// Simpler hover effect for better performance
const simpleHoverEffect = {
  initial: { backgroundColor: "transparent" },
  hover: { backgroundColor: "rgba(251,146,60,0.05)" }
};

export const BookListItem = memo(({ libro, getStatusColor, getContentColor }: BookListItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Calculate net royalties for display
  const netRoyalties = calculateNetRoyalties(
    libro.hardcover || libro.paperback || libro.ebook
  ).replace('.', ',');
  
  // Generate Amazon link if ASIN is available
  const amazonLink = generateAmazonLink(libro.asin);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Set a default background color on error
    const target = e.target as HTMLImageElement;
    target.style.backgroundColor = "#e5e7eb";
    setImageLoaded(true);
  };
  
  return (
    <motion.tr 
      className="hover:bg-muted/20 transition-colors"
      initial="initial"
      whileHover="hover"
      variants={simpleHoverEffect}
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
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Sin portada</span>
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-[#3B82F6]">
              <Link to={`/biblioteca/libros/${libro.id}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#3B82F6] rounded-sm">
                {libro.titulo}
              </Link>
            </div>
            {/* Added subtitle display */}
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
