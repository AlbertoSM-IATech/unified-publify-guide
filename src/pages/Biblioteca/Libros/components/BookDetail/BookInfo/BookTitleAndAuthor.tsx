
import { Book } from "../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface BookTitleAndAuthorProps {
  book: Book;
  handleOpenUrl: (url: string) => void;
}

export const BookTitleAndAuthor = ({ book, handleOpenUrl }: BookTitleAndAuthorProps) => {
  return (
    <>
      <div className="space-y-1">
        <h2 className="font-bold text-2xl font-heading text-blue-500">{book.titulo}</h2>
        {book.subtitulo && (
          <p className="italic text-muted-foreground font-normal text-base">{book.subtitulo}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
        <span className="text-lg font-medium">Por:</span>
        <Button 
          variant="link" 
          className="text-lg p-0 h-auto" 
          onClick={() => book.authorPageUrl && handleOpenUrl(book.authorPageUrl)}
          disabled={!book.authorPageUrl}
        >
          {book.autor}
        </Button>
      </div>
    </>
  );
};
