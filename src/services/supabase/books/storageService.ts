
import { Book } from "@/pages/Biblioteca/Libros/types/bookTypes";
import { librosSimulados } from "@/pages/Biblioteca/Libros/utils/mockData/librosData";
import { imageService } from "./imageService";

export const storageService = {
  loadFromStorage: (): Book[] | null => {
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      const books = JSON.parse(storedBooks);
      return books.map((book: Book) => imageService.ensureBookImages(book));
    }
    return null;
  },

  saveToStorage: (books: Book[]): void => {
    localStorage.setItem('librosData', JSON.stringify(books));
  },

  getInitialBooks: (): Book[] => {
    const mocksWithImages = librosSimulados.map(book => imageService.ensureBookImages(book));
    localStorage.setItem('librosData', JSON.stringify(mocksWithImages));
    return mocksWithImages;
  }
};
