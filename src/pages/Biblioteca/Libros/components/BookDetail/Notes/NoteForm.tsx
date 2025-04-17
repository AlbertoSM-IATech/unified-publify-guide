
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Book } from "../../../types/bookTypes";

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

  const handleSave = () => {
    if (noteText.trim()) {
      const newNote = {
        id: Date.now(),
        text: noteText,
        date: new Date().toISOString(),
      };
      
      const updatedNotes = [...(book.notes || []), newNote];
      onUpdateBook({ notes: updatedNotes });
      setNoteText("");
    }
  };

  const handleCancel = () => {
    setNoteText("");
  };

  return (
    <div className="mb-6 space-y-4 rounded-md border p-4">
      <Textarea
        placeholder="Escribe tu nota aquí..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        rows={4}
        className="resize-none"
      />
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={handleCancel}>
          Cancelar
        </Button>
        <Button size="sm" onClick={handleSave}>
          {isEditing ? "Guardar Cambios" : "Guardar Nota"}
        </Button>
      </div>
    </div>
  );
};
