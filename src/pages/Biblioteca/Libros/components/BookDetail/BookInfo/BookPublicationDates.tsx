
import { Book } from "../../../types/bookTypes";
import { DatePicker } from "@/components/ui/date-picker";
import { Calendar } from "lucide-react";
import { formatDate } from "../../../utils/bookDetail";

interface BookPublicationDatesProps {
  book: Book;
  isEditing: boolean;
  onDateChange: (field: 'fechaPublicacion' | 'fechaLanzamiento', date: Date | undefined) => void;
}

export const BookPublicationDates = ({ book, isEditing, onDateChange }: BookPublicationDatesProps) => {
  return (
    <div className="space-y-4">
      {/* Publication Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Fecha de Publicación</label>
        {isEditing ? (
          <DatePicker
            date={book.fechaPublicacion ? new Date(book.fechaPublicacion) : undefined}
            onSelect={(date) => onDateChange('fechaPublicacion', date)}
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
            onSelect={(date) => onDateChange('fechaLanzamiento', date)}
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
  );
};
