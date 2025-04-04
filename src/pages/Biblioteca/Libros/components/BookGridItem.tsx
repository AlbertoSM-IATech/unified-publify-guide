
import { BookOpen, Eye, Edit } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";

interface BookGridItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BookGridItem = ({ libro, getStatusColor, getContentColor }: BookGridItemProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row h-full">
          {/* Book cover with proper aspect ratio */}
          <div className="relative h-[180px] md:h-[240px] w-full md:w-1/3 lg:w-1/3 bg-muted flex-shrink-0">
            {libro.imageUrl ? (
              <div className="h-full w-full overflow-hidden">
                <AspectRatio ratio={10/16} className="h-full">
                  <img 
                    src={libro.imageUrl} 
                    alt={libro.titulo} 
                    className="h-full w-full object-cover"
                  />
                </AspectRatio>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-secondary/20">
                <BookOpen size={48} className="text-muted-foreground/50" />
              </div>
            )}
          </div>
          
          {/* Book information with better spacing */}
          <div className="flex flex-1 flex-col justify-between p-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-lg line-clamp-1">
                <Link to={`/biblioteca/libros/${libro.id}`} className="hover:underline">
                  {libro.titulo}
                </Link>
              </h3>
              
              {libro.subtitulo && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {libro.subtitulo}
                </p>
              )}
              
              <p className="text-sm font-medium">
                <span className="text-muted-foreground">Autor:</span> {libro.autor}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
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
            
            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">ISBN: </span>
                  <span className="font-mono">{libro.isbn.substring(0, 10)}...</span>
                </div>
                <div>
                  <span className="text-muted-foreground">ASIN: </span>
                  <span className="font-mono">{libro.asin.substring(0, 10)}...</span>
                </div>
              </div>
              
              {libro.ebook?.links?.amazon && (
                <a 
                  href={libro.ebook.links.amazon}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-xs text-blue-500 hover:underline inline-block"
                >
                  Ver en Amazon →
                </a>
              )}
            </div>
            
            <div className="mt-4 flex justify-end space-x-2">
              <Link
                to={`/biblioteca/libros/${libro.id}`}
                className="flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground"
              >
                <Eye size={14} className="mr-1.5" />
                Ver detalle
              </Link>
              <Link
                to={`/biblioteca/libros/${libro.id}`}
                className="flex items-center rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90"
              >
                <Edit size={14} className="mr-1.5" />
                Editar
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
