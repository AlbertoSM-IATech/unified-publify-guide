
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { calculateNetRoyalties } from "../utils/formatUtils";
import { memo, useState } from 'react';

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
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculate net royalties for display
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
    <Link to={`/biblioteca/libros/${libro.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg h-full">
      <motion.div 
        whileHover={{ 
          y: -5, 
          scale: 1.02,
          boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.3), 0 8px 10px -6px rgba(251, 146, 60, 0.2)",
          borderColor: "rgba(251, 146, 60, 0.5)",
          transition: { duration: 0.2, ease: "easeOut" }
        }}
        className="h-full"
      >
        <Card className="overflow-hidden transition-all duration-300 h-full flex flex-col md:flex-row border dark:border-slate-800">
          {/* Book cover - Left side with proper aspect ratio */}
          <div className="relative md:w-1/3 w-full flex-shrink-0">
            <div className="aspect-[1600/2560] w-full h-full overflow-hidden bg-muted">
              {libro.imageUrl ? (
                <img 
                  src={libro.imageUrl} 
                  alt={libro.titulo} 
                  className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy" 
                  width="160" 
                  height="256"
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
          </div>

          {/* Book info - Right side - OPTIMIZED FOR HEIGHT */}
          <CardContent className="flex flex-col justify-between p-3 md:p-3 md:w-2/3 w-full">
            <div className="space-y-1">
              {/* Reduced font size and line clamp for title */}
              <h3 className="line-clamp-1 font-heading font-semibold text-orange-400 text-xl">
                {libro.titulo}
              </h3>
              
              {/* Subtitle with reduced margin */}
              {libro.subtitulo && (
                <p className="line-clamp-1 text-muted-foreground italic text-xs">
                  {libro.subtitulo}
                </p>
              )}
              
              {/* Author with slightly reduced size */}
              <p className="line-clamp-1 text-white text-xs">
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
                {libro.fechaPublicacion && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{new Date(libro.fechaPublicacion).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
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
      </motion.div>
    </Link>
  );
});

BookGridItem.displayName = 'BookGridItem';
