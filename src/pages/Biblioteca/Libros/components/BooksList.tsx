
import { BookListItem } from "./BookListItem";
import { Book } from "../types/bookTypes";
import { motion } from "framer-motion";
import { memo } from "react";
import { FixedSizeList } from 'react-window';

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
      staggerChildren: 0.03 // Reduced from 0.05 for faster appearance
    }
  }
};

// Memoize the BookListItem to prevent unnecessary re-renders
const MemoizedBookListItem = memo(BookListItem);

export const BooksList = ({ libros, getStatusColor, getContentColor }: BooksListProps) => {
  if (libros.length === 0) {
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
      </div>
    );
  }

  // For small collections (< 10 items), don't use virtualization
  if (libros.length < 10) {
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
            <motion.tbody 
              className="divide-y divide-border bg-background"
              variants={tableVariants}
              initial="hidden"
              animate="visible"
            >
              {libros.map((libro) => (
                <MemoizedBookListItem 
                  key={libro.id}
                  libro={libro} 
                  getStatusColor={getStatusColor}
                  getContentColor={getContentColor}
                />
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    );
  }
  
  // For larger collections, use virtualization
  // Row renderer for virtualized list
  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    const libro = libros[index];
    
    return (
      <div style={style}>
        <MemoizedBookListItem 
          key={libro.id}
          libro={libro} 
          getStatusColor={getStatusColor}
          getContentColor={getContentColor}
        />
      </div>
    );
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden dark:border-slate-800">
      <div className="relative overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50 sticky top-0 z-10">
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
        </table>
        <FixedSizeList
          height={500}
          width="100%"
          itemCount={libros.length}
          itemSize={80}
        >
          {Row}
        </FixedSizeList>
      </div>
    </div>
  );
};
