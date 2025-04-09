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

// Get the color class for a book status
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Publicado":
      return "bg-status-published text-white";
    case "Borrador":
      return "bg-status-draft text-white";
    case "En revisión":
      return "bg-status-review text-white";
    case "Archivado":
      return "bg-status-archived text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

// Get the color class for a content type
export const getContentColor = (content: string) => {
  switch (content) {
    case "Alto Contenido":
      return "bg-content-high text-white";
    case "Medio Contenido":
      return "bg-content-medium text-white";
    case "Bajo Contenido":
      return "bg-content-low text-white";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

// Hex color values for content types (for direct styling)
export const getContentHexColor = (content: string) => {
  switch (content) {
    case "Alto Contenido":
      return "#3B82F6"; // Blue
    case "Medio Contenido":
      return "#FB923C"; // Coral
    case "Bajo Contenido":
      return "#10B981"; // Green
    default:
      return "#94a3b8"; // Default gray
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
