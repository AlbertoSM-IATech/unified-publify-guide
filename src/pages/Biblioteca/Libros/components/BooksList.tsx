
import { BookListItem } from "./BookListItem";

interface BooksListProps {
  libros: Array<{
    id: number;
    titulo: string;
    subtitulo?: string; // Make subtitulo optional
    autor: string;
    isbn: string;
    asin: string;
    estado: string;
    contenido: string;
    fechaPublicacion: string | null;
    imageUrl: string;
  }>;
  getStatusColor: (estado: string) => string;
  getContentColor: (contenido: string) => string;
}

export const BooksList = ({ libros, getStatusColor, getContentColor }: BooksListProps) => {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted/50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Título / Autor
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              ISBN / ASIN
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Estado
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Contenido
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Fecha
            </th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-background">
          {libros.map((libro) => (
            <BookListItem 
              key={libro.id} 
              libro={libro} 
              getStatusColor={getStatusColor}
              getContentColor={getContentColor}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
