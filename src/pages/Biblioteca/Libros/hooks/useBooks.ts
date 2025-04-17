
import { useState, useCallback, useEffect } from "react";
import { Book } from "../types/bookTypes";
import { useSyncedData } from "@/hooks/useSyncedData";
import { toast } from "@/hooks/use-toast";
import { librosSimulados } from "../utils/mockData/librosData";

export const useBooks = () => {
  const [libros, setLibros] = useSyncedData<Book[]>([], "librosData");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadBooks = useCallback(() => {
    if (!isLoading) return; // Prevent multiple loads
    
    try {
      // Check localStorage first for previously saved books
      const storedBooks = localStorage.getItem('librosData');
      if (storedBooks) {
        console.log("[MOCK] Books loaded from localStorage");
        setLibros(JSON.parse(storedBooks));
      } else {
        console.log("[MOCK] No books found in localStorage, using mock data");
        setLibros(librosSimulados);
        // Save mock data to localStorage for persistence
        localStorage.setItem('librosData', JSON.stringify(librosSimulados));
      }
    } catch (error) {
      console.error("[MOCK] Error loading books:", error);
      setLoadError("No se pudieron cargar los libros. Usando datos locales.");
      
      // Fallback to mock data
      setLibros(librosSimulados);
      localStorage.setItem('librosData', JSON.stringify(librosSimulados));
    } finally {
      setIsLoading(false); // Set loading to false regardless of outcome
    }
  }, [isLoading, setLibros]);

  // Load books on component mount
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Handler for retrying loading if there was an error
  const handleRetryLoading = useCallback(() => {
    setIsLoading(true); // Set loading to true to trigger loadBooks
    loadBooks();
  }, [loadBooks]);

  // Create book handler
  const handleCreateBook = useCallback(async (newBook: Book) => {
    try {
      // Generate new ID (if not provided)
      if (!newBook.id) {
        const maxId = Math.max(0, ...libros.map(book => book.id));
        newBook.id = maxId + 1;
      }

      // Update local state
      const updatedBooks = [...libros, newBook];
      setLibros(updatedBooks);
      
      // Update localStorage for persistence
      localStorage.setItem('librosData', JSON.stringify(updatedBooks));
      
      toast({
        title: "Libro creado",
        description: `El libro "${newBook.titulo}" ha sido creado con éxito.`
      });
      
      return true;
    } catch (error) {
      console.error("[MOCK] Error creating book:", error);
      toast({
        title: "Error",
        description: "No se pudo crear el libro. Inténtalo de nuevo.",
        variant: "destructive"
      });
      
      return false;
    }
  }, [libros, setLibros]);

  return {
    libros,
    isLoading,
    loadError,
    handleRetryLoading,
    handleCreateBook
  };
};
