
import { BookListItem } from "./BookListItem";
import { Book } from "../types/bookTypes";
import { motion } from "framer-motion";

interface BooksListProps {
  libros: Book[];
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

const tableVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05
    }
  }
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const BooksList = ({ libros, getStatusColor, getContentColor }: BooksListProps) => {
  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden dark:border-slate-800">
      <div className="relative overflow-x-auto">
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
          <motion.tbody 
            className="divide-y divide-border bg-background"
            variants={tableVariants}
            initial="hidden"
            animate="visible"
          >
            {libros.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No hay libros que coincidan con tu búsqueda
                </td>
              </tr>
            ) : (
              libros.map((libro) => (
                <BookListItem 
                  key={libro.id}
                  libro={libro} 
                  getStatusColor={getStatusColor}
                  getContentColor={getContentColor}
                />
              ))
            )}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};
