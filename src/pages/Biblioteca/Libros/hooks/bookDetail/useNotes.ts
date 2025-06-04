
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
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      setNewNoteText("");
      setIsAddingNote(false);
      
      if (onUpdateBook) {
        onUpdateBook({ notes: updatedNotes });
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
      
      if (onUpdateBook) {
        onUpdateBook({ notes: updatedNotes });
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
    
    if (onUpdateBook) {
      onUpdateBook({ notes: updatedNotes });
      toast({
        title: "Nota eliminada",
        description: "La nota ha sido eliminada con éxito.",
        variant: "destructive"
      });
    }
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
    
    if (onUpdateBook) {
      onUpdateBook({ notes: updatedNotes });
      toast({
        title: "Recordatorio agregado",
        description: `Recordatorio configurado para ${new Date(reminderData.dateTime).toLocaleDateString('es-ES')}`
      });
    }

    // Configurar notificación del navegador
    if (reminderData.type === 'browser') {
      scheduleNotification(reminderData.dateTime, reminderData.title || "Recordatorio de nota");
    }
  };

  const handleRemoveReminder = (noteId: number) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId 
        ? { ...note, reminder: undefined } 
        : note
    );
    
    setNotes(updatedNotes);
    
    if (onUpdateBook) {
      onUpdateBook({ notes: updatedNotes });
      toast({
        title: "Recordatorio eliminado",
        description: "El recordatorio ha sido eliminado."
      });
    }
  };

  const handleReorderNotes = (reorderedNotes: BookNote[]) => {
    setNotes(reorderedNotes);
    
    if (onUpdateBook) {
      onUpdateBook({ notes: reorderedNotes });
    }
  };

  // Función para programar notificaciones del navegador
  const scheduleNotification = (dateTime: string, title: string) => {
    const targetTime = new Date(dateTime).getTime();
    const currentTime = Date.now();
    const delay = targetTime - currentTime;

    if (delay > 0) {
      // Solicitar permisos de notificación
      if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            setTimeout(() => {
              new Notification(title, {
                body: "Es hora de revisar tu nota",
                icon: "/favicon.ico",
                tag: `reminder-${Date.now()}`
              });
            }, delay);
          }
        });
      }
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
    handleReorderNotes,
    handleSetReminder,
    handleRemoveReminder
  };
};
