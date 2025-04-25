
import { BookFormat, BookNote } from "../../types/bookTypes";

export const useDefaultFormats = () => {
  const createDefaultHardcoverFormat = (): BookFormat => ({
    dimensions: "15.24 x 22.86 cm",
    isbn: "978-1234567890",
    asin: "B01ABCDEFG",
    pages: 300,
    price: 24.99,
    royaltyPercentage: 0.60,
    printingCost: 5.50,
    files: [
      { id: 1, name: "manuscrito.pdf", type: "document" },
      { id: 2, name: "portada.jpg", type: "image" },
    ],
    links: {
      amazon: "https://amazon.com/book1",
      landingPage: "https://miweb.com/libro1"
    },
    strategy: "Enfocarse en ventas directas y posicionamiento en Amazon.",
  });

  const createDefaultPaperbackFormat = (): BookFormat => ({
    dimensions: "12.7 x 20.32 cm",
    isbn: "978-0987654321",
    asin: "B09HIJKLMN",
    pages: 300,
    price: 14.99,
    royaltyPercentage: 0.70,
    printingCost: 3.20,
    links: {
      amazon: "https://amazon.com/book1-paperback",
    }
  });

  const createDefaultEbookFormat = (): BookFormat => ({
    asin: "B01234ABCD",
    price: 9.99,
    royaltyPercentage: 0.70,
    printingCost: 0,
    links: {
      amazon: "https://amazon.com/book1-kindle",
    }
  });

  const createDefaultNotes = (): BookNote[] => ([
    { id: 1, text: "Contactar a diseñador para mejorar la portada", date: "2023-11-15" },
    { id: 2, text: "Verificar disponibilidad en tiendas físicas", date: "2023-10-30" },
  ]);

  return {
    createDefaultHardcoverFormat,
    createDefaultPaperbackFormat,
    createDefaultEbookFormat,
    createDefaultNotes
  };
};
