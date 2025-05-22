import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DEFAULT_COVER_URL } from "@/services/supabase/books/constants";
import { StatusBadge } from "@/components/common/StatusBadge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
  
  useEffect(() => {
    setImageSrc(coverUrl || DEFAULT_COVER_URL);
  }, [coverUrl]);
  
  const handleImageError = () => {
    console.log(`Image error loading: ${coverUrl}, falling back to default`);
    setImageSrc(DEFAULT_COVER_URL);
  };
  
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
    <Link to={`/biblioteca/libros/${id}`} className="block">
      <motion.div 
        className="rounded-lg border bg-card shadow-sm glass-card overflow-hidden"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        custom={index}
      >
        <div className="flex flex-col sm:flex-row h-full">
          <motion.div 
            className="relative w-full sm:w-28 bg-muted"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <AspectRatio ratio={2 / 3} className="bg-muted">
              <img 
                src={imageSrc} 
                alt={title} 
                className="h-full w-full object-cover rounded-l-lg sm:rounded-l-lg sm:rounded-r-none"
                loading="lazy"
                width="112"
                height="168"
                onError={handleImageError}
              />
            </AspectRatio>
          </motion.div>
          
          <div className="flex flex-1 flex-col justify-between p-3">
            <div>
              <motion.h3 
                className="font-medium line-clamp-2 text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
              >
                {title}
              </motion.h3>
              <motion.div 
                className="mt-1 flex flex-wrap items-center gap-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
              >
                <StatusBadge status={status} />
                <StatusBadge status={contentLevel} />
              </motion.div>
            </div>
            <motion.div 
              className="mt-2 flex justify-between text-xs"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.4, duration: 0.3 }}
            >
              <span className="text-muted-foreground line-clamp-1">Autor: {author}</span>
              <span className="text-primary hover:underline cursor-pointer shrink-0">Ver detalles</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BookCard;
