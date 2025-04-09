
import { Card } from "@/components/ui/card";
import { BookCover } from "./BookCover";
import { BookInfo } from "./BookInfo";
import { calculateNetRoyalties } from "../../utils/bookDetailUtils";
import { getStatusColor, getContentColor } from "../../utils/librosUtils";
import { Book } from "../../types/bookTypes";
import { motion } from "framer-motion";

interface BookSidebarProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const BookSidebar = ({ book, isEditing, onUpdateBook }: BookSidebarProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.1), 0 8px 10px -6px rgba(251, 146, 60, 0.1)"
      }}
    >
      <Card className="overflow-hidden bg-card shadow-md border dark:border-slate-800">
        <BookCover 
          book={book} 
          isEditing={isEditing}
          onUpdateBook={onUpdateBook}
        />
        <BookInfo 
          book={book} 
          getStatusColor={getStatusColor} 
          getContentColor={getContentColor}
          calculateNetRoyalties={calculateNetRoyalties}
        />
      </Card>
    </motion.div>
  );
};
