
import { useState, useEffect, useCallback } from 'react';
import { Book } from '@/pages/Biblioteca/Libros/types/bookTypes'; // Asegúrate que Book tiene id y titulo
import { librosSimulados } from '@/pages/Biblioteca/Libros/utils/librosUtils';
import { DEFAULT_COVER_URL } from '@/services/supabase/books/constants';

export function useBookData() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  const loadBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const storedBooks = localStorage.getItem('librosData');
      let loadedBooksArray: Book[] | null = null;

      if (storedBooks) {
        try {
          const parsedData = JSON.parse(storedBooks);
          // Validar que parsedData es un array y que los elementos tienen id y titulo
          if (Array.isArray(parsedData) && parsedData.every(item => typeof item.id !== 'undefined' && typeof item.titulo !== 'undefined')) {
            loadedBooksArray = parsedData.map((book: any) => ({ // Usar 'any' temporalmente para el mapeo si la estructura no está garantizada
              ...book,
              id: book.id, // Asegurar que el id se mantiene
              titulo: book.titulo, // Asegurar que el título se mantiene
              imageUrl: DEFAULT_COVER_URL,
              portadaUrl: DEFAULT_COVER_URL,
            }));
            console.info('[useBookData] Books loaded from localStorage with images forced to default');
          } else {
            console.warn('[useBookData] Data in localStorage "librosData" is not a valid array of books. Falling back to mocks.');
            // No hacer nada aquí, permitirá que el siguiente bloque use mocks.
          }
        } catch (parseError) {
          console.warn('[useBookData] Failed to parse "librosData" from localStorage. Falling back to mocks.', parseError);
          // No hacer nada aquí, permitirá que el siguiente bloque use mocks.
        }
      }

      if (loadedBooksArray) {
        setBooks(loadedBooksArray);
      } else {
        // Fall back to mock data si localStorage está vacío, inválido, o el parseo falló.
        const mocksWithForcedDefaultCover = librosSimulados.map(book => ({
          ...book,
          id: book.id, 
          titulo: book.titulo,
          imageUrl: DEFAULT_COVER_URL,
          portadaUrl: DEFAULT_COVER_URL,
        }));
        setBooks(mocksWithForcedDefaultCover);
        
        if (!storedBooks) {
          console.info('[useBookData] Using mock book data (localStorage was empty) with images forced to default.');
        } else {
           console.info('[useBookData] Using mock book data (localStorage was invalid/corrupt or parse failed) with images forced to default.');
        }
        // Opcionalmente, podríamos guardar los mocks en localStorage si estaba corrupto,
        // pero es mejor ser cauteloso para no sobrescribir datos potencialmente importantes del usuario sin su permiso.
        // Si se decide hacer, podría ser: localStorage.setItem('librosData', JSON.stringify(mocksWithForcedDefaultCover));
      }
    } catch (e) { // Catch para errores inesperados durante el proceso general.
      console.error('Error loading books (unexpected):', e);
      setError('Error al cargar los libros');
      // Como último recurso, si todo falla, intentar cargar mocks si no se hizo ya.
      if (!books.length) { // Solo si books aún está vacío
        const mocksWithForcedDefaultCover = librosSimulados.map(book => ({
            ...book,
            id: book.id,
            titulo: book.titulo,
            imageUrl: DEFAULT_COVER_URL,
            portadaUrl: DEFAULT_COVER_URL,
          }));
        setBooks(mocksWithForcedDefaultCover);
        console.error('[useBookData] Using mock book data as a final fallback due to unexpected error.');
      }
    } finally {
      setIsLoading(false);
      setLastUpdated(Date.now());
    }
  }, [books.length]); // books.length en dependencias para re-evaluar si setBooks([]) fue llamado por error

  // Monitor for changes to book data
  useEffect(() => {
    // Initial load
    loadBooks();
    
    // Set up event listener for data sync events
    const handleSyncEvent = () => {
      console.log('[useBookData] Detected book update event, refreshing...');
      loadBooks();
    };
    
    window.addEventListener('publify_books_updated', handleSyncEvent);
    
    return () => {
      window.removeEventListener('publify_books_updated', handleSyncEvent);
    };
  }, [loadBooks]);

  return {
    books,
    isLoading,
    error,
    refresh: loadBooks,
    lastUpdated
  };
}

