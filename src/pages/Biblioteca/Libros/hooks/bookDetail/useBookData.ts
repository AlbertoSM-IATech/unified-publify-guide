
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { librosSimulados } from "../../utils/librosUtils";
import { Book } from "../../types/bookTypes";

/**
 * Hook for fetching and managing book data
 */
export const useBookData = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Find book from simulated data
  const bookId = id ? parseInt(id) : 0;
  const libroOriginal = librosSimulados.find((libro) => libro.id === bookId);
  
  // Extended book data for the detail view
  const [bookData, setBookData] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize book data when component mounts
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Fetching book with ID:", bookId);
        
        if (!id) {
          console.error("No se proporcionó un ID de libro");
          setError("No se proporcionó un ID de libro");
          return;
        }
        
        console.log("Libro original encontrado:", libroOriginal);
        
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
        } else {
          console.error("Libro no encontrado con ID:", bookId);
          setError(`No se encontró un libro con el ID: ${bookId}`);
          
          toast({
            title: "Libro no encontrado",
            description: `No se encontró un libro con el ID: ${bookId}`,
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error al cargar el libro:", error);
        setError("Error al cargar la información del libro");
        
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
  }, [id, bookId, navigate]);

  return {
    bookData,
    setBookData,
    loading,
    error,
    bookId,
    libroOriginal
  };
};
