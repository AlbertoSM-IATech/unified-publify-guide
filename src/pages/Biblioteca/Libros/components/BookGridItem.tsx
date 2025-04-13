import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/common/StatusBadge";
import { calculateNetRoyalties } from "../utils/formatUtils";
import { memo, useState } from 'react';
import { generateAmazonLink } from "../utils/bookDetailUtils";
interface BookGridItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

// Simpler animation variants for better performance
const hoverMotion = {
  rest: {
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  },
  hover: {
    scale: 1.01,
    y: -3,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  }
};
export const BookGridItem = memo(({
  libro,
  getStatusColor,
  getContentColor
}: BookGridItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Calculate net royalties for display
  const netRoyalties = calculateNetRoyalties(libro.hardcover || libro.paperback || libro.ebook).replace('.', ',');

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
  return <Link to={`/biblioteca/libros/${libro.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg h-full">
      <motion.div initial="rest" whileHover="hover" animate="rest" variants={hoverMotion} className="h-full">
        <Card className="overflow-hidden hover:shadow-lg hover:border-[#FB923C]/30 transition-all duration-300 h-full flex flex-col md:flex-row border dark:border-slate-800">
          {/* Book cover - Left side with proper aspect ratio */}
          <div className="relative md:w-1/3 w-full flex-shrink-0">
            <div className="aspect-[1600/2560] w-full h-full overflow-hidden bg-muted">
              {libro.imageUrl ? <img src={libro.imageUrl} alt={libro.titulo} className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} loading="lazy" width="160" height="256" onLoad={handleImageLoad} onError={handleImageError} /> : <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/20 to-background p-4">
                  <span className="text-center font-heading text-lg font-semibold text-foreground/70">{libro.titulo}</span>
                </div>}
            </div>
          </div>

          {/* Book info - Right side */}
          <CardContent className="flex flex-col justify-between p-4 md:w-2/3 w-full">
            <div className="space-y-2">
              <h3 className="line-clamp-2 font-heading font-semibold text-orange-400 text-2xl">{libro.titulo}</h3>
              {/* Added subtitle display */}
              {libro.subtitulo && <p className="line-clamp-2 text-muted-foreground italic text-sm">{libro.subtitulo}</p>}
              <p className="line-clamp-1 text-white text-sm">{libro.autor}</p>
              
              {/* Status and content badges moved here */}
              <div className="flex flex-wrap gap-2 my-2 py-[15px]">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(libro.estado)}`}>
                  {libro.estado}
                </span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getContentColor(libro.contenido)}`}>
                  {libro.contenido}
                </span>
              </div>
              
              <div className="flex flex-col space-y-1 pt-1">
                {libro.fechaPublicacion && <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{new Date(libro.fechaPublicacion).toLocaleDateString()}</span>
                  </div>}
                  
                {/* Add royalties display */}
                
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end text-primary">
              <div className="flex items-center font-medium">
                <Eye className="mr-1 h-4 w-4" />
                Ver detalle
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>;
});
BookGridItem.displayName = 'BookGridItem';