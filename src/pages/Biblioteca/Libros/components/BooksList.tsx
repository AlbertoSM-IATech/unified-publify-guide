import { BookListItem } from "./BookListItem";
import { Book } from "../types/bookTypes";
import { memo } from "react";

interface BooksListProps {
  libros: Book[];
}

export const BooksList = memo(({ libros }: BooksListProps) => {
  if (libros.length === 0) {
    return <div className="rounded-lg border bg-card shadow-sm overflow-hidden dark:border-slate-800">
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Título / Autor
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Regalías
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
            <tbody>
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No hay libros que coincidan con tu búsqueda
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>;
  }
  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden dark:border-slate-800">
      <div className="relative overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Título / Autor
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">REGALÍAS TAPA BLANDA</th>
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
            {libros.map(libro => (
              <BookListItem 
                key={libro.id} 
                libro={libro}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

BooksList.displayName = 'BooksList';
