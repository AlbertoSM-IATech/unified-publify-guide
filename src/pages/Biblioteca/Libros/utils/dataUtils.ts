
// Utility functions for data manipulation and filtering
import { Book } from "../types/bookTypes";
import { librosSimulados } from "./mockData/librosData";

// Function to fetch libros from an API
export const fetchLibros = async (): Promise<Book[]> => {
  // Simulate an API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return librosSimulados;
};

// Function to filter libros based on a search term
export const filterLibros = (libros: Book[], searchTerm: string): Book[] => {
  if (!searchTerm.trim()) return libros;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return libros.filter((libro) => {
    const lowerTitulo = libro.titulo.toLowerCase();
    const lowerAutor = libro.autor.toLowerCase();
    return lowerTitulo.includes(lowerSearchTerm) || lowerAutor.includes(lowerSearchTerm);
  });
};

// Function to sort libros with optimized performance
export const sortLibros = (libros: Book[], sortBy: string, sortOrder: string): Book[] => {
  if (!sortBy || !sortOrder) return libros;
  
  // Use a more performant way to copy the array
  const sortedLibros = libros.slice();

  return sortedLibros.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case "titulo":
        comparison = a.titulo.localeCompare(b.titulo);
        break;
      case "autor":
        comparison = a.autor.localeCompare(b.autor);
        break;
      case "fechaPublicacion":
        // Handle null dates
        if (!a.fechaPublicacion && !b.fechaPublicacion) comparison = 0;
        else if (!a.fechaPublicacion) comparison = -1;
        else if (!b.fechaPublicacion) comparison = 1;
        else {
          // Use timestamp comparison for better performance
          const dateA = new Date(a.fechaPublicacion).getTime();
          const dateB = new Date(b.fechaPublicacion).getTime();
          comparison = dateA - dateB;
        }
        break;
      default:
        // Default sorting by ID for consistent ordering
        comparison = a.id - b.id;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });
};

// Function to paginate libros
export const paginateLibros = (libros: Book[], page: number, itemsPerPage: number): Book[] => {
  const startIndex = (page - 1) * itemsPerPage;
  return libros.slice(startIndex, startIndex + itemsPerPage);
};

// Function to get book by ID (optimized with Map for large collections)
export const getBookById = (libros: Book[], id: number): Book | undefined => {
  return libros.find(libro => libro.id === id);
};
