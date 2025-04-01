
import { BookOpen } from "lucide-react";

interface BookCardProps {
  index: number;
}

const BookCard = ({ index }: BookCardProps) => {
  return (
    <div className="card-hover rounded-lg border bg-card shadow-sm">
      <div className="relative pb-[160%] rounded-t-lg bg-muted overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen size={50} className="text-muted-foreground/50" />
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium">Título del Libro {index}</h3>
        <p className="text-xs text-muted-foreground">
          {index === 1 ? "Alto Contenido" : "Medio Contenido"}
        </p>
        <div className="mt-2 flex justify-between text-xs">
          <span>Estado: {index === 1 ? "Publicado" : "En revisión"}</span>
          <span className="text-primary">Ver detalles</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
