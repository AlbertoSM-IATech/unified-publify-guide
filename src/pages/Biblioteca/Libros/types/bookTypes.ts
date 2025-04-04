
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
  subtitulo: string; // Required field
  descripcion?: string;
  autor: string;
  isbn: string;
  asin: string;
  estado: string;
  contenido: string;
  fechaPublicacion: string | null;
  imageUrl: string;
  investigacionId?: number;
  proyectoId?: number;
  hardcover?: BookFormat;
  paperback?: BookFormat;
  ebook?: BookFormat;
  notes?: BookNote[];
}
