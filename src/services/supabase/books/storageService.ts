
import { Book } from "@/pages/Biblioteca/Libros/types/bookTypes";
import { librosSimulados } from "@/pages/Biblioteca/Libros/utils/mockData/librosData";
import { imageService } from "./imageService";

export const storageService = {
  loadFromStorage: (): Book[] | null => {
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      try {
        const books = JSON.parse(storedBooks);
        // Ensure each book has the required properties
        return books.map((book: Book) => imageService.ensureBookImages(book));
      } catch (e) {
        console.error("Error parsing stored books:", e);
        return null;
      }
    }
    return null;
  },

  saveToStorage: (books: Book[]): void => {
    localStorage.setItem('librosData', JSON.stringify(books));
  },

  getInitialBooks: (): Book[] => {
    // Ensure the mock data has all required properties including id
    const mocksWithImages = librosSimulados.map(book => imageService.ensureBookImages(book));
    localStorage.setItem('librosData', JSON.stringify(mocksWithImages));
    return mocksWithImages;
  }
};
