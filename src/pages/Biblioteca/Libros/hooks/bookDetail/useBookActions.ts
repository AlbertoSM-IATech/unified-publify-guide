
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
      
      // Update book data with form changes
      const updatedBook = { ...bookData, ...formData };
      
      console.log("[SAVE] Saving book data:", updatedBook);
      
      // Update book data in state
      setBookData(updatedBook);
      
      // Update in localStorage via stored books array
      const updatedBooks = storedBooks.map(book => 
        book.id === bookId ? updatedBook : book
      );
      setStoredBooks(updatedBooks);
      
      // Simulate successful save
      setTimeout(() => {
        setSaving(false);
        setIsEditing(false);
      }, 500);
      
      return true;
    } catch (error) {
      console.error("[ERROR] Error saving book data:", error);
      setSaving(false);
      return false;
    }
  };

  const handleDelete = async () => {
    try {
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
