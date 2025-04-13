
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
