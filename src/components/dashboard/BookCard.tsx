import { BookOpen } from "lucide-react";
interface BookCardProps {
  index: number;
}
const BookCard = ({
  index
}: BookCardProps) => {
  // Determine content level and status color based on index
  const contentLevel = index === 1 ? "Alto Contenido" : "Medio Contenido";
  const statusColor = index === 1 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800";
  const publishStatus = index === 1 ? "Publicado" : "En revisión";
  return <div className="card-hover rounded-lg border bg-card shadow-sm">
      <div className="flex h-32 overflow-hidden">
        {/* Book cover image/placeholder */}
        <div className="relative h-full w-28 bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen size={40} className="text-muted-foreground/50" />
          </div>
        </div>
        
        {/* Book information */}
        <div className="flex flex-1 flex-col justify-between p-3 bg-gray-900">
          <div>
            <h3 className="font-medium">Título del Libro {index}</h3>
            <div className="mt-1 flex items-center space-x-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor}`}>
                {publishStatus}
              </span>
              <span className="text-xs text-muted-foreground">
                {contentLevel}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Autor: Usuario {index}</span>
            <span className="text-primary hover:underline cursor-pointer">Ver detalles</span>
          </div>
        </div>
      </div>
    </div>;
};
export default BookCard;