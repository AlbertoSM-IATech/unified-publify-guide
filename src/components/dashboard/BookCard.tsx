
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
  id
}: BookCardProps) => {
  // Determine status color based on status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Publicado":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "En revisión":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "Borrador":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "Archivado":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-300";
    }
  };
  
  const statusColor = getStatusColor(status);
  
  return (
    <Link to={`/biblioteca/libros/${id}`}>
      <div className="card-hover rounded-lg border bg-card shadow-sm transition-all duration-200 hover:shadow-md">
        <div className="flex h-32 overflow-hidden">
          {/* Book cover image/placeholder */}
          <div className="relative h-full w-28 bg-muted">
            <div className="h-full w-full overflow-hidden">
              <div className="h-full">
                <img 
                  src={DEFAULT_COVER_URL} 
                  alt={title} 
                  className="h-full w-full object-cover" 
                  loading="lazy"
                  width="112"
                  height="128"
                />
              </div>
            </div>
          </div>
          
          {/* Book information */}
          <div className="flex flex-1 flex-col justify-between p-3">
            <div>
              <h3 className="font-medium line-clamp-1 text-foreground">{title}</h3>
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
      </div>
    </Link>
  );
};

export default BookCard;
