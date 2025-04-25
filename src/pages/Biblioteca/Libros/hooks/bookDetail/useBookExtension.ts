
import { Book } from "../../types/bookTypes";
import { useDefaultFormats } from "./useDefaultFormats";

export const useBookExtension = () => {
  const {
    createDefaultHardcoverFormat,
    createDefaultPaperbackFormat,
    createDefaultEbookFormat,
    createDefaultNotes
  } = useDefaultFormats();

  const extendBookData = (originalBook: Book | null): Book | null => {
    if (!originalBook) return null;
    
    return {
      ...originalBook,
      subtitulo: originalBook.subtitulo || "", 
      descripcion: originalBook.descripcion || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      descripcionHtml: originalBook.descripcionHtml || "",
      bsr: originalBook.bsr || null,
      fechaLanzamiento: originalBook.fechaLanzamiento || null,
      landingPageUrl: originalBook.landingPageUrl || "",
      contenidoAPlus: originalBook.contenidoAPlus || "",
      contenidoAPlusFiles: originalBook.contenidoAPlusFiles || [],
      imageUrl: originalBook.imageUrl || originalBook.portadaUrl || "/placeholders/portada-ejemplo.jpg",
      portadaUrl: originalBook.portadaUrl || originalBook.imageUrl || "/placeholders/portada-ejemplo.jpg",
      hardcover: originalBook.hardcover || createDefaultHardcoverFormat(),
      paperback: originalBook.paperback || createDefaultPaperbackFormat(),
      ebook: originalBook.ebook || createDefaultEbookFormat(),
      notes: originalBook.notes || createDefaultNotes()
    };
  };

  return { extendBookData };
};
