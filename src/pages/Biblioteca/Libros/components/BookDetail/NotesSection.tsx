
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    >
      <Card className="border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="text-lg font-medium text-slate-800 dark:text-slate-200">
            Notas y Observaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isEditing && (
            <div className="mb-6">
              <NoteForm 
                bookId={book.id}
                onUpdateBook={onUpdateBook}
              />
            </div>
          )}
          
          <NotesList 
            notes={book.notes || []} 
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
