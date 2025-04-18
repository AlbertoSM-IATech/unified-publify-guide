
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Default book cover image
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
  // Determine status color based on status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "publicado":
      case "Publicado":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "en_edicion":
      case "En revisión":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "borrador":
      case "Borrador":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "pausado":
      case "Archivado":
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
        className="rounded-lg border bg-card shadow-sm glass-card"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        custom={index}
      >
        <div className="flex h-32 overflow-hidden">
          {/* Book cover image/placeholder */}
          <motion.div 
            className="relative h-full w-28 bg-muted overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full w-full overflow-hidden">
              <div className="h-full">
                <img 
                  src={coverUrl || DEFAULT_COVER_URL} 
                  alt={title} 
                  className="h-full w-full object-cover" 
                  loading="lazy"
                  width="112"
                  height="128"
                />
              </div>
            </div>
          </motion.div>
          
          {/* Book information */}
          <div className="flex flex-1 flex-col justify-between p-3">
            <div>
              <motion.h3 
                className="font-medium line-clamp-1 text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
              >
                {title}
              </motion.h3>
              <motion.div 
                className="mt-1 flex items-center space-x-2"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.3 }}
              >
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor}`}>
                  {status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {contentLevel}
                </span>
              </motion.div>
            </div>
            <motion.div 
              className="flex justify-between text-xs"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.4, duration: 0.3 }}
            >
              <span className="text-muted-foreground">Autor: {author}</span>
              <span className="text-primary hover:underline cursor-pointer">Ver detalles</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default BookCard;
