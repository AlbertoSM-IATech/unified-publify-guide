
import { Card } from "@/components/ui/card";
import { BookCover } from "./BookCover";
import { BookSummary } from "./BookInfo/BookSummary";
import { Book } from "../../types/bookTypes";
import { motion } from "framer-motion";

interface BookSidebarProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const BookSidebar = ({
  book,
  isEditing,
  onUpdateBook
}: BookSidebarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -5,
        boxShadow: "0 15px 30px -10px rgba(251, 146, 60, 0.3)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="transition-all duration-300"
    >
      <Card className="overflow-hidden bg-card shadow-md border border-neutral-200 dark:border-neutral-700 hover:border-[#FB923C]/40 transition-all duration-300">
        <div className="flex flex-col">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <BookCover book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
          </motion.div>
          <div className="p-6 py-0 px-[10px]">
            <BookSummary book={book} isEditing={isEditing} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
