
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Default optimized book cover image
const DEFAULT_COVER_URL = "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg";

interface BookCardProps {
  index: number;
  title: string;
  author: string;
  contentLevel: string;
  status: string;
  coverUrl?: string;
  id: number;
}

const BookCard = ({
  index,
  title,
  author,
  contentLevel,
  status,
  coverUrl,
  id
}: BookCardProps) => {
  const [imageSrc, setImageSrc] = useState(coverUrl || DEFAULT_COVER_URL);
  
  // Update image source when prop changes
  useEffect(() => {
    setImageSrc(coverUrl || DEFAULT_COVER_URL);
  }, [coverUrl]);
  
  // Handle image loading error
  const handleImageError = () => {
    console.log(`Image error loading: ${coverUrl}, falling back to default`);
    setImageSrc(DEFAULT_COVER_URL);
  };
  
  // Determine status color based on status
  const getStatusColor = (status: string): string => {
    switch (status?.toLowerCase()) {
      case "publicado":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "en revisión":
      case "en_edicion":
      case "en revisión":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "borrador":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "archivado":
      case "pausado":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300";
    }
  };
  
  const statusColor = getStatusColor(status);

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20 
    },
    animate: (i: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: i * 0.05, 
        duration: 0.4,
        ease: "easeOut" 
      } 
    }),
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.2), 0 8px 10px -6px rgba(251, 146, 60, 0.2)",
      borderColor: "rgba(251, 146, 60, 0.5)",
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      }
    }
  };
  
  return (
    <Link to={`/biblioteca/libros/${id}`}>
      <motion.div 
        className="rounded-md border border-gray-800 bg-card shadow-sm overflow-hidden"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        custom={index}
      >
        <div className="flex">
          {/* Book cover image */}
          <div className="relative h-28 w-24 overflow-hidden">
            <img 
              src={imageSrc} 
              alt={title} 
              className="h-full w-full object-cover" 
              loading="lazy"
              width="96"
              height="112"
              onError={handleImageError}
            />
          </div>
          
          {/* Book information */}
          <div className="flex flex-1 flex-col justify-between p-3 bg-gray-900">
            <div>
              <h3 className="font-medium text-sm line-clamp-1 text-white">
                {title}
              </h3>
              <div className="mt-1">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor}`}>
                  {status}
                </span>
                <span className="text-xs ml-1 text-white">{contentLevel}</span>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Autor: {author}
            </div>
            <div className="mt-1 flex justify-end">
              <span className="text-orange-500 hover:underline cursor-pointer text-xs">Ver detalles</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BookCard;
