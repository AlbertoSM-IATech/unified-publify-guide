
import { Book } from "../../../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Link as LinkIcon, Trophy } from "lucide-react";
import { formatDate } from "../../../utils/bookDetail";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BookSummaryProps {
  book: Book;
  isEditing: boolean;
}

export const BookSummary = ({ book, isEditing }: BookSummaryProps) => {
  const handleOpenUrl = (url: string) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Estado y Tipo</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={cn(
              "capitalize",
              book.estado === "publicado" && "bg-green-100 text-green-800",
              book.estado === "borrador" && "bg-yellow-100 text-yellow-800",
              book.estado === "en_edicion" && "bg-blue-100 text-blue-800"
            )}>
              {book.estado}
            </Badge>
            <Badge variant="secondary">{book.contenido}</Badge>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Fechas</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Publicación: {book.fechaPublicacion ? formatDate(book.fechaPublicacion) : "No definida"}</span>
            </div>
            {book.fechaLanzamiento && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Lanzamiento: {formatDate(book.fechaLanzamiento)}</span>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Rankings</h3>
          <div className="space-y-2">
            {book.bsr ? (
              <div className="flex items-center text-sm">
                <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
                <span>BSR: #{book.bsr}</span>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">BSR no disponible</span>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-2">Enlaces</h3>
          <div className="space-y-2">
            {book.landingPageUrl && (
              <Button 
                variant="outline" 
                size="sm"
                className="w-full justify-start" 
                onClick={() => handleOpenUrl(book.landingPageUrl || '')}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Landing Page
              </Button>
            )}
            {book?.ebook?.links?.amazon && (
              <Button 
                variant="outline" 
                size="sm"
                className="w-full justify-start" 
                onClick={() => handleOpenUrl(book.ebook?.links?.amazon || '')}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Amazon (eBook)
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
