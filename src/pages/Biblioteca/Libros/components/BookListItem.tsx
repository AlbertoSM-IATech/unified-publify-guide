
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";

interface BookListItemProps {
  libro: Book;
  getStatusColor: (estado: string) => string;
  getContentColor: (contenido: string) => string;
}

export const BookListItem = ({ libro, getStatusColor, getContentColor }: BookListItemProps) => {
  return (
    <tr className="hover:bg-muted/50">
      <td className="whitespace-nowrap px-4 py-4">
        <div>
          <div className="font-medium">{libro.titulo}</div>
          <div className="text-sm text-muted-foreground">{libro.autor}</div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
        <div>ISBN: {libro.isbn}</div>
        {libro.asin && <div>ASIN: {libro.asin}</div>}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
            libro.estado
          )}`}
        >
          {libro.estado}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm">
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${getContentColor(
            libro.contenido
          )}`}
        >
          {libro.contenido}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
        {libro.fechaPublicacion
          ? new Date(libro.fechaPublicacion).toLocaleDateString()
          : "No publicado"}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-right text-sm">
        <Link
          to={`/biblioteca/libros/${libro.id}`}
          className="mr-2 font-medium text-primary hover:underline"
        >
          Ver
        </Link>
        <Link
          to={`/biblioteca/libros/${libro.id}`}
          className="font-medium text-primary hover:underline"
        >
          Editar
        </Link>
      </td>
    </tr>
  );
};
