
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "../../types/bookTypes";
import { NotesList } from "./Notes/NotesList";
import { NoteForm } from "./Notes/NoteForm";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6" // Añadido para espaciar las tarjetas
    >
      {/* Tarjeta para el título de la sección */}
      <Card className="p-4 bg-muted/40 dark:bg-muted/10">
        <h3 className="text-xl font-semibold">Notas y Observaciones</h3>
      </Card>
      
      {/* Tarjeta para el contenido de las notas */}
      <Card className="border-slate-200 dark:border-slate-700 shadow-md">
        {/* CardHeader eliminado, el título ahora está en la tarjeta superior */}
        <CardContent className="p-6">
          {isEditing && (
            <div className="mb-6">
              <NoteForm 
                book={book}
                onUpdateBook={onUpdateBook}
                isEditing={isEditing}
              />
            </div>
          )}
          
          <NotesList 
            book={book}
            isEditing={isEditing} 
            onUpdateBook={onUpdateBook}
          />
          
          {!isEditing && (!book.notes || book.notes.length === 0) && (
            <div className="text-center py-8 text-muted-foreground">
              <p>No hay notas agregadas para este libro.</p>
              <p className="text-sm mt-1">Edita este libro para agregar notas.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
