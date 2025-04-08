
import { BookNote } from "../../../types/bookTypes";
import { NoteItem } from "./NoteItem";
import { Separator } from "@/components/ui/separator";

interface NotesListProps {
  notes: BookNote[];
  isEditing: boolean;
  onEditNote: (noteId: number) => void;
  onDeleteNote: (noteId: number) => void;
}

export const NotesList = ({ notes, isEditing, onEditNote, onDeleteNote }: NotesListProps) => {
  // Ordenar notas por fecha (más reciente primero)
  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  if (sortedNotes.length === 0) {
    return (
      <div className="flex h-24 items-center justify-center text-muted-foreground">
        No hay notas para este libro
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {sortedNotes.map((note, index) => (
        <div key={note.id}>
          <NoteItem 
            note={note} 
            isEditing={isEditing}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
          />
          {index < sortedNotes.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
};
