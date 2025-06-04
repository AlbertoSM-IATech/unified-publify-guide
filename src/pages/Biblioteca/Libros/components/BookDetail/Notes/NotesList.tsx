
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
  
  useEffect(() => {
    setNotes(book.notes || []);
  }, [book.notes]);

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

  const updateNotesInStorage = (updatedNotes: BookNote[]) => {
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

  const handleEditNote = (noteId: number) => {
    console.log("Editing note:", noteId);
  };

  const handleUpdateNote = (noteId: number, newText: string) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, text: newText, date: new Date().toISOString() }
        : note
    );
    setNotes(updatedNotes);
    onUpdateBook({ notes: updatedNotes });
    updateNotesInStorage(updatedNotes);
  };

  const handleDeleteNote = (noteId: number) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    onUpdateBook({ notes: updatedNotes });
    updateNotesInStorage(updatedNotes);
  };

  const handleSetReminder = (noteId: number, reminderData: {
    dateTime: string;
    type: 'browser' | 'email';
    title?: string;
  }) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { 
            ...note, 
            reminder: {
              id: `${noteId}-${Date.now()}`,
              ...reminderData,
              status: 'active' as const
            }
          } 
        : note
    );
    
    setNotes(updatedNotes);
    onUpdateBook({ notes: updatedNotes });
    updateNotesInStorage(updatedNotes);
  };

  const handleRemoveReminder = (noteId: number) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, reminder: undefined } 
        : note
    );
    
    setNotes(updatedNotes);
    onUpdateBook({ notes: updatedNotes });
    updateNotesInStorage(updatedNotes);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedNotes = [...sortedNotes];
    const [movedNote] = reorderedNotes.splice(result.source.index, 1);
    reorderedNotes.splice(result.destination.index, 0, movedNote);
    
    setNotes(reorderedNotes);
    onUpdateBook({ notes: reorderedNotes });
    updateNotesInStorage(reorderedNotes);
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
                      onSetReminder={handleSetReminder}
                      onRemoveReminder={handleRemoveReminder}
                      onUpdateNote={handleUpdateNote}
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
