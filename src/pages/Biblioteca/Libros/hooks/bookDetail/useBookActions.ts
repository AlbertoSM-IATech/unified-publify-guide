
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Book } from "../../types/bookTypes";

/**
 * Hook for managing book actions such as save, delete, and navigation
 * MODIFIED: All Supabase calls have been removed - using localStorage only
 */
export const useBookActions = (
  bookData: Book | null,
  setBookData: (book: Book | null) => void,
  bookId: number,
  isEditing: boolean,
  setIsEditing: (isEditing: boolean) => void,
  saving: boolean,
  setSaving: (saving: boolean) => void,
  formData: Partial<Book>
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
      setBookData(updatedBook);
      
      console.log("[MOCK] Saving book data:", updatedBook);
      
      // Update in localStorage
      const currentBooks = localStorage.getItem('librosData');
      let booksArray = currentBooks ? JSON.parse(currentBooks) : [];
      
      const bookIndex = booksArray.findIndex((book: Book) => book.id === bookId);
      if (bookIndex !== -1) {
        booksArray[bookIndex] = { ...booksArray[bookIndex], ...updatedBook };
      } else {
        // If book not found, add it to the array
        booksArray.push(updatedBook);
      }
      
      localStorage.setItem('librosData', JSON.stringify(booksArray));
      
      // Simulate successful save
      setTimeout(() => {
        setSaving(false);
        setIsEditing(false);
      }, 500);
      
      return true;
    } catch (error) {
      console.error("[MOCK] Error saving book data:", error);
      setSaving(false);
      return false;
    }
  };

  const handleDelete = async () => {
    try {
      // Delete locally from localStorage
      const currentBooks = localStorage.getItem('librosData');
      let booksArray = currentBooks ? JSON.parse(currentBooks) : [];
      
      const bookIndex = booksArray.findIndex((book: Book) => book.id === bookId);
      if (bookIndex !== -1) {
        booksArray.splice(bookIndex, 1);
        localStorage.setItem('librosData', JSON.stringify(booksArray));
        
        toast({
          title: "Libro eliminado",
          description: "El libro ha sido eliminado con éxito.",
        });
        
        // Navigate back to the list after successful deletion
        navigate("/biblioteca/libros");
        return true;
      } else {
        throw new Error("No se pudo encontrar el libro para eliminar");
      }
    } catch (error) {
      console.error("[MOCK] Error deleting book:", error);
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
