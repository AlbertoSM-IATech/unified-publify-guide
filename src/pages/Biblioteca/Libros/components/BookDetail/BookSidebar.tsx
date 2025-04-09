
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
        boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.15), 0 8px 10px -6px rgba(251, 146, 60, 0.15)",
        borderColor: "rgba(251, 146, 60, 0.3)"
      }}
      className="transition-all duration-300"
    >
      <Card className="overflow-hidden bg-card shadow-md border dark:border-slate-800 hover:border-[#FB923C]/30">
        <div className="flex flex-col">
          <div className="relative">
            <BookCover 
              book={book} 
              isEditing={isEditing}
              onUpdateBook={onUpdateBook}
            />
          </div>
          <BookInfo 
            book={book} 
            getStatusColor={getStatusColor} 
            getContentColor={getContentColor}
            calculateNetRoyalties={calculateNetRoyalties}
          />
        </div>
      </Card>
    </motion.div>
  );
};
