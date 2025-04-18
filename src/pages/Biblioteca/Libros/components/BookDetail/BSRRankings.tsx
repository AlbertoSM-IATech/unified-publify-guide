
import { Trophy } from "lucide-react";
import { Book } from "../../types/bookTypes";

interface BSRRankingsProps {
  book: Book;
}

export const BSRRankings = ({ book }: BSRRankingsProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">BSR Rankings</h3>
      <div className="grid grid-cols-1 gap-2">
        {/* Main BSR */}
        {book.bsr && (
          <div className="flex items-center text-sm">
            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
            <span>General: #{book.bsr}</span>
          </div>
        )}
        
        {/* Format specific BSR */}
        {book.hardcover?.bsr && (
          <div className="flex items-center text-sm">
            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
            <span>Tapa dura: #{book.hardcover.bsr}</span>
          </div>
        )}
        {book.paperback?.bsr && (
          <div className="flex items-center text-sm">
            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
            <span>Tapa blanda: #{book.paperback.bsr}</span>
          </div>
        )}
        {book.ebook?.bsr && (
          <div className="flex items-center text-sm">
            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
            <span>eBook: #{book.ebook.bsr}</span>
          </div>
        )}
        {!book.bsr && !book.hardcover?.bsr && !book.paperback?.bsr && !book.ebook?.bsr && (
          <span className="text-sm text-muted-foreground">Sin rankings disponibles</span>
        )}
      </div>
    </div>
  );
};
