
import { Book, BookNote } from "../../../types/bookTypes";
import { NoteItem } from "./NoteItem";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

interface NotesListProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const NotesList = ({ 
  book,
  isEditing, 
  onUpdateBook
}: NotesListProps) => {
  const [notes, setNotes] = useState<BookNote[]>(book.notes || []);
  
  // Update notes when book data changes
  useEffect(() => {
    setNotes(book.notes || []);
  }, [book.notes]);

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

  const handleEditNote = (noteId: number) => {
    // Find the note to edit
    const noteToEdit = notes.find(note => note.id === noteId);
    if (!noteToEdit) return;

    // Implementation would depend on how you want to handle editing
    // For now, just log the action
    console.log("Editing note:", noteId);
  };

  const handleDeleteNote = (noteId: number) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    onUpdateBook({ notes: updatedNotes });
  };

  const handleDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) return;

    // Reorder the notes array based on drag and drop result
    const reorderedNotes = [...sortedNotes];
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);
    
    // Update state and parent component
    setNotes(reorderedNotes);
    onUpdateBook({ notes: reorderedNotes });
  };
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="notesList" direction="vertical">
        {(provided) => (
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {sortedNotes.map((note, index) => (
              <Draggable 
                key={note.id.toString()} 
                draggableId={note.id.toString()} 
                index={index}
                isDragDisabled={!isEditing}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <NoteItem 
                      note={note} 
                      isEditing={isEditing}
                      onEdit={() => handleEditNote(note.id)}
                      onDelete={() => handleDeleteNote(note.id)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
