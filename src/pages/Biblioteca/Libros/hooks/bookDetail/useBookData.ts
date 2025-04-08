
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { librosSimulados } from "../../utils/librosUtils";
import { Book, BookNote } from "../../types/bookTypes";

/**
 * Hook for fetching and managing a book's data
 */
export const useBookData = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookData, setBookData] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Validate book ID
  const bookId = id ? parseInt(id) : null;
  
  // Find original book in simulated data
  const libroOriginal = bookId ? librosSimulados.find((libro) => libro.id === bookId) : null;

  // Create extended book data with defaults for missing properties
  const extendBookData = (originalBook: typeof libroOriginal): Book | null => {
    if (!originalBook) return null;
    
    return {
      ...originalBook,
      subtitulo: originalBook.subtitulo || "", 
      descripcion: originalBook.descripcion || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      hardcover: originalBook.hardcover || createDefaultHardcoverFormat(),
      paperback: originalBook.paperback || createDefaultPaperbackFormat(),
      ebook: originalBook.ebook || createDefaultEbookFormat(),
      notes: originalBook.notes || createDefaultNotes()
    };
  };

  // Initialize the book data when component mounts
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Fetching book with ID:", bookId);
        
        if (!bookId) {
          handleInvalidBookId();
          return;
        }
        
        if (libroOriginal) {
          console.log("Libro original encontrado:", libroOriginal);
          const extendedBookData = extendBookData(libroOriginal);
          setBookData(extendedBookData);
        } else {
          handleBookNotFound();
        }
      } catch (error) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    // Only try to load data if we have a valid ID
    if (bookId) {
      fetchBook();
    } else {
      setLoading(false);
      setError("ID de libro inválido");
    }
  }, [bookId, navigate]);

  // Helper functions for error handling
  const handleInvalidBookId = () => {
    const errorMsg = "No se proporcionó un ID de libro válido";
    console.error(errorMsg);
    setError(errorMsg);
    showErrorToast(errorMsg);
    setLoading(false);
  };

  const handleBookNotFound = () => {
    const errorMsg = `No se encontró un libro con el ID: ${bookId}`;
    console.error(errorMsg);
    setError(errorMsg);
    showErrorToast("Libro no encontrado", errorMsg);
  };

  const handleFetchError = (error: unknown) => {
    console.error("Error al cargar el libro:", error);
    setError("Error al cargar la información del libro");
    showErrorToast("Error", "No se pudo cargar la información del libro");
  };

  // Helper function for showing toasts
  const showErrorToast = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  return {
    bookData,
    setBookData,
    loading,
    error,
    bookId,
    libroOriginal
  };
};

// Helper functions to create default data objects
function createDefaultHardcoverFormat() {
  return {
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
  };
}

function createDefaultPaperbackFormat() {
  return {
    dimensions: "12.7 x 20.32 cm",
    isbn: "978-0987654321",
    asin: "B09HIJKLMN",
    pages: 300,
    price: 14.99,
    royaltyPercentage: 0.70,
    printingCost: 3.20,
  };
}

function createDefaultEbookFormat() {
  return {
    asin: "B01234ABCD",
    price: 9.99,
    royaltyPercentage: 0.70,
    printingCost: 0,
  };
}

function createDefaultNotes(): BookNote[] {
  return [
    { id: 1, text: "Contactar a diseñador para mejorar la portada", date: "2023-11-15" },
    { id: 2, text: "Verificar disponibilidad en tiendas físicas", date: "2023-10-30" },
  ];
}
