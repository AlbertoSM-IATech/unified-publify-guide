
import { Card } from "@/components/ui/card";
import { BookCover } from "./BookCover";
import { BookInfo } from "./BookInfo";
import { calculateNetRoyalties } from "../../utils/bookDetailUtils";
import { getStatusColor, getContentColor } from "../../utils/librosUtils";
import { Book } from "../../types/bookTypes";

interface BookSidebarProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const BookSidebar = ({ book, isEditing, onUpdateBook }: BookSidebarProps) => {
  return (
    <Card className="overflow-hidden">
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
  );
};
