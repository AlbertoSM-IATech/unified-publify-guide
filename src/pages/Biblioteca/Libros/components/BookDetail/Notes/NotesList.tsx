
import { BookNote } from "../../../types/bookTypes";
import { NoteItem } from "./NoteItem";
import { Separator } from "@/components/ui/separator";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

interface NotesListProps {
  notes: BookNote[];
  isEditing: boolean;
  onEditNote: (noteId: number) => void;
  onDeleteNote: (noteId: number) => void;
  onReorderNotes: (reorderedNotes: BookNote[]) => void;
}

export const NotesList = ({ 
  notes, 
  isEditing, 
  onEditNote, 
  onDeleteNote,
  onReorderNotes
}: NotesListProps) => {
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

  const handleDragEnd = (result: DropResult) => {
    // Dropped outside the list
    if (!result.destination) return;

    // Reorder the notes array based on drag and drop result
    const reorderedNotes = [...sortedNotes];
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);
    
    // Update the parent component with the new order
    onReorderNotes(reorderedNotes);
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
                      onEdit={onEditNote}
                      onDelete={onDeleteNote}
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
