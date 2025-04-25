// Mock data for books
import { Book } from "../../types/bookTypes";

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
    fechaLanzamiento: "2023-01-01",
    imageUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    portadaUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    investigacionId: 1,
    proyectoId: 1,
    descripcionHtml: "<h2>El Arte de la Estrategia</h2><p>Este libro te enseñará los fundamentos de la estrategia empresarial con ejemplos prácticos.</p><ul><li>Capítulo 1: Fundamentos</li><li>Capítulo 2: Análisis competitivo</li><li>Capítulo 3: Implementación</li></ul>",
    descripcion: "Este libro te enseñará los fundamentos de la estrategia empresarial con ejemplos prácticos.\n\nCapítulo 1: Fundamentos\nCapítulo 2: Análisis competitivo\nCapítulo 3: Implementación",
    hardcover: {
      bsr: 1234,
      links: {
        amazon: "https://amazon.com/dp/B01234ABCD"
      }
    },
    paperback: {
      bsr: 5678,
      links: {
        amazon: "https://amazon.com/dp/B01234ABCD-paperback"
      }
    },
    ebook: {
      bsr: 9101,
      links: {
        amazon: "https://amazon.com/dp/B01234ABCD-ebook"
      }
    },
    bsr: 1234,
    contenidoAPlus: "Este es un contenido A+ de alta calidad.\n\n---\n\nPuede contener varias secciones con diferentes propósitos.",
    contenidoAPlusFiles: [
      { id: 1, name: "banner1.jpg", type: "image" },
      { id: 2, name: "detalles.pdf", type: "document" }
    ],
    landingPageUrl: "https://example.com/libro1",
    amazonUrl: "https://amazon.com/dp/B01234ABCD",
    authorPageUrl: "https://amazon.com/author/carlosmendez",
    targetAge: "25-45",
    uniqueValueProposition: "El único libro que combina teoría estratégica con ejemplos prácticos del mundo real"
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
    fechaLanzamiento: "2023-02-01",
    imageUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    portadaUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    investigacionId: 2,
    proyectoId: 1,
    descripcionHtml: "<h2>Finanzas para Emprendedores</h2><p>Una guía esencial para manejar las finanzas de tu negocio desde cero.</p><ul><li>Contabilidad básica</li><li>Flujo de caja</li><li>Estrategias de inversión</li></ul>",
    descripcion: "Una guía esencial para manejar las finanzas de tu negocio desde cero.\n\nContabilidad básica\nFlujo de caja\nEstrategias de inversión"
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
    fechaLanzamiento: "2023-03-10",
    imageUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    portadaUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    investigacionId: 3,
    proyectoId: 3,
    descripcionHtml: "<h2>Marketing Digital</h2><p>Descubre las estrategias más efectivas de marketing online para tu negocio.</p><ul><li>SEO y SEM</li><li>Redes sociales</li><li>Email marketing</li></ul>",
    descripcion: "Descubre las estrategias más efectivas de marketing online para tu negocio.\n\nSEO y SEM\nRedes sociales\nEmail marketing"
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
    fechaLanzamiento: "2023-02-15",
    imageUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    portadaUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    investigacionId: 4,
    proyectoId: 2,
    descripcionHtml: "<h2>Desarrollo Personal</h2><p>Aprende a potenciar tus habilidades y mejorar tu calidad de vida.</p><ul><li>Gestión del tiempo</li><li>Inteligencia emocional</li><li>Hábitos efectivos</li></ul>",
    descripcion: "Aprende a potenciar tus habilidades y mejorar tu calidad de vida.\n\nGestión del tiempo\nInteligencia emocional\nHábitos efectivos"
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
    fechaLanzamiento: null,
    imageUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    portadaUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    proyectoId: 5,
    descripcionHtml: "<h2>Cocina Vegetariana</h2><p>Las mejores recetas vegetarianas para una alimentación saludable.</p><ul><li>Entradas</li><li>Platos principales</li><li>Postres</li></ul>",
    descripcion: "Las mejores recetas vegetarianas para una alimentación saludable.\n\nEntradas\nPlatos principales\nPostres"
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
    fechaLanzamiento: "2023-04-01",
    imageUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    portadaUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    proyectoId: 4,
    descripcionHtml: "<h2>Liderazgo Efectivo</h2><p>Aprende a liderar equipos de trabajo y conseguir resultados extraordinarios.</p><ul><li>Comunicación efectiva</li><li>Delegación</li><li>Motivación de equipos</li></ul>",
    descripcion: "Aprende a liderar equipos de trabajo y conseguir resultados extraordinarios.\n\nComunicación efectiva\nDelegación\nMotivación de equipos"
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
    fechaLanzamiento: "2023-05-10",
    imageUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    portadaUrl: "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg",
    proyectoId: 1,
    descripcionHtml: "<h2>Innovación Empresarial</h2><p>Estrategias para fomentar la innovación y creatividad en tu empresa.</p><ul><li>Cultura de innovación</li><li>Design thinking</li><li>Implementación de procesos creativos</li></ul>",
    descripcion: "Estrategias para fomentar la innovación y creatividad en tu empresa.\n\nCultura de innovación\nDesign thinking\nImplementación de procesos creativos"
  },
];
