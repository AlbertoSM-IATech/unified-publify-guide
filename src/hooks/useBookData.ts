import { useState, useEffect, useCallback } from 'react';
import { librosSimulados } from '@/pages/Biblioteca/Libros/utils/librosUtils';
import { DEFAULT_COVER_URL } from '@/services/supabase/books/constants';

export function useBookData() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Load books data from localStorage or mock data
  const loadBooks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check localStorage first
      const storedBooks = localStorage.getItem('librosData');
      
      if (storedBooks) {
        const parsedBooks = JSON.parse(storedBooks);
        // Force all books to use DEFAULT_COVER_URL
        const booksWithForcedDefaultCover = parsedBooks.map(book => ({
          ...book,
          imageUrl: DEFAULT_COVER_URL,
          portadaUrl: DEFAULT_COVER_URL
        }));
        
        setBooks(booksWithForcedDefaultCover);
        console.info('[useBookData] Books loaded from localStorage with images forced to default');
        
        // Update localStorage with forced default image URLs
        localStorage.setItem('librosData', JSON.stringify(booksWithForcedDefaultCover));
      } else {
        // Fall back to mock data if nothing in localStorage
        // Force all mock books to use DEFAULT_COVER_URL
        const mocksWithForcedDefaultCover = librosSimulados.map(book => ({
          ...book,
          imageUrl: DEFAULT_COVER_URL,
          portadaUrl: DEFAULT_COVER_URL
        }));
        
        setBooks(mocksWithForcedDefaultCover);
        console.info('[useBookData] Using mock book data with images forced to default');
        
        // Save mock data (with forced default images) to localStorage for future use
        localStorage.setItem('librosData', JSON.stringify(mocksWithForcedDefaultCover));
      }
    } catch (error) {
      console.error('Error loading books:', error);
      setError('Error al cargar los libros');
      setBooks([]);
    } finally {
      setIsLoading(false);
      setLastUpdated(Date.now());
    }
  }, []);

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
