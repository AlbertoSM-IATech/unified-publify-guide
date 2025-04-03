
import { Eye, ExternalLink, Tag } from "lucide-react";
import { Book } from "../../types/bookTypes";
import { generateAmazonLink } from "../../utils/bookDetailUtils";

interface BookInfoProps {
  book: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
  calculateNetRoyalties: (format?: any) => string;
}

export const BookInfo = ({
  book,
  getStatusColor,
  getContentColor,
  calculateNetRoyalties,
}: BookInfoProps) => {
  // Obtener el formato principal para mostrar ASIN
  const primaryFormat = book.hardcover || book.paperback || book.ebook;
  const asin = primaryFormat?.asin || book.asin;
  const amazonLink = generateAmazonLink(asin);

  return (
    <div className="p-4 space-y-3">
      <h2 className="font-bold text-xl">{book.titulo}</h2>
      {book.subtitulo && <p className="text-sm text-muted-foreground">{book.subtitulo}</p>}
      <p className="text-base font-semibold">Por {book.autor}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
            book.estado
          )}`}
        >
          {book.estado}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getContentColor(
            book.contenido
          )}`}
        >
          {book.contenido}
        </span>
      </div>

      {asin && (
        <div className="flex items-center gap-2 text-sm">
          <Tag size={14} className="text-muted-foreground" />
          <span>ASIN: {asin}</span>
        </div>
      )}

      {book.isbn && (
        <div className="flex items-center gap-2 text-sm">
          <Tag size={14} className="text-muted-foreground" />
          <span>ISBN: {book.isbn}</span>
        </div>
      )}

      {amazonLink && (
        <div className="mt-3">
          <a
            href={amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ExternalLink size={14} className="mr-1" />
            Ver en Amazon
          </a>
        </div>
      )}

      <div className="border-t border-border pt-3 mt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Regalías netas (estimado):</span>
          <span className="text-lg font-semibold text-green-600">
            {calculateNetRoyalties(primaryFormat)}€
          </span>
        </div>
      </div>
    </div>
  );
};
