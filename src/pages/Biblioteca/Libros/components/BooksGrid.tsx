
import { Book } from "../types/bookTypes";
import { BookGridItem } from "./BookGridItem";
import { motion } from "framer-motion";
import { FixedSizeGrid } from "react-window";
import { useWindowSize } from "@/hooks/useWindowSize";
import { memo } from "react";

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
      staggerChildren: 0.05 // Reduced from 0.1 for faster appearance
    }
  }
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 }, // Reduced from y: 20 for lighter animation
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12 // Reduced for faster animation
    }
  }
};

// Memoize the BookGridItem to prevent unnecessary re-renders
const MemoizedBookGridItem = memo(BookGridItem);

export const BooksGrid = ({ libros, getStatusColor, getContentColor }: BooksGridProps) => {
  const windowSize = useWindowSize();
  
  // If there are no books, show empty state
  if (libros.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center border rounded-lg bg-card shadow-sm">
        <p className="text-muted-foreground">No hay libros que coincidan con tu búsqueda</p>
      </div>
    );
  }

  // For small collections (< 10 items), don't use virtualization
  if (libros.length < 10) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {libros.map((libro) => (
            <motion.div 
              key={libro.id} 
              variants={itemVariants}
              className="h-full"
            >
              <MemoizedBookGridItem
                libro={libro}
                getStatusColor={getStatusColor}
                getContentColor={getContentColor}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }
  
  // For larger collections, use virtualization
  // Calculate column count based on window width
  const columnCount = windowSize.width && windowSize.width > 768 ? 2 : 1;
  const rowCount = Math.ceil(libros.length / columnCount);
  
  // Calculate item size (height depends on content but we estimate)
  const itemWidth = windowSize.width ? (windowSize.width > 768 ? (windowSize.width * 0.7 - 40) / 2 : windowSize.width * 0.8) : 300;
  const itemHeight = 320; // Fixed height estimation for each card
  
  // Cell renderer for virtualized grid
  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const index = rowIndex * columnCount + columnIndex;
    if (index >= libros.length) return null;
    
    const libro = libros[index];
    
    return (
      <div style={{ ...style, padding: '10px' }}>
        <MemoizedBookGridItem
          libro={libro}
          getStatusColor={getStatusColor}
          getContentColor={getContentColor}
        />
      </div>
    );
  };

  return (
    <div className="w-full mt-6">
      <FixedSizeGrid
        columnCount={columnCount}
        columnWidth={itemWidth}
        height={Math.min(window.innerHeight * 0.8, rowCount * itemHeight)}
        rowCount={rowCount}
        rowHeight={itemHeight}
        width={windowSize.width ? windowSize.width * 0.8 : 800}
      >
        {Cell}
      </FixedSizeGrid>
    </div>
  );
};
