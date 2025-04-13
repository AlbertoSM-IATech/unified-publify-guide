
import { Book } from "../types/bookTypes";
import { BookGridItem } from "./BookGridItem";
import { motion, AnimatePresence } from "framer-motion";
import { FixedSizeGrid } from "react-window";
import { useWindowSize } from "@/hooks/useWindowSize";
import { memo, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      staggerChildren: 0.03 // Reduced from 0.05 for faster appearance
    }
  }
};

const itemVariants = {
  hidden: { y: 5, opacity: 0 }, // Reduced from y: 10 for lighter animation
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15 // Increased damping for shorter animation
    }
  }
};

// Memoize the BookGridItem to prevent unnecessary re-renders
const MemoizedBookGridItem = memo(BookGridItem);

export const BooksGrid = memo(({ libros, getStatusColor, getContentColor }: BooksGridProps) => {
  const windowSize = useWindowSize();
  const gridRef = useRef<HTMLDivElement>(null);
  
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
          <AnimatePresence mode="wait">
            {libros.map((libro) => (
              <motion.div 
                key={libro.id} 
                variants={itemVariants}
                className="h-full"
                layoutId={`book-${libro.id}`}
              >
                <MemoizedBookGridItem
                  libro={libro}
                  getStatusColor={getStatusColor}
                  getContentColor={getContentColor}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  }
  
  // For larger collections, use virtualization with optimized settings
  const columnCount = windowSize.width && windowSize.width > 768 ? 2 : 1;
  const rowCount = Math.ceil(libros.length / columnCount);
  
  // Calculate item size (height depends on content but we estimate)
  const itemWidth = windowSize.width ? (windowSize.width > 768 ? (windowSize.width * 0.7 - 40) / 2 : windowSize.width * 0.8) : 300;
  const itemHeight = 320; // Fixed height estimation for each card
  
  // Cell renderer for virtualized grid with optimized rendering
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
  
  // Optimize height calculation to prevent layout shifts
  const gridHeight = Math.min(
    window.innerHeight * 0.8,
    rowCount * itemHeight,
    // Ensure grid isn't too tall (max 5 rows visible at once)
    5 * itemHeight
  );

  return (
    <ScrollArea className="w-full mt-6 rounded-md border">
      <div className="p-4">
        <FixedSizeGrid
          columnCount={columnCount}
          columnWidth={itemWidth}
          height={gridHeight}
          rowCount={rowCount}
          rowHeight={itemHeight}
          width={windowSize.width ? windowSize.width * 0.8 : 800}
          overscanRowCount={2} // Overscan to improve perceived performance
          className="focus:outline-none"
          ref={gridRef}
        >
          {Cell}
        </FixedSizeGrid>
      </div>
    </ScrollArea>
  );
});

BooksGrid.displayName = 'BooksGrid';
