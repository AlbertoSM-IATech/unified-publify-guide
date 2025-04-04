
import { BookOpen } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";

interface BookGridItemProps {
  libro: Book;
  getStatusColor: (estado: string) => string;
  getContentColor: (contenido: string) => string;
}

export const BookGridItem = ({
  libro,
  getStatusColor,
  getContentColor
}: BookGridItemProps) => {
  return (
    <div className="card-hover group rounded-lg border bg-card shadow-sm">
      <div className="flex h-40 overflow-hidden">
        {/* Portada del libro con proporciones correctas (16:25.6) */}
        <div className="relative h-full w-28 bg-muted flex-shrink-0">
          {libro.imageUrl ? (
            <div className="h-full w-full overflow-hidden">
              <AspectRatio ratio={16 / 25.6} className="h-full">
                <img src={libro.imageUrl} alt={libro.titulo} className="h-full w-full object-cover" />
              </AspectRatio>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground/50">
              <BookOpen size={40} />
            </div>
          )}
        </div>
        
        {/* Información del libro con mejor espaciado */}
        <div className="flex flex-1 flex-col justify-between p-5 py-[7px]">
          <div className="space-y-2.5">
            <h3 className="line-clamp-1 font-medium text-base">{libro.titulo}</h3>
            {libro.subtitulo && (
              <p className="line-clamp-1 text-sm text-muted-foreground">
                {libro.subtitulo}
              </p>
            )}
            <p className="text-sm text-muted-foreground/80">{libro.autor}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                  libro.estado
                )}`}
              >
                {libro.estado}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getContentColor(
                  libro.contenido
                )}`}
              >
                {libro.contenido}
              </span>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-xs">
            <span className="text-muted-foreground">ISBN: {libro.isbn.substring(0, 8)}...</span>
            <div className="space-x-4">
              <Link
                to={`/biblioteca/libros/${libro.id}`}
                className="font-medium text-primary hover:underline"
              >
                Ver
              </Link>
              <Link
                to={`/biblioteca/libros/${libro.id}`}
                className="font-medium text-primary hover:underline"
              >
                Editar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
