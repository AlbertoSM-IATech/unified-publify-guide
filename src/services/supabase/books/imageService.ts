
import { Book } from "@/pages/Biblioteca/Libros/types/bookTypes";
import { DEFAULT_COVER_URL } from "./constants";

export const imageService = {
  ensureBookImages: (book: Partial<Book>) => ({
    ...book,
    imageUrl: book.imageUrl || book.portadaUrl || DEFAULT_COVER_URL,
    portadaUrl: book.portadaUrl || book.imageUrl || DEFAULT_COVER_URL
  }),

  uploadCover: async (_bookId: number, _file: File): Promise<string> => {
    console.log("[MOCK] Uploading book cover image (simulated)");
    await new Promise(resolve => setTimeout(resolve, 500));
    return DEFAULT_COVER_URL;
  }
};
