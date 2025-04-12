
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book } from "../../types/bookTypes";
import { Plus } from "lucide-react";
import { useNotes } from "../../hooks/bookDetail/useNotes";
import { NoteForm } from "./Notes/NoteForm";
import { NotesList } from "./Notes/NotesList";

interface NotesSectionProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}

export const NotesSection = ({ book, isEditing, onUpdateBook }: NotesSectionProps) => {
  const {
    notes,
    isAddingNote,
    newNoteText,
    editingNoteId,
    editingNoteText,
    setNewNoteText,
    setEditingNoteText,
    handleAddNote,
    handleSaveNote,
    handleCancelNote,
    handleEditNote,
    handleSaveEditedNote,
    handleCancelEditNote,
    handleDeleteNote,
    handleReorderNotes
  } = useNotes(book, onUpdateBook);

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
          <NoteForm 
            noteText={newNoteText}
            onTextChange={setNewNoteText}
            onSave={handleSaveNote}
            onCancel={handleCancelNote}
          />
        )}

        {editingNoteId !== null ? (
          <NoteForm 
            noteText={editingNoteText}
            onTextChange={setEditingNoteText}
            onSave={handleSaveEditedNote}
            onCancel={handleCancelEditNote}
            isEditing={true}
          />
        ) : (
          <NotesList 
            notes={notes}
            isEditing={isEditing}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            onReorderNotes={handleReorderNotes}
          />
        )}
      </CardContent>
    </Card>
  );
};
