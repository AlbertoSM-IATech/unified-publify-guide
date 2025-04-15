
import { Book } from "@/pages/Biblioteca/Libros/types/bookTypes";
import { supabaseCore } from "./core";
import { supabase } from "./client";
import { canConnectToSupabase } from "./client";
import { toast } from "@/hooks/use-toast";

export const booksService = {
  getAll: async (): Promise<Book[]> => {
    if (!canConnectToSupabase()) {
      // Return from localStorage if available
      const storedBooks = localStorage.getItem('librosData');
      if (storedBooks) {
        return JSON.parse(storedBooks);
      }
      
      // Mock data as a fallback
      const { librosSimulados } = await import('@/pages/Biblioteca/Libros/utils/mockData/librosData');
      return librosSimulados;
    }
    
    return supabaseCore.getData<Book>('libros');
  },
  
  getById: async (id: number): Promise<Book | null> => {
    if (!canConnectToSupabase()) {
      // Return from localStorage if available
      const storedBooks = localStorage.getItem('librosData');
      if (storedBooks) {
        const books = JSON.parse(storedBooks) as Book[];
        return books.find(book => book.id === id) || null;
      }
      
      // Mock data as a fallback
      const { librosSimulados } = await import('@/pages/Biblioteca/Libros/utils/mockData/librosData');
      return librosSimulados.find(book => book.id === id) || null;
    }
    
    return supabaseCore.getById<Book>('libros', id);
  },
  
  create: async (book: Omit<Book, 'id'>): Promise<Book | null> => {
    if (!canConnectToSupabase()) {
      // Use localStorage
      const storedBooks = localStorage.getItem('librosData');
      let books: Book[] = [];
      
      if (storedBooks) {
        books = JSON.parse(storedBooks);
      } else {
        // Get mock data if there are no stored books
        const { librosSimulados } = await import('@/pages/Biblioteca/Libros/utils/mockData/librosData');
        books = librosSimulados;
      }
      
      // Generate a new ID
      const newId = Math.max(0, ...books.map(b => b.id)) + 1;
      const newBook = { ...book, id: newId } as Book;
      
      // Add to books array
      books.push(newBook);
      
      // Save to localStorage
      localStorage.setItem('librosData', JSON.stringify(books));
      
      return newBook;
    }
    
    return supabaseCore.create<Book>('libros', book);
  },
  
  update: async (id: number, bookData: Partial<Book>): Promise<Book | null> => {
    if (!canConnectToSupabase()) {
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
          
          return updatedBook;
        }
      }
      return null;
    }
    
    return supabaseCore.update<Book>('libros', id, bookData);
  },
  
  delete: async (id: number): Promise<boolean> => {
    if (!canConnectToSupabase()) {
      // Use localStorage
      const storedBooks = localStorage.getItem('librosData');
      if (storedBooks) {
        const books = JSON.parse(storedBooks) as Book[];
        const filteredBooks = books.filter(book => book.id !== id);
        
        // Save to localStorage
        localStorage.setItem('librosData', JSON.stringify(filteredBooks));
        
        return true;
      }
      return false;
    }
    
    return supabaseCore.delete('libros', id);
  },
  
  // Upload a book cover image
  uploadCover: async (bookId: number, file: File): Promise<string | null> => {
    try {
      // Check if we can connect to Supabase
      if (!canConnectToSupabase()) {
        console.log(`Using local storage for book cover image (Supabase not configured)`);
        
        // Convert the file to a data URL for localStorage
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              const dataUrl = e.target.result.toString();
              
              // Update the book in localStorage
              const storedBooks = localStorage.getItem('librosData');
              if (storedBooks) {
                const books = JSON.parse(storedBooks) as Book[];
                const index = books.findIndex(book => book.id === bookId);
                
                if (index !== -1) {
                  books[index].imageUrl = dataUrl;
                  localStorage.setItem('librosData', JSON.stringify(books));
                }
              }
              
              resolve(dataUrl);
            } else {
              resolve(null);
            }
          };
          reader.readAsDataURL(file);
        });
      }
      
      // Upload to Supabase Storage
      const filePath = `book_covers/${bookId}/${file.name}`;
      const { data, error } = await supabase.storage
        .from('books')
        .upload(filePath, file, {
          upsert: true,
        });
        
      if (error) {
        throw new Error(`Error uploading book cover: ${error.message}`);
      }
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('books')
        .getPublicUrl(filePath);
        
      const imageUrl = publicUrlData.publicUrl;
      
      // Update the book with the new image URL
      await supabaseCore.update('libros', bookId, { imageUrl });
      
      return imageUrl;
    } catch (error) {
      console.error('Error uploading book cover:', error);
      return null;
    }
  }
};
