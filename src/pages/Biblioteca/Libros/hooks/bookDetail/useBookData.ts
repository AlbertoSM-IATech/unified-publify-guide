
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { librosSimulados } from "../../utils/librosUtils";
import { Book } from "../../types/bookTypes";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useBookExtension } from "./useBookExtension";
import { DEFAULT_COVER_URL } from "@/services/supabase/books/constants"; // Importar DEFAULT_COVER_URL

export const useBookData = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookData, setBookData] = useState<Book | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [storedBooks, setStoredBooks] = useLocalStorage<Book[]>('librosData', librosSimulados);
  const { extendBookData } = useBookExtension();
  
  const bookId = id ? parseInt(id) : null;
  // Find original book from the initial mock list if not in storedBooks (localStorage)
  // This libroOriginal might not have the forced default URL yet if it's purely from mockData.ts
  const initialMockBook = bookId ? librosSimulados.find((libro) => libro.id === bookId) : null;


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
        
        let foundBook: Book | null | undefined = storedBooks.find(book => book.id === bookId);
        
        if (!foundBook && initialMockBook) {
            console.log("Libro encontrado en datos simulados iniciales, no en localStorage aún:", initialMockBook);
            foundBook = initialMockBook;
        }

        if (foundBook) {
          console.log("Libro encontrado:", foundBook.titulo);
          // Force default cover URL for display
          const bookWithForcedCover = {
            ...foundBook,
            imageUrl: DEFAULT_COVER_URL,
            portadaUrl: DEFAULT_COVER_URL,
          };
          const extendedBookData = extendBookData(bookWithForcedCover);
          setBookData(extendedBookData);

          // Ensure the version in localStorage also has the forced default cover
          // This aligns with how the main useBookData hook saves data
          const updatedStoredBooks = storedBooks.map(b => 
            b.id === bookId ? { ...b, imageUrl: DEFAULT_COVER_URL, portadaUrl: DEFAULT_COVER_URL } : b
          );
          // If the book was from initialMockBook and not in storedBooks, add it with forced default.
          if (!storedBooks.find(b => b.id === bookId) && initialMockBook) {
             updatedStoredBooks.push({
                ...initialMockBook,
                imageUrl: DEFAULT_COVER_URL,
                portadaUrl: DEFAULT_COVER_URL,
             });
          }
          // Only update if there was a change or if it was sourced from initial mocks.
          // This check prevents unnecessary writes if data is already consistent.
          if (JSON.stringify(storedBooks.find(b => b.id === bookId)) !== JSON.stringify(extendedBookData) || 
             (initialMockBook && !storedBooks.find(b => b.id === bookId)) ) {
            const bookToStoreIdx = updatedStoredBooks.findIndex(b => b.id === bookId);
            if (bookToStoreIdx !== -1) {
                updatedStoredBooks[bookToStoreIdx] = extendedBookData; // Use extended data as it's what's displayed
            } else if (initialMockBook) { // If it came from mocks and wasn't in storedBooks
                updatedStoredBooks.push(extendedBookData);
            }
            setStoredBooks(updatedStoredBooks);
          }

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
  }, [bookId, storedBooks, setStoredBooks, extendBookData, initialMockBook]); // Added initialMockBook to dependencies

  return {
    bookData,
    setBookData,
    loading,
    error,
    bookId,
    // Remove libroOriginal from return as its role is covered by initialMockBook and storedBooks logic
    storedBooks,
    setStoredBooks
  };
};

