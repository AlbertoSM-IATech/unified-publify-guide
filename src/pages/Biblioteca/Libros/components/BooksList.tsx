
import { BookListItem } from "./BookListItem";
import { Book } from "../types/bookTypes";
import { memo } from "react";

interface BooksListProps {
  libros: Book[];
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BooksList = memo(({
  libros,
  getStatusColor,
  getContentColor
}: BooksListProps) => {
  if (libros.length === 0) {
    return <div className="rounded-lg border border-gray-800 bg-gray-900 shadow-sm overflow-hidden">
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800 text-white">
            <thead className="bg-gray-800/50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Título / Autor
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Regalías
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Estado
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Contenido
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                  Fecha
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                  No hay libros que coincidan con tu búsqueda
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>;
  }
  
  return <div className="rounded-lg border border-gray-800 bg-gray-900 shadow-sm overflow-hidden">
      <div className="relative overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800 text-white">
          <thead className="bg-gray-800/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Título / Autor
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">REGALÍAS TAPA BLANDA</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Estado
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Contenido
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                Fecha
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-900">
            {libros.map(libro => <BookListItem key={libro.id} libro={libro} getStatusColor={getStatusColor} getContentColor={getContentColor} />)}
          </tbody>
        </table>
      </div>
    </div>;
});

BooksList.displayName = 'BooksList';
