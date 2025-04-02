
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, File, Link } from "lucide-react";
import { Book, BookFormat } from "../../types/bookTypes";
import { useNavigate } from "react-router-dom";

interface BookInfoProps {
  book: Book;
  getStatusColor: (estado: string) => string;
  getContentColor: (contenido: string) => string;
  calculateNetRoyalties: (format?: BookFormat) => string;
}

export const BookInfo = ({
  book,
  getStatusColor,
  getContentColor,
  calculateNetRoyalties
}: BookInfoProps) => {
  const navigate = useNavigate();
  
  // Navigate to related pages
  const goToInvestigacion = () => {
    if (book.investigacionId) {
      navigate(`/biblioteca/investigaciones/${book.investigacionId}`);
    }
  };
  
  const goToColeccion = () => {
    if (book.proyectoId) {
      navigate(`/biblioteca/colecciones/${book.proyectoId}`);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-3 space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge className={getStatusColor(book.estado)}>
            {book.estado}
          </Badge>
          <Badge className={getContentColor(book.contenido)}>
            {book.contenido}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          {book.fechaPublicacion 
            ? new Date(book.fechaPublicacion).toLocaleDateString() 
            : "Sin fecha de publicación"}
        </div>
      </div>
      <Separator className="my-3" />
      <div className="space-y-3">
        <div>
          <div className="text-sm font-medium text-muted-foreground">ISBN</div>
          <div>{book.isbn}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">ASIN</div>
          <div>{book.asin}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-muted-foreground">Regalías Netas</div>
          <div className="flex flex-col gap-1 text-sm">
            {book.hardcover && (
              <div className="flex justify-between">
                <span>Tapa Dura:</span>
                <span className="font-semibold text-lg font-secondary text-green-600">
                  {calculateNetRoyalties(book.hardcover)}€
                </span>
              </div>
            )}
            {book.paperback && (
              <div className="flex justify-between">
                <span>Tapa Blanda:</span>
                <span className="font-semibold text-lg font-secondary text-green-600">
                  {calculateNetRoyalties(book.paperback)}€
                </span>
              </div>
            )}
            {book.ebook && (
              <div className="flex justify-between">
                <span>eBook:</span>
                <span className="font-semibold text-lg font-secondary text-green-600">
                  {calculateNetRoyalties(book.ebook)}€
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Separator className="my-3" />
      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={goToInvestigacion}
          disabled={!book.investigacionId}
        >
          <File className="mr-2 h-4 w-4" />
          Ver Investigación
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={goToColeccion}
          disabled={!book.proyectoId}
        >
          <Link className="mr-2 h-4 w-4" />
          Ver Colección
        </Button>
      </div>
    </div>
  );
};
