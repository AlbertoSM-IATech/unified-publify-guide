
import { Book } from "@/pages/Biblioteca/Libros/types/bookTypes";
import { toast } from "@/hooks/use-toast";
import { imageService } from "./books/imageService";
import { storageService } from "./books/storageService";

export const booksService = {
  getAll: async (): Promise<Book[]> => {
    console.log("[MOCK] Getting all books from localStorage");
    
    const storedBooks = storageService.loadFromStorage();
    if (storedBooks) {
      return storedBooks;
    }
    
    console.log("[MOCK] No books in localStorage, using mock data");
    return storageService.getInitialBooks();
  },
  
  getById: async (id: number): Promise<Book | null> => {
    console.log(`[MOCK] Getting book with ID ${id} from localStorage`);
    
    const storedBooks = storageService.loadFromStorage();
    if (storedBooks) {
      const book = storedBooks.find(book => book.id === id);
      if (book) {
        return imageService.ensureBookImages(book);
      }
      return null;
    }
    
    console.log("[MOCK] No books in localStorage, using mock data");
    const mocksWithImages = storageService.getInitialBooks();
    return mocksWithImages.find(book => book.id === id) || null;
  },
  
  create: async (book: Omit<Book, 'id'>): Promise<Book | null> => {
    console.log("[MOCK] Creating new book in localStorage");
    
    const storedBooks = storageService.loadFromStorage() || storageService.getInitialBooks();
    
    const newId = Math.max(0, ...storedBooks.map(b => b.id)) + 1;
    // Create a new book with the required id property
    const newBook: Book = {
      ...book,
      id: newId,
      imageUrl: book.imageUrl || book.portadaUrl || "", // Ensure required fields have values
      portadaUrl: book.portadaUrl || book.imageUrl || ""
    };
    
    const bookWithImage = imageService.ensureBookImages(newBook);
    
    storedBooks.push(bookWithImage);
    storageService.saveToStorage(storedBooks);
    
    toast({
      title: "Libro creado",
      description: "El libro ha sido creado exitosamente",
    });
    
    const updateEvent = new CustomEvent('publify_books_updated');
    window.dispatchEvent(updateEvent);
    
    return bookWithImage;
  },
  
  update: async (id: number, bookData: Partial<Book>): Promise<Book | null> => {
    console.log(`[MOCK] Updating book with ID ${id} in localStorage`);
    
    const storedBooks = storageService.loadFromStorage();
    if (!storedBooks) return null;
    
    const index = storedBooks.findIndex(book => book.id === id);
    if (index === -1) return null;
    
    const updatedBook = imageService.ensureBookImages({ 
      ...storedBooks[index], 
      ...bookData 
    }) as Book;
    
    storedBooks[index] = updatedBook;
    storageService.saveToStorage(storedBooks);
    
    toast({
      title: "Libro actualizado",
      description: "El libro ha sido actualizado exitosamente",
    });
    
    const updateEvent = new CustomEvent('publify_books_updated');
    window.dispatchEvent(updateEvent);
    
    return updatedBook;
  },
  
  delete: async (id: number): Promise<boolean> => {
    console.log(`[MOCK] Deleting book with ID ${id} from localStorage`);
    
    const storedBooks = storageService.loadFromStorage();
    if (!storedBooks) return false;
    
    const filteredBooks = storedBooks.filter(book => book.id !== id);
    storageService.saveToStorage(filteredBooks);
    
    toast({
      title: "Libro eliminado",
      description: "El libro ha sido eliminado exitosamente",
    });
    
    const updateEvent = new CustomEvent('publify_books_updated');
    window.dispatchEvent(updateEvent);
    
    return true;
  },
  
  uploadCover: imageService.uploadCover
};
