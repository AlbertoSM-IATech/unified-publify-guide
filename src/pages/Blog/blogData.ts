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
  coverImage?: string;
  number?: number;
}
