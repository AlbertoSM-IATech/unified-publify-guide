
export interface BookLink {
  name: string;
  url: string;
  type: 'amazon' | 'landing' | 'presale' | 'reviews' | 'other';
}

export interface BookLinks {
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
}
