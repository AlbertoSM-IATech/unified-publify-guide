
import { Book } from "../types/bookTypes";
import { BookGridItem } from "./BookGridItem";
import { memo } from "react";

interface BooksGridProps {
  libros: Book[];
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BooksGrid = memo(({ libros, getStatusColor, getContentColor }: BooksGridProps) => {
  // If there are no books, show empty state
  if (libros.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center border border-gray-800 bg-gray-900 text-white rounded-lg shadow-sm">
        <p className="text-gray-400">No hay libros que coincidan con tu búsqueda</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {libros.map((libro) => (
          <div key={libro.id} className="h-full">
            <BookGridItem
              libro={libro}
              getStatusColor={getStatusColor}
              getContentColor={getContentColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

BooksGrid.displayName = 'BooksGrid';
