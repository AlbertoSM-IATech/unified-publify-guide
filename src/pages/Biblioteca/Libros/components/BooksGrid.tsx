
import { Book } from "../types/bookTypes";
import { BookGridItem } from "./BookGridItem";
import { motion } from "framer-motion";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

interface BooksGridProps {
  libros: Book[];
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const BooksGrid = ({ libros, getStatusColor, getContentColor }: BooksGridProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      {libros.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 text-center border rounded-lg bg-card">
          <p className="text-muted-foreground">No hay libros que coincidan con tu búsqueda</p>
        </div>
      ) : (
        <ResponsiveGrid 
          columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
          gap="lg"
          className="mt-6"
        >
          {libros.map((libro) => (
            <BookGridItem
              key={libro.id}
              libro={libro}
              getStatusColor={getStatusColor}
              getContentColor={getContentColor}
            />
          ))}
        </ResponsiveGrid>
      )}
    </motion.div>
  );
};
