
import { Book } from "../types/bookTypes";
import { BookGridItem } from "./BookGridItem";
import { motion } from "framer-motion";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {libros.map((libro) => (
          <BookGridItem
            key={libro.id}
            libro={libro}
            getStatusColor={getStatusColor}
            getContentColor={getContentColor}
          />
        ))}
      </div>
    </motion.div>
  );
};
