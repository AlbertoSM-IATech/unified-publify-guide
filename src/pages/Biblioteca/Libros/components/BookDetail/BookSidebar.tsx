
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
      initial={{
        opacity: 0,
        y: 20
      }} 
      animate={{
        opacity: 1,
        y: 0
      }} 
      transition={{
        duration: 0.5
      }} 
      whileHover={{
        boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.2), 0 8px 10px -6px rgba(251, 146, 60, 0.2)",
        borderColor: "rgba(251, 146, 60, 0.4)",
        y: -5
      }} 
      className="transition-all duration-300"
    >
      <Card className="overflow-hidden bg-card shadow-md border border-slate-200 dark:border-slate-800 hover:border-[#FB923C]/30">
        <div className="flex flex-col">
          <div className="relative">
            <BookCover book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
          </div>
          <div className="p-6">
            <BookSummary book={book} isEditing={isEditing} />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
