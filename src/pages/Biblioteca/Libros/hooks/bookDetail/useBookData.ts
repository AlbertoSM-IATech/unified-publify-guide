
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { librosSimulados } from "../../utils/librosUtils";
import { Book } from "../../types/bookTypes";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useBookExtension } from "./useBookExtension";

export const useBookData = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookData, setBookData] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>('librosData', librosSimulados);
  const { extendBookData } = useBookExtension();
  
  const bookId = id ? parseInt(id) : null;
  const libroOriginal = bookId ? storedBooks.find((libro) => libro.id === bookId) : null;

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
            title: errorMsg,
            variant: "destructive",
          });
          return;
        }
        
        // Check stored books first
        const storedBook = storedBooks.find(book => book.id === bookId);
        
        if (storedBook) {
          console.log("Libro encontrado en localStorage:", storedBook);
          const extendedBookData = extendBookData(storedBook);
          setBookData(extendedBookData);
        } else if (libroOriginal) {
          console.log("Libro original encontrado:", libroOriginal);
          const extendedBookData = extendBookData(libroOriginal);
          setBookData(extendedBookData);
          
          // Save to storage for future access
          const updatedBooks = [...storedBooks, extendedBookData];
          setStoredBooks(updatedBooks);
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

    fetchBook();
  }, [bookId, libroOriginal, storedBooks, setStoredBooks, extendBookData]);

  return {
    bookData,
    setBookData,
    loading,
    error,
    bookId,
    libroOriginal,
    storedBooks,
    setStoredBooks
  };
};
