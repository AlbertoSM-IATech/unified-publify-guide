
import { useState, useEffect, useCallback } from 'react';
import { librosSimulados } from '@/pages/Biblioteca/Libros/utils/librosUtils';

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
        setBooks(JSON.parse(storedBooks));
        console.info('[useBookData] Books loaded from localStorage');
      } else {
        // Fall back to mock data if nothing in localStorage
        setBooks(librosSimulados);
        console.info('[useBookData] Using mock book data');
        
        // Save mock data to localStorage for future use
        localStorage.setItem('librosData', JSON.stringify(librosSimulados));
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
    loadBooks();
    
    // Set up event listener for data sync events
    const handleSyncEvent = () => {
      console.log('[useBookData] Detected book update event, refreshing...');
      loadBooks();
    };
    
    window.addEventListener('publify_books_updated', handleSyncEvent);
    
    // Also poll periodically but less frequently
    const interval = setInterval(() => {
      loadBooks();
    }, 5000);
    
    return () => {
      window.removeEventListener('publify_books_updated', handleSyncEvent);
      clearInterval(interval);
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
