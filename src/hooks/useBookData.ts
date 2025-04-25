
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
        // Ensure all books have imageUrl set correctly
        const parsedBooks = JSON.parse(storedBooks);
        const booksWithImages = parsedBooks.map(book => ({
          ...book,
          imageUrl: book.imageUrl || book.portadaUrl || "/placeholders/default-book-cover.png",
          portadaUrl: book.portadaUrl || book.imageUrl || "/placeholders/default-book-cover.png"
        }));
        
        setBooks(booksWithImages);
        console.info('[useBookData] Books loaded from localStorage with images normalized');
        
        // Update localStorage with normalized image URLs
        localStorage.setItem('librosData', JSON.stringify(booksWithImages));
      } else {
        // Fall back to mock data if nothing in localStorage
        // Ensure all mock books have imageUrl
        const mocksWithImages = librosSimulados.map(book => ({
          ...book,
          imageUrl: book.imageUrl || book.portadaUrl || "/placeholders/default-book-cover.png",
          portadaUrl: book.portadaUrl || book.imageUrl || "/placeholders/default-book-cover.png"
        }));
        
        setBooks(mocksWithImages);
        console.info('[useBookData] Using mock book data with images normalized');
        
        // Save mock data to localStorage for future use
        localStorage.setItem('librosData', JSON.stringify(mocksWithImages));
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
