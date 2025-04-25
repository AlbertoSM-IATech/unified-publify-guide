
import { Book } from "@/pages/Biblioteca/Libros/types/bookTypes";
import { supabaseCore } from "./core";
import { librosSimulados } from "@/pages/Biblioteca/Libros/utils/mockData/librosData";
import { toast } from "@/hooks/use-toast";

export const booksService = {
  getAll: async (): Promise<Book[]> => {
    console.log("[MOCK] Getting all books from localStorage");
    
    // Return from localStorage if available
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      const books = JSON.parse(storedBooks);
      return books.map((book: Book) => ({
        ...book,
        imageUrl: book.imageUrl || book.portadaUrl || "/placeholders/default-book-cover.png"
      }));
    }
    
    // Mock data as a fallback
    console.log("[MOCK] No books in localStorage, using mock data");
    const mocksWithImages = librosSimulados.map(book => ({
      ...book,
      imageUrl: book.imageUrl || book.portadaUrl || "/placeholders/default-book-cover.png"
    }));
    localStorage.setItem('librosData', JSON.stringify(mocksWithImages));
    return mocksWithImages;
  },
  
  getById: async (id: number): Promise<Book | null> => {
    console.log(`[MOCK] Getting book with ID ${id} from localStorage`);
    
    // Return from localStorage if available
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      const books = JSON.parse(storedBooks) as Book[];
      const book = books.find(book => book.id === id);
      if (book) {
        // Ensure book has image URL
        return {
          ...book,
          imageUrl: book.imageUrl || book.portadaUrl || "/placeholders/default-book-cover.png"
        };
      }
      return null;
    }
    
    // Mock data as a fallback
    console.log("[MOCK] No books in localStorage, using mock data");
    const mocksWithImages = librosSimulados.map(book => ({
      ...book,
      imageUrl: book.imageUrl || book.portadaUrl || "/placeholders/default-book-cover.png"
    }));
    localStorage.setItem('librosData', JSON.stringify(mocksWithImages));
    
    const book = mocksWithImages.find(book => book.id === id);
    return book || null;
  },
  
  create: async (book: Omit<Book, 'id'>): Promise<Book | null> => {
    console.log("[MOCK] Creating new book in localStorage");
    
    // Use localStorage
    const storedBooks = localStorage.getItem('librosData');
    let books: Book[] = [];
    
    if (storedBooks) {
      books = JSON.parse(storedBooks);
    } else {
      // Get mock data if there are no stored books
      books = [...librosSimulados];
    }
    
    // Generate a new ID
    const newId = Math.max(0, ...books.map(b => b.id)) + 1;
    
    // Ensure imageUrl is set
    const bookWithImage = {
      ...book,
      id: newId,
      imageUrl: book.imageUrl || book.portadaUrl || "/placeholders/default-book-cover.png"
    } as Book;
    
    // Add to books array
    books.push(bookWithImage);
    
    // Save to localStorage
    localStorage.setItem('librosData', JSON.stringify(books));
    
    // Notify with toast
    toast({
      title: "Libro creado",
      description: "El libro ha sido creado exitosamente",
    });
    
    // Notify other components about the update
    const updateEvent = new CustomEvent('publify_books_updated');
    window.dispatchEvent(updateEvent);
    
    return bookWithImage;
  },
  
  update: async (id: number, bookData: Partial<Book>): Promise<Book | null> => {
    console.log(`[MOCK] Updating book with ID ${id} in localStorage`);
    
    // Use localStorage
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      const books = JSON.parse(storedBooks) as Book[];
      const index = books.findIndex(book => book.id === id);
      
      if (index !== -1) {
        // Update the book and ensure imageUrl consistency
        const updatedBook = { 
          ...books[index], 
          ...bookData,
          imageUrl: bookData.imageUrl || bookData.portadaUrl || books[index].imageUrl || books[index].portadaUrl || "/placeholders/default-book-cover.png"
        };
        
        // If imageUrl was updated, also update portadaUrl for consistency
        if (bookData.imageUrl && !bookData.portadaUrl) {
          updatedBook.portadaUrl = bookData.imageUrl;
        } else if (bookData.portadaUrl && !bookData.imageUrl) {
          updatedBook.imageUrl = bookData.portadaUrl;
        }
        
        books[index] = updatedBook;
        
        // Save to localStorage
        localStorage.setItem('librosData', JSON.stringify(books));
        
        // Notify with toast
        toast({
          title: "Libro actualizado",
          description: "El libro ha sido actualizado exitosamente",
        });
        
        // Notify other components about the update
        const updateEvent = new CustomEvent('publify_books_updated');
        window.dispatchEvent(updateEvent);
        
        return updatedBook;
      }
    }
    return null;
  },
  
  delete: async (id: number): Promise<boolean> => {
    console.log(`[MOCK] Deleting book with ID ${id} from localStorage`);
    
    // Use localStorage
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      const books = JSON.parse(storedBooks) as Book[];
      const filteredBooks = books.filter(book => book.id !== id);
      
      // Save to localStorage
      localStorage.setItem('librosData', JSON.stringify(filteredBooks));
      
      // Notify with toast
      toast({
        title: "Libro eliminado",
        description: "El libro ha sido eliminado exitosamente",
      });
      
      // Notify other components about the update
      const updateEvent = new CustomEvent('publify_books_updated');
      window.dispatchEvent(updateEvent);
      
      return true;
    }
    return false;
  },
  
  // Upload a book cover image - use consistent URL path
  uploadCover: async (_bookId: number, _file: File): Promise<string> => {
    console.log("[MOCK] Uploading book cover image (simulated)");
    
    // Return default cover URL
    const defaultCoverUrl = "/placeholders/default-book-cover.png";
    
    // Simulate a delay for realism
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Notify with toast
    toast({
      title: "Imagen subida",
      description: "La portada del libro ha sido actualizada",
    });
    
    return defaultCoverUrl;
  }
};
