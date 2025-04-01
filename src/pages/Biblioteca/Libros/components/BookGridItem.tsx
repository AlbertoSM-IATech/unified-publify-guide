
import { BookOpen } from "lucide-react";

interface BookGridItemProps {
  libro: {
    id: number;
    titulo: string;
    subtitulo?: string;
    autor: string;
    isbn: string;
    asin: string;
    estado: string;
    contenido: string;
    fechaPublicacion: string | null;
    imageUrl: string;
  };
  getStatusColor: (estado: string) => string;
  getContentColor: (contenido: string) => string;
}

export const BookGridItem = ({ libro, getStatusColor, getContentColor }: BookGridItemProps) => {
  return (
    <div className="card-hover group rounded-lg border bg-card shadow-sm">
      <div className="flex h-32 overflow-hidden">
        {/* Portada del libro */}
        <div className="relative h-full w-28 bg-muted">
          <div className="flex h-full items-center justify-center text-muted-foreground/50">
            {libro.imageUrl ? (
              <img
                src={libro.imageUrl}
                alt={libro.titulo}
                className="h-full w-full object-cover"
              />
            ) : (
              <BookOpen size={40} />
            )}
          </div>
        </div>
        
        {/* Información del libro */}
        <div className="flex flex-1 flex-col justify-between p-3">
          <div>
            <h3 className="line-clamp-1 font-medium">{libro.titulo}</h3>
            {libro.subtitulo && (
              <p className="line-clamp-1 text-sm text-muted-foreground">
                {libro.subtitulo}
              </p>
            )}
            <p className="mt-1 text-sm">{libro.autor}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(libro.estado)}`}>
                {libro.estado}
              </span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${getContentColor(libro.contenido)}`}>
                {libro.contenido}
              </span>
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-muted-foreground">ISBN: {libro.isbn.substring(0, 8)}...</span>
            <div className="space-x-2">
              <button className="font-medium text-primary hover:underline">
                Ver
              </button>
              <button className="font-medium text-primary hover:underline">
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
