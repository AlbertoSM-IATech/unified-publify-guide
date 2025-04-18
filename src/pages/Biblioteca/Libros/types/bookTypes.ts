
export interface BookNote {
  id: number;
  text: string;
  date: string;
}

export interface BookFormat {
  dimensions?: string;
  isbn?: string;
  asin?: string;
  pages?: number;
  files?: {id: number; name: string; type: string}[];
  price?: number;
  royaltyPercentage?: number;
  printingCost?: number;
  links?: {
    amazon?: string;
    presale?: string;
    reviews?: string;
    h10Canonical?: string;
    affiliate?: string;
    leadMagnet?: string;
    newsletter?: string;
    landingPage?: string;
    authorCentral?: string;
    [key: string]: string | undefined;
  };
  strategy?: string;
  [key: string]: any;
}

export interface Book {
  id: number;
  titulo: string;
  subtitulo: string;
  descripcion?: string;
  descripcionHtml?: string; // HTML description
  autor: string;
  isbn: string;
  asin: string;
  estado: string;
  contenido: string;
  fechaPublicacion: string | null;
  fechaLanzamiento?: string | null; // Launch date
  bsr?: number | null; // Best Seller Rank
  landingPageUrl?: string; // Landing page URL
  contenidoAPlus?: string; // A+ content
  contenidoAPlusFiles?: {id: number; name: string; type: string}[]; // A+ content files
  imageUrl: string;
  investigacionId?: number;
  proyectoId?: number;
  hardcover?: BookFormat;
  paperback?: BookFormat;
  ebook?: BookFormat;
  notes?: BookNote[];
  
  // Audience and positioning fields
  targetAge?: string; // Target age range (e.g., "25-45")
  targetGender?: string; // Target gender
  targetInterests?: string; // Target interests
  marketPosition?: string; // Market positioning description
  competitorBooks?: string; // Competing books
  uniqueValueProposition?: string; // Unique value proposition
}
