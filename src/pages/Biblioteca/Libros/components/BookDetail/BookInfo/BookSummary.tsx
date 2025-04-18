
import { Book } from "../../../types/bookTypes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Link as LinkIcon, ExternalLink } from "lucide-react";
import { formatDate } from "../../../utils/bookDetail";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BSRRankings } from "../BSRRankings";
import { BookFormatSelector } from "../BookFormats/BookFormatSelector";
import { useState } from "react";

interface BookSummaryProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}

export const BookSummary = ({ book, isEditing, onUpdateBook }: BookSummaryProps) => {
  const [selectedFormat, setSelectedFormat] = useState<"hardcover" | "paperback" | "ebook">(
    (book.contenido === "hardcover" || book.contenido === "paperback" || book.contenido === "ebook") 
      ? book.contenido 
      : "paperback"
  );

  const handleFormatChange = (format: string) => {
    if (format === "hardcover" || format === "paperback" || format === "ebook") {
      setSelectedFormat(format);
      onUpdateBook?.({ contenido: format });
    }
  };

  const handleOpenUrl = (url: string) => {
    if (url) window.open(url, '_blank');
  };

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <div className="space-y-1">
        <h2 className="font-bold text-2xl font-heading text-blue-500">{book.titulo}</h2>
        {book.subtitulo && <p className="italic text-muted-foreground font-normal text-base">{book.subtitulo}</p>}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-lg font-medium">Por:</span>
        <Button 
          variant="link" 
          className="text-lg p-0 h-auto"
          onClick={() => book.authorPageUrl && handleOpenUrl(book.authorPageUrl)}
        >
          {book.autor}
        </Button>
      </div>

      <Separator />

      <BookFormatSelector 
        selectedFormat={selectedFormat}
        onChange={handleFormatChange}
        isEditing={isEditing}
      />

      <Separator />

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={cn(
            "capitalize",
            book.estado === "Publicado" || book.estado === "publicado" ? "bg-green-100 text-green-800" : "",
            book.estado === "Borrador" || book.estado === "borrador" ? "bg-yellow-100 text-yellow-800" : "",
            book.estado === "En revisión" || book.estado === "en_edicion" ? "bg-blue-100 text-blue-800" : "",
            (book.estado === "Archivado" || book.estado === "pausado") ? "bg-gray-100 text-gray-800" : ""
          )}>
            {book.estado}
          </Badge>
        </div>

        <div className="space-y-2">
          {book.fechaPublicacion && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Publicación: {formatDate(book.fechaPublicacion)}</span>
            </div>
          )}
          {book.fechaLanzamiento && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Lanzamiento: {formatDate(book.fechaLanzamiento)}</span>
            </div>
          )}
        </div>
      </div>

      <Separator />

      <BSRRankings book={book} />

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Enlaces</h3>
        <div className="space-y-2">
          {book.amazonUrl && (
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-start" 
              onClick={() => handleOpenUrl(book.amazonUrl || '')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver en Amazon
            </Button>
          )}
          {book.landingPageUrl && (
            <Button 
              variant="outline" 
              size="sm"
              className="w-full justify-start" 
              onClick={() => handleOpenUrl(book.landingPageUrl || '')}
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Lead Magnet
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
