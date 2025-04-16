
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
    setIsLoading(true);
    setLoadError(null);
    
    try {
      // Check localStorage first for previously saved books
      const storedBooks = localStorage.getItem('librosData');
      if (storedBooks) {
        console.log("Books loaded from localStorage");
        setLibros(JSON.parse(storedBooks));
      } else {
        console.log("No books found in localStorage, using mock data");
        setLibros(librosSimulados);
        // Save mock data to localStorage for persistence
        localStorage.setItem('librosData', JSON.stringify(librosSimulados));
      }
    } catch (error) {
      console.error("Error loading books:", error);
      setLoadError("No se pudieron cargar los libros. Usando datos locales.");
      
      // Fallback to mock data
      setLibros(librosSimulados);
      localStorage.setItem('librosData', JSON.stringify(librosSimulados));
    } finally {
      setIsLoading(false);
    }
  }, [setLibros]);

  // Load books on component mount
  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  // Handler for retrying loading if there was an error
  const handleRetryLoading = useCallback(() => {
    loadBooks();
  }, [loadBooks]);

  // Create book handler
  const handleCreateBook = useCallback(async (newBook: Book) => {
    try {
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
      console.error("Error creating book:", error);
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
