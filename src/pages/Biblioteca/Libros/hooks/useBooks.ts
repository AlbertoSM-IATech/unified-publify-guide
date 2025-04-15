
import { useState, useCallback, useEffect } from "react";
import { Book } from "../types/bookTypes";
import { useSyncedData } from "@/hooks/useSyncedData";
import { toast } from "@/hooks/use-toast";
import { supabaseService } from "@/services/supabase";
import { librosSimulados } from "../utils/mockData/librosData";

export const useBooks = () => {
  const [libros, setLibros] = useSyncedData<Book[]>([], "librosData");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadBooks = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    
    try {
      // Try to fetch from Supabase
      const supabaseBooks = await supabaseService.books.getAll();
      
      // If we get books from Supabase, use them
      if (supabaseBooks && supabaseBooks.length > 0) {
        console.log("Books loaded from Supabase:", supabaseBooks);
        setLibros(supabaseBooks);
      } else {
        console.log("No books found in Supabase, using mock data");
        // Check localStorage first
        const storedBooks = localStorage.getItem('librosData');
        if (storedBooks) {
          setLibros(JSON.parse(storedBooks));
        } else {
          setLibros(librosSimulados);
          // Save mock data to localStorage for persistence
          localStorage.setItem('librosData', JSON.stringify(librosSimulados));
        }
      }
    } catch (error) {
      console.error("Error loading books:", error);
      setLoadError("No se pudieron cargar los libros. Usando datos locales.");
      
      // Fallback to localStorage and then to mock data
      const storedBooks = localStorage.getItem('librosData');
      if (storedBooks) {
        setLibros(JSON.parse(storedBooks));
      } else {
        setLibros(librosSimulados);
        localStorage.setItem('librosData', JSON.stringify(librosSimulados));
      }
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
    setLoadError(null);
    setIsLoading(true);
    // Use setTimeout to avoid infinite loop if error persists
    setTimeout(() => {
      // Set libros directly from mock data
      setLibros(librosSimulados);
      // Save mock data to localStorage for persistence
      localStorage.setItem('librosData', JSON.stringify(librosSimulados));
      setIsLoading(false);
    }, 500);
  }, [setLibros]);

  // Create book handler
  const handleCreateBook = useCallback(async (newBook: Book) => {
    try {
      // Try to create in Supabase
      const createdBook = await supabaseService.books.create(newBook);
      
      let bookToAdd = newBook;
      if (createdBook) {
        console.log("Book created in Supabase:", createdBook);
        bookToAdd = createdBook;
      }
      
      // Update local state
      const updatedBooks = [...libros, bookToAdd];
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
      // Still update local state even if Supabase fails
      const updatedBooks = [...libros, newBook];
      setLibros(updatedBooks);
      localStorage.setItem('librosData', JSON.stringify(updatedBooks));
      
      toast({
        title: "Libro creado (modo local)",
        description: `El libro "${newBook.titulo}" ha sido creado localmente.`
      });
      
      return true;
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
