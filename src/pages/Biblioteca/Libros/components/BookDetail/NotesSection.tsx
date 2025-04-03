
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Book, BookNote } from "../../types/bookTypes";
import { PenLine, Plus, Trash } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface NotesSectionProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}

export const NotesSection = ({ book, isEditing, onUpdateBook }: NotesSectionProps) => {
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

  // Ordenar notas por fecha (más reciente primero)
  const sortedNotes = [...notes].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

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

        {sortedNotes.length === 0 ? (
          <div className="flex h-24 items-center justify-center text-muted-foreground">
            No hay notas para este libro
          </div>
        ) : (
          <div className="space-y-4">
            {sortedNotes.map((note, index) => (
              <div key={note.id}>
                {editingNoteId === note.id ? (
                  <div className="space-y-4 rounded-md border p-4">
                    <Textarea
                      value={editingNoteText}
                      onChange={(e) => setEditingNoteText(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCancelEditNote}>
                        Cancelar
                      </Button>
                      <Button size="sm" onClick={handleSaveEditedNote}>
                        Guardar Cambios
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-md bg-muted p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(note.date), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es })}
                      </div>
                      {isEditing && (
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditNote(note.id)}
                          >
                            <PenLine className="h-4 w-4" />
                            <span className="sr-only">Editar nota</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                <Trash className="h-4 w-4" />
                                <span className="sr-only">Eliminar nota</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción eliminará permanentemente la nota y no se puede deshacer.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteNote(note.id)}
                                  className="bg-red-500 text-white hover:bg-red-600"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      )}
                    </div>
                    <p className="text-sm">{note.text}</p>
                  </div>
                )}
                {index < sortedNotes.length - 1 && <Separator className="my-4" />}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
