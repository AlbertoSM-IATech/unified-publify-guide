import { Book } from "../types/bookTypes";

interface BooksGridProps {
  libros: Book[];
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BooksGrid = ({ libros, getStatusColor, getContentColor }: BooksGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {libros.map((libro) => (
        <div key={libro.id} className="relative rounded-md border">
          <img
            src={libro.imageUrl || "https://via.placeholder.com/300x400"}
            alt={libro.titulo}
            className="aspect-3/4 w-full rounded-md object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{libro.titulo}</h3>
            <p className="text-sm text-muted-foreground">{libro.autor}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                {libro.estado}
              </span>
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ backgroundColor: getContentColor(libro.contenido) }}
              >
                {libro.contenido}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
