
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Eye } from "lucide-react";
import { motion } from "framer-motion";

interface BookListItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BookListItem = ({ libro, getStatusColor, getContentColor }: BookListItemProps) => {
  return (
    <motion.tr 
      className="hover:bg-muted/20 transition-colors"
      whileHover={{ 
        backgroundColor: "rgba(0,0,0,0.02)",
        boxShadow: "0 4px 12px -2px rgba(251, 146, 60, 0.1)"
      }}
    >
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-8 flex-shrink-0 overflow-hidden rounded-sm">
            {libro.imageUrl ? (
              <img 
                src={libro.imageUrl} 
                alt={libro.titulo} 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <span className="text-xs text-muted-foreground">Sin portada</span>
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-[#3B82F6]">
              <Link to={`/biblioteca/libros/${libro.id}`} className="hover:underline">
                {libro.titulo}
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">{libro.autor}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
        <div>ISBN: {libro.isbn}</div>
        {libro.asin && <div>ASIN: {libro.asin}</div>}
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(
            libro.estado
          )}`}
        >
          {libro.estado}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-4 text-sm">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getContentColor(
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
          className="inline-flex items-center font-medium text-[#FB923C] hover:underline"
        >
          <Eye className="mr-1 h-4 w-4" /> Ver detalles
        </Link>
      </td>
    </motion.tr>
  );
};
