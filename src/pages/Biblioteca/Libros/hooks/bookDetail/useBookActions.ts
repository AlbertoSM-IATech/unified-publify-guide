
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { librosSimulados } from "../../utils/librosUtils";
import { Book } from "../../types/bookTypes";

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
    navigate('/biblioteca/libros');
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      if (!bookData) return;
      
      // Update book data with form changes
      const updatedBook = { ...bookData, ...formData };
      setBookData(updatedBook);
      
      // Update in librosSimulados for demo purposes
      const bookIndex = librosSimulados.findIndex(libro => libro.id === bookId);
      if (bookIndex !== -1) {
        // Update the book in the simulated data array with all properties
        librosSimulados[bookIndex] = {
          ...librosSimulados[bookIndex],
          ...updatedBook
        };
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would save to an API
      console.log("Saving book data:", updatedBook);
      
      toast({
        title: "Cambios guardados",
        description: "Los cambios al libro han sido guardados con éxito.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving book data:", error);
      toast({
        title: "Error al guardar",
        description: "Hubo un problema al guardar los cambios. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      // In a real app, this would delete from an API
      console.log("Deleting book:", bookId);
      
      // Remove from librosSimulados for demo purposes
      const bookIndex = librosSimulados.findIndex(libro => libro.id === bookId);
      if (bookIndex !== -1) {
        librosSimulados.splice(bookIndex, 1);
      }
      
      toast({
        title: "Libro eliminado",
        description: "El libro ha sido eliminado con éxito.",
        variant: "destructive",
      });
      navigate("/biblioteca/libros");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({
        title: "Error al eliminar",
        description: "Hubo un problema al eliminar el libro. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return {
    handleGoBack,
    handleSave,
    handleDelete,
  };
};
