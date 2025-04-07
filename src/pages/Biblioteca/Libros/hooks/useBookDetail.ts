
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { librosSimulados } from "../utils/librosUtils";
import { Book, BookFormat } from "../types/bookTypes";

export const useBookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Find book from simulated data
  const bookId = parseInt(id || "0");
  const libroOriginal = librosSimulados.find((libro) => libro.id === bookId);

  // Extended book data for the detail view
  const [bookData, setBookData] = useState<Book | null>(null);
  
  // Form state for edits
  const [formData, setFormData] = useState<Partial<Book>>({});

  // Initialize book data when component mounts
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        if (libroOriginal) {
          // Ensure we're extending the libro with proper properties
          const libro = libroOriginal;
          
          const extendedBookData: Book = {
            ...libro,
            subtitulo: libro.subtitulo || "", // Ensure subtitulo is always set
            descripcion: libro.descripcion || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            hardcover: libro.hardcover || {
              dimensions: "15.24 x 22.86 cm",
              isbn: "978-1234567890",
              asin: "B01ABCDEFG",
              pages: 300,
              price: 24.99,
              royaltyPercentage: 0.60,
              printingCost: 5.50,
              files: [
                { id: 1, name: "manuscrito.pdf", type: "document" },
                { id: 2, name: "portada.jpg", type: "image" },
              ],
              links: {
                amazon: "https://amazon.com/book1",
              },
              strategy: "Enfocarse en ventas directas y posicionamiento en Amazon.",
            },
            paperback: libro.paperback || {
              dimensions: "12.7 x 20.32 cm",
              isbn: "978-0987654321",
              asin: "B09HIJKLMN",
              pages: 300,
              price: 14.99,
              royaltyPercentage: 0.70,
              printingCost: 3.20,
            },
            ebook: libro.ebook || {
              asin: "B01234ABCD",
              price: 9.99,
              royaltyPercentage: 0.70,
              printingCost: 0,
            },
            notes: libro.notes || [
              { id: 1, text: "Contactar a diseñador para mejorar la portada", date: "2023-11-15" },
              { id: 2, text: "Verificar disponibilidad en tiendas físicas", date: "2023-10-30" },
            ]
          };
          
          setBookData(extendedBookData);
        } else if (bookId !== 0) {
          // Solo mostrar mensaje de error si hay un ID válido pero no se encuentra el libro
          toast({
            title: "Libro no encontrado",
            description: `No se encontró un libro con el ID: ${bookId}`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error al cargar el libro:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del libro",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [libroOriginal, bookId, navigate]);

  // Reset form data when book data changes
  useEffect(() => {
    setFormData({});
  }, [bookData]);

  const handleGoBack = () => {
    navigate('/biblioteca/libros');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({});
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
      setFormData({});
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

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({});
    toast({
      description: "Edición cancelada. Los cambios no han sido guardados.",
    });
  };

  // Handle form data updates from child components
  const handleUpdateBook = (updatedData: Partial<Book>) => {
    setFormData(prevData => ({
      ...prevData,
      ...updatedData
    }));
    console.log("Updated form data:", { ...formData, ...updatedData });
  };

  return {
    bookData,
    isEditing,
    saving,
    loading,
    formData,
    libroOriginal,
    handleGoBack,
    handleEdit,
    handleSave,
    handleDelete,
    handleCancel,
    handleUpdateBook,
  };
};
