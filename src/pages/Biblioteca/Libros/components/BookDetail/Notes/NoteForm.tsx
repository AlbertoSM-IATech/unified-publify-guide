
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "../../../types/bookTypes";
import { Bell } from "lucide-react";
import { ReminderDialog } from "./ReminderDialog";

interface NoteFormProps {
  book: Book;
  onUpdateBook: (updatedData: Partial<Book>) => void;
  isEditing?: boolean;
}

export const NoteForm = ({ 
  book, 
  onUpdateBook, 
  isEditing = false 
}: NoteFormProps) => {
  const [noteText, setNoteText] = useState("");
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  const [pendingReminder, setPendingReminder] = useState<{
    dateTime: string;
    type: 'browser' | 'email';
    title?: string;
  } | null>(null);

  const updateNotesInStorage = (updatedNotes: any[]) => {
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      const books = JSON.parse(storedBooks);
      const bookIndex = books.findIndex((b: Book) => b.id === book.id);
      if (bookIndex !== -1) {
        books[bookIndex] = {
          ...books[bookIndex],
          notes: updatedNotes
        };
        localStorage.setItem('librosData', JSON.stringify(books));
      }
    }
  };

  const handleSave = () => {
    if (noteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: noteText,
        date: new Date().toISOString(),
        reminder: pendingReminder ? {
          id: `${Date.now()}-${Math.random()}`,
          ...pendingReminder,
          status: 'active' as const
        } : undefined
      };
      
      const updatedNotes = [...(book.notes || []), newNote];
      onUpdateBook({ notes: updatedNotes });
      updateNotesInStorage(updatedNotes);
      setNoteText("");
      setPendingReminder(null);
    }
  };

  const handleCancel = () => {
    setNoteText("");
    setPendingReminder(null);
  };

  const handleSetReminder = (reminderData: {
    dateTime: string;
    type: 'browser' | 'email';
    title?: string;
  }) => {
    setPendingReminder(reminderData);
  };

  return (
    <>
      <div className="mb-6 space-y-4 rounded-md border p-4">
        <Textarea
          placeholder="Escribe tu nota aquí..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows={4}
          className="resize-none"
        />
        
        {pendingReminder && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-blue-50 dark:bg-blue-950 p-2 rounded">
            <Bell className="h-4 w-4" />
            <span>Recordatorio programado para: {new Date(pendingReminder.dateTime).toLocaleString('es-ES')}</span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setPendingReminder(null)}
              className="ml-auto h-6 text-xs"
            >
              Quitar
            </Button>
          </div>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsReminderDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            {pendingReminder ? "Editar Recordatorio" : "Agregar Recordatorio"}
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button size="sm" onClick={handleSave}>
              {isEditing ? "Guardar Cambios" : "Guardar Nota"}
            </Button>
          </div>
        </div>
      </div>

      <ReminderDialog
        isOpen={isReminderDialogOpen}
        onOpenChange={setIsReminderDialogOpen}
        onSetReminder={handleSetReminder}
        existingReminder={pendingReminder}
      />
    </>
  );
};
