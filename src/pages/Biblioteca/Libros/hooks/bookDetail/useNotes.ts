
import { useState, useEffect } from "react";
import { Book, BookNote } from "../../types/bookTypes";
import { toast } from "@/hooks/use-toast";

export const useNotes = (
  book: Book,
  onUpdateBook?: (updatedData: Partial<Book>) => void
) => {
  const [notes, setNotes] = useState<BookNote[]>(book.notes || []);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteText, setNewNoteText] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");

  // Update notes when book data changes
  useEffect(() => {
    setNotes(book.notes || []);
  }, [book.notes]);

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
      const updatedNotes = [newNote, ...notes]; // Más reciente primero
      setNotes(updatedNotes);
      setNewNoteText("");
      setIsAddingNote(false);
      
      // Update parent component with new notes
      if (onUpdateBook) {
        onUpdateBook({ notes: updatedNotes });
        
        // Mostrar confirmación
        toast({
          title: "Nota guardada",
          description: "La nota ha sido añadida con éxito."
        });
      }
    }
  };

  const handleCancelNote = () => {
    setNewNoteText("");
    setIsAddingNote(false);
  };

  const handleEditNote = (noteId: number) => {
    const noteToEdit = notes.find(note => note.id === noteId);
    if (noteToEdit) {
      setEditingNoteId(noteId);
      setEditingNoteText(noteToEdit.text);
    }
  };

  const handleSaveEditedNote = () => {
    if (editingNoteId && editingNoteText.trim()) {
      const updatedNotes = notes.map(note => 
        note.id === editingNoteId 
          ? { ...note, text: editingNoteText, date: new Date().toISOString() } 
          : note
      );
      
      setNotes(updatedNotes);
      setEditingNoteId(null);
      setEditingNoteText("");
      
      // Update parent component with edited notes
      if (onUpdateBook) {
        onUpdateBook({ notes: updatedNotes });
        
        // Mostrar confirmación
        toast({
          title: "Nota actualizada",
          description: "La nota ha sido actualizada con éxito."
        });
      }
    }
  };

  const handleCancelEditNote = () => {
    setEditingNoteId(null);
    setEditingNoteText("");
  };

  const handleDeleteNote = (noteId: number) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
    // Update parent component with deleted note
    if (onUpdateBook) {
      onUpdateBook({ notes: updatedNotes });
      
      // Mostrar confirmación
      toast({
        title: "Nota eliminada",
        description: "La nota ha sido eliminada con éxito.",
        variant: "destructive"
      });
    }
  };

  // New function to handle reordering of notes
  const handleReorderNotes = (reorderedNotes: BookNote[]) => {
    setNotes(reorderedNotes);
    
    // Update parent component with reordered notes
    if (onUpdateBook) {
      onUpdateBook({ notes: reorderedNotes });
    }
  };

  return {
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
  };
};
