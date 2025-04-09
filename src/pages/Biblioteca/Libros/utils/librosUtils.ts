// utils/librosUtils.ts
import { Book } from "../types/bookTypes";

// Function to simulate fetching libros from an API
export const fetchLibros = async (): Promise<Book[]> => {
  // Simulate an API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return librosSimulados;
};

// Function to filter libros based on a search term
export const filterLibros = (libros: Book[], searchTerm: string): Book[] => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return libros.filter((libro) => {
    const lowerTitulo = libro.titulo.toLowerCase();
    const lowerAutor = libro.autor.toLowerCase();
    return lowerTitulo.includes(lowerSearchTerm) || lowerAutor.includes(lowerSearchTerm);
  });
};

// Function to sort libros
export const sortLibros = (libros: Book[], sortBy: string, sortOrder: string): Book[] => {
  const sortedLibros = [...libros]; // Create a copy to avoid mutating the original array

  sortedLibros.sort((a, b) => {
    let comparison = 0;

    if (sortBy === "titulo") {
      comparison = a.titulo.localeCompare(b.titulo);
    } else if (sortBy === "autor") {
      comparison = a.autor.localeCompare(b.autor);
    } else if (sortBy === "fechaPublicacion") {
      const dateA = a.fechaPublicacion ? new Date(a.fechaPublicacion).getTime() : 0;
      const dateB = b.fechaPublicacion ? new Date(b.fechaPublicacion).getTime() : 0;
      comparison = dateA - dateB;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  return sortedLibros;
};

// Get status color class
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "publicado":
      return "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    case "borrador":
      return "bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800";
    case "en revisión":
      return "bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
    case "archivado":
      return "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

// Get content color class
export const getContentColor = (content: string): string => {
  switch (content.toLowerCase()) {
    case "alto contenido":
      return "bg-blue-100 text-[#3B82F6] border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
    case "medio contenido":
      return "bg-orange-100 text-[#FB923C] border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800";
    case "bajo contenido":
      return "bg-emerald-100 text-[#10B981] border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

// Get content hex color for text styling
export const getContentHexColor = (content: string): string => {
  switch (content.toLowerCase()) {
    case "alto contenido":
      return "#3B82F6"; // Blue
    case "medio contenido":
      return "#FB923C"; // Coral/Orange
    case "bajo contenido":
      return "#10B981"; // Green
    default:
      return "#64748b"; // Slate
  }
};

// Simulate data for libros
export const librosSimulados: Book[] = [
  {
    id: 1,
    titulo: "El Hobbit",
    subtitulo: "Un viaje inesperado",
    autor: "J.R.R. Tolkien",
    isbn: "978-0547928227",
    asin: "B0026ORZRQ",
    estado: "Publicado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-01-15",
    imageUrl: "https://m.media-amazon.com/images/I/71jLBXtWJHL._AC_UF1000,1000_QL80_.jpg",
    investigacionId: 1,
    proyectoId: 1,
  },
  {
    id: 2,
    titulo: "Cien años de soledad",
    subtitulo: null,
    autor: "Gabriel García Márquez",
    isbn: "978-0307474728",
    asin: "B000FC1WCG",
    estado: "Borrador",
    contenido: "Medio Contenido",
    fechaPublicacion: "2022-11-01",
    imageUrl: "https://images.penguinrandomhouse.com/cover/9780307474728",
  },
  {
    id: 3,
    titulo: "1984",
    subtitulo: null,
    autor: "George Orwell",
    isbn: "978-0451524935",
    asin: "B000EWN42A",
    estado: "En revisión",
    contenido: "Bajo Contenido",
    fechaPublicacion: "2023-03-20",
    imageUrl: "https://m.media-amazon.com/images/I/61J4pEQFQtL._AC_UF1000,1000_QL80_.jpg",
    investigacionId: 2,
  },
  {
    id: 4,
    titulo: "Orgullo y prejuicio",
    subtitulo: null,
    autor: "Jane Austen",
    isbn: "978-0141439518",
    asin: "B000JQU4PY",
    estado: "Archivado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2022-09-10",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/71Q1tPupnNS.jpg",
    proyectoId: 2,
  },
  {
    id: 5,
    titulo: "Don Quijote de la Mancha",
    subtitulo: null,
    autor: "Miguel de Cervantes",
    isbn: "978-8420405344",
    asin: "B0062D04V4",
    estado: "Publicado",
    contenido: "Medio Contenido",
    fechaPublicacion: "2023-05-01",
    imageUrl: "https://images.cdn2.buscalibre.com/fit-in/360x360/84/20/8420405344.jpg",
  },
  {
    id: 6,
    titulo: "Matar a un ruiseñor",
    subtitulo: null,
    autor: "Harper Lee",
    isbn: "978-0446310789",
    asin: "B000JM4HN2",
    estado: "Borrador",
    contenido: "Bajo Contenido",
    fechaPublicacion: "2022-12-15",
    imageUrl: "https://m.media-amazon.com/images/I/81gekr4DzxL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 7,
    titulo: "El Gran Gatsby",
    subtitulo: null,
    autor: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    asin: "B000FC1IOU",
    estado: "En revisión",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-02-28",
    imageUrl: "https://m.media-amazon.com/images/I/71FTb9Uc7vL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 8,
    titulo: "Crimen y castigo",
    subtitulo: null,
    autor: "Fiódor Dostoievski",
    isbn: "978-0393963865",
    asin: "B000JMLV2C",
    estado: "Archivado",
    contenido: "Medio Contenido",
    fechaPublicacion: "2022-10-01",
    imageUrl: "https://images.penguinrandomhouse.com/cover/9780393963865",
  },
  {
    id: 9,
    titulo: "Ulises",
    subtitulo: null,
    autor: "James Joyce",
    isbn: "978-0679722762",
    asin: "B000JQU5V4",
    estado: "Publicado",
    contenido: "Bajo Contenido",
    fechaPublicacion: "2023-04-10",
    imageUrl: "https://m.media-amazon.com/images/I/51ceqjW4K-L._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 10,
    titulo: "Hamlet",
    subtitulo: null,
    autor: "William Shakespeare",
    isbn: "978-0743477123",
    asin: "B000FC1JLY",
    estado: "Borrador",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-06-01",
    imageUrl: "https://m.media-amazon.com/images/I/61wJmbz9KjL._AC_UF1000,1000_QL80_.jpg",
  },
];
