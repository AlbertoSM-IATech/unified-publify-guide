
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { librosSimulados } from "../../utils/librosUtils";
import { Book } from "../../types/bookTypes";
import { supabaseService } from "@/services/supabase";

/**
 * Hook for managing book actions such as save, delete, and navigation
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
      
      console.log("Saving book data:", updatedBook);
      
      // Update in localStorage before trying Supabase
      // This ensures data persists even if the Supabase call fails
      const currentBooks = localStorage.getItem('librosData');
      let booksArray = currentBooks ? JSON.parse(currentBooks) : [...librosSimulados];
      
      const bookIndex = booksArray.findIndex((book: Book) => book.id === bookId);
      if (bookIndex !== -1) {
        booksArray[bookIndex] = { ...booksArray[bookIndex], ...updatedBook };
        localStorage.setItem('librosData', JSON.stringify(booksArray));
      } else {
        // If book not found, add it to the array
        booksArray.push(updatedBook);
        localStorage.setItem('librosData', JSON.stringify(booksArray));
      }
      
      // Try to update in Supabase (don't wait for completion)
      supabaseService.books.update(bookId, updatedBook)
        .then(result => {
          if (result) {
            console.log("Book updated successfully in Supabase:", result);
          } else {
            console.warn("Book update in Supabase returned null, using local update only");
          }
        })
        .catch(error => {
          console.error("Error updating book in Supabase:", error);
        });
      
      setIsEditing(false);
      return true;
    } catch (error) {
      console.error("Error saving book data:", error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete locally first for immediate feedback
      const currentBooks = localStorage.getItem('librosData');
      let booksArray = currentBooks ? JSON.parse(currentBooks) : [...librosSimulados];
      
      const bookIndex = booksArray.findIndex((book: Book) => book.id === bookId);
      if (bookIndex !== -1) {
        booksArray.splice(bookIndex, 1);
        localStorage.setItem('librosData', JSON.stringify(booksArray));
        
        // Try to delete from Supabase (don't wait for completion)
        supabaseService.books.delete(bookId)
          .then(deleted => {
            if (deleted) {
              console.log("Book deleted successfully from Supabase");
            } else {
              console.warn("Book delete from Supabase failed, but deleted locally");
            }
          })
          .catch(error => {
            console.error("Error deleting book from Supabase:", error);
          });
        
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
      console.error("Error deleting book:", error);
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
