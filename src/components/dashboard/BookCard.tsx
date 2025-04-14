
import { motion } from "framer-motion";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BookCardProps {
  index: number;
  title: string;
  author: string;
  contentLevel: string;
  status: string;
  coverUrl?: string;
}

const BookCard = ({
  index,
  title,
  author,
  contentLevel,
  status,
  coverUrl
}: BookCardProps) => {
  // Determine status color based on status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Publicado":
        return "bg-green-100 text-green-800";
      case "En revisión":
        return "bg-amber-100 text-amber-800";
      case "Borrador":
        return "bg-blue-100 text-blue-800";
      case "Archivado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  const statusColor = getStatusColor(status);
  
  return (
    <motion.div 
      className="card-hover rounded-lg border bg-card shadow-sm"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 0 15px rgba(251, 146, 60, 0.3), 0 0 20px rgba(251, 146, 60, 0.2)",
        borderColor: "rgba(251, 146, 60, 0.5)",
        transition: { duration: 0.2, ease: "easeOut" }
      }}
    >
      <div className="flex h-32 overflow-hidden">
        {/* Book cover image/placeholder */}
        <div className="relative h-full w-28 bg-muted">
          {coverUrl ? (
            <div className="h-full w-full overflow-hidden">
              <AspectRatio ratio={16 / 25.6} className="h-full">
                <img 
                  src={coverUrl} 
                  alt={title} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholders/default-book-cover.png";
                  }}
                  className="h-full w-full object-cover" 
                />
              </AspectRatio>
            </div>
          ) : (
            <div className="h-full w-full overflow-hidden">
              <AspectRatio ratio={16 / 25.6} className="h-full">
                <img 
                  src="/placeholders/default-book-cover.png" 
                  alt="Default Book Cover" 
                  className="h-full w-full object-cover" 
                />
              </AspectRatio>
            </div>
          )}
        </div>
        
        {/* Book information */}
        <div className="flex flex-1 flex-col justify-between p-3 bg-gray-900">
          <div>
            <h3 className="font-medium line-clamp-1">{title}</h3>
            <div className="mt-1 flex items-center space-x-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor}`}>
                {status}
              </span>
              <span className="text-xs text-muted-foreground">
                {contentLevel}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Autor: {author}</span>
            <span className="text-primary hover:underline cursor-pointer">Ver detalles</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
