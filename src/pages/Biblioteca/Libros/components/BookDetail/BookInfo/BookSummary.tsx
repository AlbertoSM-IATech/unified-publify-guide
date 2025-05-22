
import { Book } from "../../../types/bookTypes";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { BSRRankings } from "../BSRRankings";
import { BookTitleAndAuthor } from "./BookTitleAndAuthor";
import { BookStatusAndContent } from "./BookStatusAndContent";
import { BookPublicationDates } from "./BookPublicationDates";
import { BookLinksSection } from "./BookLinksSection";

interface BookSummaryProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}

export const BookSummary = ({ book, isEditing, onUpdateBook }: BookSummaryProps) => {

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
      className="p-6 space-y-6 py-[10px] px-[10px]"
    >
      <BookTitleAndAuthor book={book} handleOpenUrl={handleOpenUrl} />

      <Separator />

      <BookStatusAndContent 
        book={book} 
        isEditing={isEditing} 
        onStatusChange={handleStatusChange} 
        onContentTypeChange={handleContentTypeChange} 
      />

      <Separator />
      
      <BookPublicationDates 
        book={book} 
        isEditing={isEditing} 
        onDateChange={handleDateChange} 
      />

      <Separator />

      <BSRRankings book={book} />

      <Separator />

      <BookLinksSection book={book} handleOpenUrl={handleOpenUrl} />
      
    </motion.div>
  );
};
