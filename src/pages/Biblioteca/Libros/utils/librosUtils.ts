
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

// Datos simulados para colecciones
export const coleccionesSimuladas = [
  {
    id: 1,
    nombre: "Serie Emprendimiento",
    descripcion: "Libros sobre emprendimiento y negocios",
    cantidadLibros: 3,
    fechaCreacion: "2023-01-15",
    libros: [1, 2, 7],
    estado: "Activa"
  },
  {
    id: 2,
    nombre: "Desarrollo Personal",
    descripcion: "Libros de crecimiento y superación",
    cantidadLibros: 2,
    fechaCreacion: "2023-02-20",
    libros: [4, 5],
    estado: "Activa"
  },
  {
    id: 3,
    nombre: "Marketing y Ventas",
    descripcion: "Todo sobre marketing digital y técnicas de venta",
    cantidadLibros: 1,
    fechaCreacion: "2023-03-10",
    libros: [3],
    estado: "Activa"
  },
  {
    id: 4,
    nombre: "Liderazgo",
    descripcion: "Estrategias y consejos de liderazgo",
    cantidadLibros: 1,
    fechaCreacion: "2023-04-05",
    libros: [6],
    estado: "Activa"
  },
  {
    id: 5,
    nombre: "Cocina mediterránea",
    descripcion: "Colección de libros de cocina mediterránea",
    cantidadLibros: 1,
    fechaCreacion: "2023-05-15",
    libros: [5],
    estado: "Activa"
  }
];

// Datos simulados para investigaciones
export const investigacionesSimuladas = [
  {
    id: 1,
    titulo: "Investigación para El Arte de la Estrategia",
    descripcion: "Notas y fuentes para el libro",
    libroId: 1,
    libroTitulo: "El Arte de la Estrategia",
    fechaActualizacion: "2023-10-05"
  },
  {
    id: 2,
    titulo: "Investigación para Finanzas para Emprendedores",
    descripcion: "Referencias y estudios de caso",
    libroId: 2,
    libroTitulo: "Finanzas para Emprendedores",
    fechaActualizacion: "2023-04-15"
  },
  {
    id: 3,
    titulo: "Investigación para Marketing Digital",
    descripcion: "Tendencias y estadísticas actuales",
    libroId: 3,
    libroTitulo: "Marketing Digital",
    fechaActualizacion: "2023-03-20"
  },
  {
    id: 4,
    titulo: "Investigación para Desarrollo Personal",
    descripcion: "Técnicas y metodologías",
    libroId: 4,
    libroTitulo: "Desarrollo Personal",
    fechaActualizacion: "2023-02-25"
  }
];

// Simulate data for libros
export const librosSimulados: Book[] = [
  {
    id: 1,
    titulo: "El Arte de la Estrategia",
    subtitulo: "Cómo dominar el juego de los negocios",
    autor: "Carlos Méndez",
    isbn: "978-1234567890",
    asin: "B01234ABCD",
    estado: "Publicado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-01-15",
    imageUrl: "https://m.media-amazon.com/images/I/71jLBXtWJHL._AC_UF1000,1000_QL80_.jpg",
    investigacionId: 1,
    proyectoId: 1,
    descripcionHtml: "<h2>El Arte de la Estrategia</h2><p>Este libro te enseñará los fundamentos de la estrategia empresarial con ejemplos prácticos.</p><ul><li>Capítulo 1: Fundamentos</li><li>Capítulo 2: Análisis competitivo</li><li>Capítulo 3: Implementación</li></ul>"
  },
  {
    id: 2,
    titulo: "Finanzas para Emprendedores",
    subtitulo: "Guía práctica para gestionar tu negocio",
    autor: "Laura Rodríguez",
    isbn: "978-0987654321",
    asin: "B09HIJKLMN",
    estado: "Publicado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-02-10",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    investigacionId: 2,
    proyectoId: 1,
    descripcionHtml: "<h2>Finanzas para Emprendedores</h2><p>Una guía esencial para manejar las finanzas de tu negocio desde cero.</p><ul><li>Contabilidad básica</li><li>Flujo de caja</li><li>Estrategias de inversión</li></ul>"
  },
  {
    id: 3,
    titulo: "Marketing Digital",
    subtitulo: "Estrategias efectivas para el siglo XXI",
    autor: "Miguel Torres",
    isbn: "978-5678901234",
    asin: "B05678PQRS",
    estado: "Publicado",
    contenido: "Medio Contenido",
    fechaPublicacion: "2023-03-20",
    imageUrl: "https://images.unsplash.com/photo-1557838923-2985c318be48",
    investigacionId: 3,
    proyectoId: 3,
    descripcionHtml: "<h2>Marketing Digital</h2><p>Descubre las estrategias más efectivas de marketing online para tu negocio.</p><ul><li>SEO y SEM</li><li>Redes sociales</li><li>Email marketing</li></ul>"
  },
  {
    id: 4,
    titulo: "Desarrollo Personal",
    subtitulo: "Transforma tu vida y alcanza tu potencial",
    autor: "Ana Martínez",
    isbn: "978-9012345678",
    asin: "B09012TUVW",
    estado: "En revisión",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-02-25",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    investigacionId: 4,
    proyectoId: 2,
    descripcionHtml: "<h2>Desarrollo Personal</h2><p>Aprende a potenciar tus habilidades y mejorar tu calidad de vida.</p><ul><li>Gestión del tiempo</li><li>Inteligencia emocional</li><li>Hábitos efectivos</li></ul>"
  },
  {
    id: 5,
    titulo: "Cocina Vegetariana",
    subtitulo: "Recetas saludables para todos los días",
    autor: "Elena Sánchez",
    isbn: "978-3456789012",
    asin: "B03456XYZA",
    estado: "Borrador",
    contenido: "Medio Contenido",
    fechaPublicacion: "2023-04-05",
    imageUrl: "https://images.unsplash.com/photo-1466637574441-749b8f19452f",
    proyectoId: 5,
    descripcionHtml: "<h2>Cocina Vegetariana</h2><p>Las mejores recetas vegetarianas para una alimentación saludable.</p><ul><li>Entradas</li><li>Platos principales</li><li>Postres</li></ul>"
  },
  {
    id: 6,
    titulo: "Liderazgo Efectivo",
    subtitulo: "Cómo dirigir equipos de alto rendimiento",
    autor: "Roberto Fernández",
    isbn: "978-7890123456",
    asin: "B07890BCDE",
    estado: "Archivado",
    contenido: "Bajo Contenido",
    fechaPublicacion: "2023-04-15",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    proyectoId: 4,
    descripcionHtml: "<h2>Liderazgo Efectivo</h2><p>Aprende a liderar equipos de trabajo y conseguir resultados extraordinarios.</p><ul><li>Comunicación efectiva</li><li>Delegación</li><li>Motivación de equipos</li></ul>"
  },
  {
    id: 7,
    titulo: "Innovación Empresarial",
    subtitulo: "Cómo impulsar la creatividad en tu negocio",
    autor: "Javier López",
    isbn: "978-2345678901",
    asin: "B02345FGHI",
    estado: "Publicado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-05-20",
    imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312",
    proyectoId: 1,
    descripcionHtml: "<h2>Innovación Empresarial</h2><p>Estrategias para fomentar la innovación y creatividad en tu empresa.</p><ul><li>Cultura de innovación</li><li>Design thinking</li><li>Implementación de procesos creativos</li></ul>"
  },
];
