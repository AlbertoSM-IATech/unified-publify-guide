
import { useState, useEffect } from "react";
import { Book } from "../types/bookTypes";
import { librosSimulados } from "../utils/librosUtils";
import { booksService } from "@/services/supabase/books";
import { toast } from "@/hooks/use-toast";

interface FilterParams {
  estado?: string;
  contenido?: string;
  autor?: string;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: string;
}

/**
 * Hook to manage books data with localStorage persistence
 */
export const useBooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setError] = useState<string | null>(null);
  const [libros, setLibros] = useState<Book[]>([]);
  const [filteredLibros, setFilteredLibros] = useState<Book[]>([]);
  const [filters, setFilters] = useState<FilterParams>({});
  
  // Load books from localStorage
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setIsLoading(true);
        
        // Check localStorage first
        const storedBooks = localStorage.getItem('librosData');
        
        if (storedBooks) {
          console.info('[MOCK] Books loaded from localStorage');
          setLibros(JSON.parse(storedBooks));
        } else {
          // Fall back to mock data if nothing in localStorage
          console.info('[MOCK] No books in localStorage, using mock data');
          setLibros(librosSimulados);
          
          // Save mock data to localStorage for future use
          localStorage.setItem('librosData', JSON.stringify(librosSimulados));
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading books:', error);
        setError('Error al cargar los libros');
        setIsLoading(false);
      }
    };
    
    loadBooks();
  }, []);

  // Filter and sort books when filters or books change
  useEffect(() => {
    if (!libros.length) return;
    
    let result = [...libros];
    
    // Apply filters
    if (filters.estado) {
      result = result.filter(libro => libro.estado === filters.estado);
    }
    
    if (filters.contenido) {
      result = result.filter(libro => libro.contenido === filters.contenido);
    }
    
    if (filters.autor) {
      result = result.filter(libro => libro.autor === filters.autor);
    }
    
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(libro => 
        libro.titulo.toLowerCase().includes(term) || 
        (libro.subtitulo && libro.subtitulo.toLowerCase().includes(term)) ||
        libro.autor.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      const sortOrder = filters.sortOrder === 'desc' ? -1 : 1;
      result.sort((a, b) => {
        const aValue = a[filters.sortBy as keyof Book];
        const bValue = b[filters.sortBy as keyof Book];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder * aValue.localeCompare(bValue);
        } else if (filters.sortBy === 'fechaPublicacion') {
          const dateA = a.fechaPublicacion ? new Date(a.fechaPublicacion).getTime() : 0;
          const dateB = b.fechaPublicacion ? new Date(b.fechaPublicacion).getTime() : 0;
          return sortOrder * (dateA - dateB);
        } else {
          return 0;
        }
      });
    }
    
    setFilteredLibros(result);
  }, [libros, filters]);

  // Function to update filters
  const updateFilters = (newFilters: Partial<FilterParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  // Function to retry loading books
  const handleRetryLoading = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Attempt to load books from service
      const books = await booksService.getAll();
      setLibros(books);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error retrying book load:', error);
      setError('Error al reintentar cargar los libros');
      setIsLoading(false);
    }
  };

  // Function to create a new book
  const handleCreateBook = async (newBook: Omit<Book, 'id'>): Promise<boolean> => {
    try {
      const createdBook = await booksService.create(newBook);
      
      if (createdBook) {
        // Update local state with the new book
        setLibros(prevBooks => [...prevBooks, createdBook]);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error creating book:', error);
      toast({
        title: "Error",
        description: "No se pudo crear el libro",
        variant: "destructive"
      });
      return false;
    }
  };

  return {
    libros,
    filteredLibros,
    isLoading,     // Renamed from loading to isLoading
    loadError,     // Renamed from error to loadError
    updateFilters,
    filters,
    handleRetryLoading, // Added this function
    handleCreateBook    // Added this function
  };
};
