
import { Book } from "../types/bookTypes";
import { BookGridItem } from "./BookGridItem";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
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

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
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
      <ResponsiveGrid 
        columns={{ sm: 1, md: 2, lg: 2 }}
        gap="md"
        className="mt-6"
      >
        {libros.map((libro) => (
          <motion.div key={libro.id} variants={itemVariants}>
            <BookGridItem
              libro={libro}
              getStatusColor={getStatusColor}
              getContentColor={getContentColor}
            />
          </motion.div>
        ))}
      </ResponsiveGrid>
    </motion.div>
  );
};
