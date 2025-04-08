
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { librosSimulados } from "../../utils/librosUtils";
import { Book } from "../../types/bookTypes";
import { handleAsync } from "@/utils/errorHandling";

/**
 * Hook para obtener y gestionar los datos de un libro
 */
export const useBookData = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Validar el ID del libro
  const bookId = id ? parseInt(id) : null;
  const [bookData, setBookData] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Buscar el libro en los datos simulados
  const libroOriginal = bookId ? librosSimulados.find((libro) => libro.id === bookId) : null;

  // Inicializar los datos del libro cuando el componente se monta
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Fetching book with ID:", bookId);
        
        if (!bookId) {
          const errorMsg = "No se proporcionó un ID de libro válido";
          console.error(errorMsg);
          setError(errorMsg);
          toast({
            title: "Error",
            description: errorMsg,
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        
        // Buscar el libro en los datos simulados
        if (libroOriginal) {
          console.log("Libro original encontrado:", libroOriginal);
          
          // Extender los datos del libro con propiedades adicionales
          const extendedBookData: Book = {
            ...libroOriginal,
            subtitulo: libroOriginal.subtitulo || "", 
            descripcion: libroOriginal.descripcion || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            hardcover: libroOriginal.hardcover || {
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
            paperback: libroOriginal.paperback || {
              dimensions: "12.7 x 20.32 cm",
              isbn: "978-0987654321",
              asin: "B09HIJKLMN",
              pages: 300,
              price: 14.99,
              royaltyPercentage: 0.70,
              printingCost: 3.20,
            },
            ebook: libroOriginal.ebook || {
              asin: "B01234ABCD",
              price: 9.99,
              royaltyPercentage: 0.70,
              printingCost: 0,
            },
            notes: libroOriginal.notes || [
              { id: 1, text: "Contactar a diseñador para mejorar la portada", date: "2023-11-15" },
              { id: 2, text: "Verificar disponibilidad en tiendas físicas", date: "2023-10-30" },
            ]
          };
          
          setBookData(extendedBookData);
        } else {
          const errorMsg = `No se encontró un libro con el ID: ${bookId}`;
          console.error(errorMsg);
          setError(errorMsg);
          
          toast({
            title: "Libro no encontrado",
            description: errorMsg,
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

    // Solo intentar cargar datos si tenemos un ID válido
    if (bookId) {
      fetchBook();
    } else {
      setLoading(false);
      setError("ID de libro inválido");
    }
  }, [bookId, navigate]);

  return {
    bookData,
    setBookData,
    loading,
    error,
    bookId,
    libroOriginal
  };
};
