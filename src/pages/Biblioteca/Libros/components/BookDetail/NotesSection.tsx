
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Book, BookNote } from "../../types/bookTypes";
import { PenLine, Plus } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";

interface NotesSectionProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}

export const NotesSection = ({ book, isEditing, onUpdateBook }: NotesSectionProps) => {
  const [notes, setNotes] = useState<BookNote[]>(book.notes || []);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");

  const handleAddNote = () => {
    setIsAddingNote(true);
  };

  const handleSaveNote = () => {
    if (newNoteText.trim()) {
      const newNote: BookNote = {
        id: Date.now(),
        text: newNoteText,
        date: new Date().toISOString(),
      };
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      setNewNoteText("");
      setIsAddingNote(false);
      
      // Update parent component with new notes
      if (onUpdateBook) {
        onUpdateBook({ notes: updatedNotes });
      }
    }
  };

  const handleCancelNote = () => {
    setNewNoteText("");
    setIsAddingNote(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Notas y Observaciones</h3>
          {!isAddingNote && (
            <Button 
              onClick={handleAddNote} 
              variant="outline" 
              size="sm"
              disabled={!isEditing}
            >
              <Plus className="mr-1 h-4 w-4" />
              Añadir Nota
            </Button>
          )}
        </div>

        {isAddingNote && (
          <div className="mb-6 space-y-4 rounded-md border p-4">
            <Textarea
              placeholder="Escribe tu nota aquí..."
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancelNote}>
                Cancelar
              </Button>
              <Button size="sm" onClick={handleSaveNote}>
                Guardar Nota
              </Button>
            </div>
          </div>
        )}

        {notes.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-muted-foreground">
            No hay notas para este libro
          </div>
        ) : (
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={note.id}>
                <div className="rounded-md bg-muted p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      {format(new Date(note.date), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <PenLine className="h-4 w-4" />
                        <span className="sr-only">Editar nota</span>
                      </Button>
                    )}
                  </div>
                  <p className="text-sm">{note.text}</p>
                </div>
                {index < notes.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
