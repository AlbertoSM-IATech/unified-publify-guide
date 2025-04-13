
import { BookListItem } from "./BookListItem";
import { Book } from "../types/bookTypes";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useRef } from "react";
import { FixedSizeList } from 'react-window';
import { ScrollArea } from "@/components/ui/scroll-area";

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
      staggerChildren: 0.02 // Reduced for faster appearance
    }
  }
};

// Memoize the BookListItem to prevent unnecessary re-renders
const MemoizedBookListItem = memo(BookListItem);

export const BooksList = memo(({ libros, getStatusColor, getContentColor }: BooksListProps) => {
  const listRef = useRef<FixedSizeList>(null);
  
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
            <AnimatePresence mode="wait">
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
            </AnimatePresence>
          </table>
        </div>
      </div>
    );
  }
  
  // For larger collections, use optimized virtualization
  // Row renderer for virtualized list
  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    const libro = libros[index];
    
    return (
      <div style={style} className="border-b border-border">
        <MemoizedBookListItem 
          key={libro.id}
          libro={libro} 
          getStatusColor={getStatusColor}
          getContentColor={getContentColor}
        />
      </div>
    );
  };
  
  // Memoize row renderer for better performance
  const MemoizedRow = memo(Row);

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
        
        <ScrollArea className="overflow-hidden h-[500px]">
          <FixedSizeList
            height={500}
            width="100%"
            itemCount={libros.length}
            itemSize={80}
            overscanCount={5} // Increase overscan for smoother scrolling
            className="focus:outline-none"
            ref={listRef}
          >
            {MemoizedRow}
          </FixedSizeList>
        </ScrollArea>
      </div>
    </div>
  );
});

BooksList.displayName = 'BooksList';
