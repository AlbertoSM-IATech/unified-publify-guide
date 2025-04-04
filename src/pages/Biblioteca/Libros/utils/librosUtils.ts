
import { Book } from "../types/bookTypes";

// Mock data for books
export const librosSimulados: Book[] = [
  {
    id: 1,
    titulo: "El Arte de la Guerra",
    subtitulo: "Estrategias milenarias aplicadas al mundo moderno",
    autor: "Sun Tzu (Edición comentada)",
    isbn: "978-3-16-148410-0",
    asin: "B01MSYSYZT",
    estado: "Publicado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-01-15",
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: 2,
    titulo: "Hábitos Atómicos",
    subtitulo: "Cambios pequeños, resultados extraordinarios",
    autor: "James Clear",
    isbn: "978-1-84-739790-5",
    asin: "B07D23CFGR",
    estado: "En revisión",
    contenido: "Medio Contenido",
    fechaPublicacion: null,
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1748&auto=format&fit=crop",
  },
  {
    id: 3,
    titulo: "El Poder del Ahora",
    subtitulo: "Una guía para la iluminación espiritual",
    autor: "Eckhart Tolle",
    isbn: "978-1-57-731577-8",
    asin: "B00JLCKBZE",
    estado: "Borrador",
    contenido: "Bajo Contenido",
    fechaPublicacion: null,
    imageUrl: "https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: 4,
    titulo: "Los 7 Hábitos de la Gente Altamente Efectiva",
    subtitulo: "Lecciones poderosas para el cambio personal",
    autor: "Stephen R. Covey",
    isbn: "978-0-74-322134-3",
    asin: "B09DPTFL76",
    estado: "Publicado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2022-07-21",
    imageUrl: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1742&auto=format&fit=crop",
  },
  {
    id: 5,
    titulo: "Piense y Hágase Rico",
    subtitulo: "La riqueza y la realización personal al alcance de todos",
    autor: "Napoleon Hill",
    isbn: "978-1-60-459533-5",
    asin: "B08HTF3QQF",
    estado: "Archivado",
    contenido: "Medio Contenido",
    fechaPublicacion: "2021-11-14",
    imageUrl: "https://images.unsplash.com/photo-1554495439-1a9942f882be?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: 6,
    titulo: "Mindfulness para Principiantes",
    subtitulo: "Reclaiming the Present Moment and Your Life",
    autor: "Jon Kabat-Zinn",
    isbn: "978-1-60-994703-5",
    asin: "B00NU4IX5K",
    estado: "En revisión",
    contenido: "Bajo Contenido",
    fechaPublicacion: null,
    imageUrl: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=1674&auto=format&fit=crop",
  }
];

// Function to get status color
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Publicado":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    case "En revisión":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    case "Borrador":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    case "Archivado":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

// Function to get content level color
export const getContentColor = (content: string) => {
  switch (content) {
    case "Alto Contenido":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
    case "Medio Contenido":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300";
    case "Bajo Contenido":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};
