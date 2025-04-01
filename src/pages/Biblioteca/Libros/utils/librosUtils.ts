
// Mock data for books
export const librosSimulados = [
  {
    id: 1,
    titulo: "El Arte de la Estrategia",
    subtitulo: "Una visión global",
    autor: "Juan Pérez",
    isbn: "978-3-16-148410-0",
    asin: "B01N9VSOYB",
    estado: "Publicado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-05-15",
    imageUrl: ""
  },
  {
    id: 2,
    titulo: "Finanzas para Emprendedores",
    subtitulo: "Guía práctica",
    autor: "María González",
    isbn: "978-3-16-148410-1",
    asin: "B08N5M7KTS",
    estado: "Borrador",
    contenido: "Medio Contenido",
    fechaPublicacion: null,
    imageUrl: ""
  },
  {
    id: 3,
    titulo: "Marketing Digital",
    subtitulo: "Estrategias efectivas",
    autor: "Carlos Rodríguez",
    isbn: "978-3-16-148410-2",
    asin: "B07F7TDMCD",
    estado: "Publicado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2023-02-10",
    imageUrl: ""
  },
  {
    id: 4,
    titulo: "Desarrollo Personal",
    subtitulo: "Alcanza tu máximo potencial",
    autor: "Ana López",
    isbn: "978-3-16-148410-3",
    asin: "B08ZHPKH56",
    estado: "Revisión",
    contenido: "Bajo Contenido",
    fechaPublicacion: null,
    imageUrl: ""
  },
  {
    id: 5,
    titulo: "Inteligencia Emocional",
    subtitulo: "Aprende a gestionar tus emociones",
    autor: "Pedro Martínez",
    isbn: "978-3-16-148410-4",
    asin: "B01F7TQ86A",
    estado: "Publicado",
    contenido: "Medio Contenido",
    fechaPublicacion: "2022-11-20",
    imageUrl: ""
  },
  {
    id: 6,
    titulo: "Liderazgo Efectivo",
    subtitulo: "Técnicas para dirigir equipos",
    autor: "Laura Sánchez",
    isbn: "978-3-16-148410-5",
    asin: "B07Z4RVN9L",
    estado: "Publicado",
    contenido: "Alto Contenido",
    fechaPublicacion: "2022-09-05",
    imageUrl: ""
  }
];

// Define the color of the badge according to the state
export const getStatusColor = (estado: string) => {
  switch (estado) {
    case "Publicado":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Borrador":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Revisión":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};

// Define the color according to the content level
export const getContentColor = (contenido: string) => {
  switch (contenido) {
    case "Alto Contenido":
      return "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300";
    case "Medio Contenido":
      return "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
    case "Bajo Contenido":
      return "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
    default:
      return "bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
  }
};
