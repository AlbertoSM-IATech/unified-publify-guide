import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Book } from "../../types/bookTypes";

/**
 * Hook for managing book actions such as save, delete, and navigation
 * with improved persistence via localStorage
 */
export const useBookActions = (
  bookData: Book | null,
  setBookData: (book: Book) => void,
  bookId: number,
  isEditing: boolean,
  setIsEditing: (isEditing: boolean) => void,
  saving: boolean,
  setSaving: (saving: boolean) => void,
  formData: Partial<Book>,
  storedBooks: Book[],
  setStoredBooks: (books: Book[]) => void
) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // First check if we're in edit mode
    if (isEditing) {
      // Prompt user if they want to discard changes
      const hasUnsavedChanges = Object.keys(formData).length > 0;
      
      if (hasUnsavedChanges) {
        const confirmCancel = window.confirm('¿Estás seguro que deseas salir? Los cambios no guardados se perderán.');
        if (!confirmCancel) return;
      }
      
      setIsEditing(false);
    } else {
      navigate('/biblioteca/libros');
    }
  };

  const handleSave = async (): Promise<boolean> => {
    try {
      setSaving(true);
      
      if (!bookData) {
        throw new Error("No hay datos del libro para guardar");
      }
      
      console.log("[SAVE] Saving book data with changes:", formData);
      
      // Create a complete merged book object
      const updatedBook: Book = { 
        ...bookData, 
        ...formData 
      };
      
      // If there's a coverFile, handle it specially
      if (formData.coverFile) {
        console.log("[SAVE] Book has a cover file to process");
        // In a real application, you might upload the file to a server here
        // For now, we just keep the imageUrl that was set when selecting the file
      }
      
      // Update book data in state
      setBookData(updatedBook);
      
      // Update in localStorage via stored books array
      const updatedBooks = storedBooks.map(book => 
        book.id === bookId ? updatedBook : book
      );
      
      console.log("[SAVE] Persisting updated book to storage:", updatedBook);
      setStoredBooks(updatedBooks);
      
      // Simulate successful save with small delay to show saving state
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Exit edit mode after successful save
      setIsEditing(false);
      setSaving(false);
      
      return true;
    } catch (error) {
      console.error("[ERROR] Error saving book data:", error);
      setSaving(false);
      return false;
    }
  };

  const handleDelete = async () => {
    try {
      // Confirm deletion
      const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este libro? Esta acción no se puede deshacer.');
      if (!confirmDelete) return false;
      
      // Delete from stored books array
      const updatedBooks = storedBooks.filter(book => book.id !== bookId);
      setStoredBooks(updatedBooks);
        
      toast({
        title: "Libro eliminado",
        description: "El libro ha sido eliminado con éxito.",
      });
      
      // Navigate back to the list after successful deletion
      navigate("/biblioteca/libros");
      return true;
    } catch (error) {
      console.error("[ERROR] Error deleting book:", error);
      toast({
        title: "Error al eliminar",
        description: "Hubo un problema al eliminar el libro. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    handleGoBack,
    handleSave,
    handleDelete,
  };
};
