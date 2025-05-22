
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
        {/* Main BSR - Se muestra solo si existe */}
        {book.bsr && (
          <div className="flex items-center text-sm">
            <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
            <span>General: #{book.bsr}</span>
          </div>
        )}
        
        {/* Hardcover BSR */}
        <div className="flex items-center text-sm">
          <Trophy className={`w-4 h-4 mr-2 ${book.hardcover?.bsr ? 'text-yellow-500' : 'text-gray-400'}`} />
          <span>
            Tapa dura: {book.hardcover?.bsr ? `#${book.hardcover.bsr}` : <span className="text-muted-foreground">No definido</span>}
          </span>
        </div>

        {/* Paperback BSR */}
        <div className="flex items-center text-sm">
          <Trophy className={`w-4 h-4 mr-2 ${book.paperback?.bsr ? 'text-yellow-500' : 'text-gray-400'}`} />
          <span>
            Tapa blanda: {book.paperback?.bsr ? `#${book.paperback.bsr}` : <span className="text-muted-foreground">No definido</span>}
          </span>
        </div>

        {/* eBook BSR */}
        <div className="flex items-center text-sm">
          <Trophy className={`w-4 h-4 mr-2 ${book.ebook?.bsr ? 'text-yellow-500' : 'text-gray-400'}`} />
          <span>
            eBook: {book.ebook?.bsr ? `#${book.ebook.bsr}` : <span className="text-muted-foreground">No definido</span>}
          </span>
        </div>
        
        {/* Mensaje si ningún ranking está disponible */}
        {!book.bsr && !book.hardcover?.bsr && !book.paperback?.bsr && !book.ebook?.bsr && (
          <span className="text-sm text-muted-foreground">Sin rankings disponibles</span>
        )}
      </div>
    </div>
  );
};

