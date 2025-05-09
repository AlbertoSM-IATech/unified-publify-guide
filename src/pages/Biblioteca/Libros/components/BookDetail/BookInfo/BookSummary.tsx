
import { Book } from "../../../types/bookTypes";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Link as LinkIcon, ExternalLink, User } from "lucide-react";
import { formatDate } from "../../../utils/bookDetail";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BSRRankings } from "../BSRRankings";
import { useState } from "react";
import { FormField } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/common/StatusBadge";
import { DatePicker } from "@/components/ui/date-picker";

interface BookSummaryProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}

export const BookSummary = ({ book, isEditing, onUpdateBook }: BookSummaryProps) => {
  const [selectedFormat, setSelectedFormat] = useState<"hardcover" | "paperback" | "ebook">("paperback");

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format as "hardcover" | "paperback" | "ebook");
  };

  const handleDateChange = (field: 'fechaPublicacion' | 'fechaLanzamiento', date: Date | undefined) => {
    if (onUpdateBook && date) {
      onUpdateBook({ [field]: date.toISOString() });
    }
  };

  const handleContentTypeChange = (value: string) => {
    onUpdateBook?.({
      contenido: value as "Alto Contenido" | "Medio Contenido" | "Bajo Contenido"
    });
  };

  const handleStatusChange = (value: string) => {
    onUpdateBook?.({
      estado: value as "Borrador" | "En revisión" | "Publicado" | "Archivado"
    });
  };

  const handleOpenUrl = (url: string) => {
    if (url) window.open(url, '_blank');
  };

  const getAmazonLink = () => {
    if (selectedFormat && book[selectedFormat]?.links?.amazon) {
      return book[selectedFormat]?.links?.amazon;
    }
    return book.amazonUrl;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="p-6 space-y-6 py-[10px] px-[10px]"
    >
      <div className="space-y-1">
        <h2 className="font-bold text-2xl font-heading text-blue-500">{book.titulo}</h2>
        {book.subtitulo && (
          <p className="italic text-muted-foreground font-normal text-base">{book.subtitulo}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
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

      {/* Status Field */}
      <div className="grid gap-3 py-0 my-[20px]">
        <label className="text-sm font-medium">Estado</label>
        {isEditing ? (
          <Select 
            defaultValue={book.estado} 
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="hover:border-[#FB923C] transition-colors duration-200">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Borrador">Borrador</SelectItem>
              <SelectItem value="En revisión">En revisión</SelectItem>
              <SelectItem value="Publicado">Publicado</SelectItem>
              <SelectItem value="Archivado">Archivado</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <StatusBadge status={book.estado.toLowerCase()} />
        )}
      </div>

      {/* Content Type Field */}
      <div className="grid gap-3">
        <label className="text-sm font-medium">Tipo de Contenido</label>
        {isEditing ? (
          <Select 
            defaultValue={book.contenido} 
            onValueChange={handleContentTypeChange}
          >
            <SelectTrigger className="hover:border-[#FB923C] transition-colors duration-200">
              <SelectValue placeholder="Seleccionar tipo de contenido" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alto Contenido">Alto Contenido</SelectItem>
              <SelectItem value="Medio Contenido">Medio Contenido</SelectItem>
              <SelectItem value="Bajo Contenido">Bajo Contenido</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <StatusBadge status={book.contenido.toLowerCase()} />
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        {/* Publication Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Fecha de Publicación</label>
          {isEditing ? (
            <DatePicker
              date={book.fechaPublicacion ? new Date(book.fechaPublicacion) : undefined}
              onSelect={(date) => handleDateChange('fechaPublicacion', date)}
            />
          ) : (
            book.fechaPublicacion && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Publicación: {formatDate(book.fechaPublicacion)}</span>
              </div>
            )
          )}
        </div>

        {/* Launch Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Fecha de Lanzamiento</label>
          {isEditing ? (
            <DatePicker
              date={book.fechaLanzamiento ? new Date(book.fechaLanzamiento) : undefined}
              onSelect={(date) => handleDateChange('fechaLanzamiento', date)}
            />
          ) : (
            book.fechaLanzamiento && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Lanzamiento: {formatDate(book.fechaLanzamiento)}</span>
              </div>
            )
          )}
        </div>
      </div>

      <Separator />

      <BSRRankings book={book} />

      <Separator />

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Enlaces</h3>
        <div className="space-y-2">
          {getAmazonLink() && (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => handleOpenUrl(getAmazonLink() || '')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ver en Amazon ({selectedFormat})
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
