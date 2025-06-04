
import { Book } from "../../types/bookTypes";
import { NoteForm } from "./Notes/NoteForm";
import { NotesList } from "./Notes/NotesList";
import { BookDateReminders } from "./DateReminders/BookDateReminders";
import { Separator } from "@/components/ui/separator";

interface NotesSectionProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const NotesSection = ({ 
  book, 
  isEditing, 
  onUpdateBook 
}: NotesSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Recordatorios de Fechas del Libro */}
      <BookDateReminders 
        book={book}
        isEditing={isEditing}
        onUpdateBook={onUpdateBook}
      />
      
      <Separator />
      
      {/* Formulario para nuevas notas */}
      {isEditing && (
        <NoteForm
          book={book}
          onUpdateBook={onUpdateBook}
          isEditing={isEditing}
        />
      )}
      
      {/* Lista de notas existentes */}
      <div>
        <h3 className="mb-4 font-medium">Notas del Libro</h3>
        <NotesList
          book={book}
          isEditing={isEditing}
          onUpdateBook={onUpdateBook}
        />
      </div>
    </div>
  );
};
