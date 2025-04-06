
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
      staggerChildren: 0.1
    }
  }
};

const rowVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const BooksList = ({ libros, getStatusColor, getContentColor }: BooksListProps) => {
  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
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
          {libros.map((libro) => (
            <motion.tr key={libro.id} variants={rowVariants}>
              <BookListItem 
                libro={libro} 
                getStatusColor={getStatusColor}
                getContentColor={getContentColor}
              />
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </div>
  );
};
