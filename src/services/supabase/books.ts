
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
      return JSON.parse(storedBooks);
    }
    
    // Mock data as a fallback
    console.log("[MOCK] No books in localStorage, using mock data");
    localStorage.setItem('librosData', JSON.stringify(librosSimulados));
    return librosSimulados;
  },
  
  getById: async (id: number): Promise<Book | null> => {
    console.log(`[MOCK] Getting book with ID ${id} from localStorage`);
    
    // Return from localStorage if available
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      const books = JSON.parse(storedBooks) as Book[];
      return books.find(book => book.id === id) || null;
    }
    
    // Mock data as a fallback
    console.log("[MOCK] No books in localStorage, using mock data");
    localStorage.setItem('librosData', JSON.stringify(librosSimulados));
    return librosSimulados.find(book => book.id === id) || null;
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
    const newBook = { ...book, id: newId } as Book;
    
    // Add to books array
    books.push(newBook);
    
    // Save to localStorage
    localStorage.setItem('librosData', JSON.stringify(books));
    
    // Notify with toast
    toast({
      title: "Libro creado",
      description: "El libro ha sido creado exitosamente",
    });
    
    return newBook;
  },
  
  update: async (id: number, bookData: Partial<Book>): Promise<Book | null> => {
    console.log(`[MOCK] Updating book with ID ${id} in localStorage`);
    
    // Use localStorage
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      const books = JSON.parse(storedBooks) as Book[];
      const index = books.findIndex(book => book.id === id);
      
      if (index !== -1) {
        // Update the book
        const updatedBook = { ...books[index], ...bookData };
        books[index] = updatedBook;
        
        // Save to localStorage
        localStorage.setItem('librosData', JSON.stringify(books));
        
        // Notify with toast
        toast({
          title: "Libro actualizado",
          description: "El libro ha sido actualizado exitosamente",
        });
        
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
      
      return true;
    }
    return false;
  },
  
  // Upload a book cover image - always return the default image
  uploadCover: async (_bookId: number, _file: File): Promise<string> => {
    console.log("[MOCK] Uploading book cover image (simulated)");
    
    // Return fixed URL as requested
    const defaultCoverUrl = "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg";
    
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
