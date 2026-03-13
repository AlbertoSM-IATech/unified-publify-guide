export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: number;
  author: { name: string; role: string };
  featured?: boolean;
  content?: string;
}

export const categories = ["Todos", "Self-Publishing", "Marketing", "Finanzas", "Productividad"];

export const blogPosts: BlogPost[] = [
  {
    slug: "guia-completa-amazon-kdp-2025",
    title: "Guía completa para publicar en Amazon KDP en 2025",
    excerpt: "Todo lo que necesitas saber para lanzar tu primer libro en Amazon KDP: desde el manuscrito hasta las primeras ventas. Estrategias actualizadas para el mercado actual.",
    category: "Self-Publishing",
    date: "2025-03-10",
    readingTime: 12,
    author: { name: "Laura Méndez", role: "Editora Senior" },
    featured: true,
    content: `
## El panorama del self-publishing en 2025

El mundo de la autopublicación ha cambiado radicalmente en los últimos años. Amazon KDP sigue siendo la plataforma dominante, pero las reglas del juego han evolucionado. Ya no basta con subir un manuscrito y esperar que las ventas lleguen solas.

### Preparación del manuscrito

Antes de pensar en portadas o marketing, tu manuscrito debe estar impecable. Esto significa:

- **Edición profesional**: No escatimes en este paso. Un buen editor puede transformar un buen libro en uno excelente.
- **Maquetación responsive**: Los lectores de Kindle esperan una experiencia de lectura fluida en cualquier dispositivo.
- **Metadatos optimizados**: Las categorías y palabras clave correctas son la diferencia entre ser descubierto o perderse en el catálogo.

> "El 80% del éxito de un libro en KDP se decide antes de publicarlo." — Jeff Bezos (probablemente no, pero suena bien)

### Estrategia de lanzamiento

Un lanzamiento exitoso requiere planificación de al menos 4-6 semanas. Durante este período deberías construir anticipación, preparar tu lista de correo y coordinar reseñas honestas.

### Después del lanzamiento

El verdadero trabajo comienza después de publicar. Monitoriza tus métricas, ajusta tus anuncios y mantén el impulso con contenido regular en tus redes sociales.
    `,
  },
  {
    slug: "5-errores-portadas-libros",
    title: "5 errores fatales en las portadas de tus libros",
    excerpt: "Tu portada es tu anuncio más importante. Descubre los errores más comunes que están frenando tus ventas y cómo solucionarlos.",
    category: "Marketing",
    date: "2025-03-08",
    readingTime: 7,
    author: { name: "Carlos Ruiz", role: "Director Creativo" },
  },
  {
    slug: "royalties-kdp-impuestos-espana",
    title: "Royalties de KDP e impuestos en España: lo que debes saber",
    excerpt: "Guía fiscal para autores independientes en España. Cómo declarar tus ingresos de Amazon KDP y optimizar tu carga tributaria legalmente.",
    category: "Finanzas",
    date: "2025-03-05",
    readingTime: 10,
    author: { name: "Ana Torres", role: "Asesora Fiscal" },
  },
  {
    slug: "rutina-escritura-productiva",
    title: "Cómo escribir un libro en 90 días con una rutina productiva",
    excerpt: "El sistema probado que utilizan los autores más prolíficos. Técnicas de productividad aplicadas a la escritura creativa.",
    category: "Productividad",
    date: "2025-03-01",
    readingTime: 8,
    author: { name: "Miguel Ángel López", role: "Coach de Escritura" },
  },
  {
    slug: "amazon-ads-autores-principiantes",
    title: "Amazon Ads para autores: guía para principiantes",
    excerpt: "Aprende a crear campañas rentables en Amazon Ads sin experiencia previa. Paso a paso con ejemplos reales y presupuestos mínimos.",
    category: "Marketing",
    date: "2025-02-25",
    readingTime: 15,
    author: { name: "Laura Méndez", role: "Editora Senior" },
  },
  {
    slug: "nichos-rentables-kdp-2025",
    title: "Los 10 nichos más rentables en KDP para 2025",
    excerpt: "Análisis de mercado actualizado: qué géneros y categorías están generando más ingresos este año en Amazon KDP.",
    category: "Self-Publishing",
    date: "2025-02-20",
    readingTime: 9,
    author: { name: "Carlos Ruiz", role: "Director Creativo" },
  },
  {
    slug: "herramientas-autor-independiente",
    title: "Las herramientas esenciales para el autor independiente",
    excerpt: "Desde la escritura hasta el marketing: las aplicaciones y servicios que todo autor indie debería conocer para optimizar su flujo de trabajo.",
    category: "Productividad",
    date: "2025-02-15",
    readingTime: 6,
    author: { name: "Ana Torres", role: "Asesora Fiscal" },
  },
  {
    slug: "calcular-precio-libro-kdp",
    title: "Cómo calcular el precio perfecto para tu libro en KDP",
    excerpt: "La ciencia del pricing: estrategias para maximizar tus royalties sin sacrificar volumen de ventas.",
    category: "Finanzas",
    date: "2025-02-10",
    readingTime: 8,
    author: { name: "Miguel Ángel López", role: "Coach de Escritura" },
  },
];
