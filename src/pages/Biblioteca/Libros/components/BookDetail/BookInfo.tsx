
import { Eye, ExternalLink, Tag } from "lucide-react";
import { Book } from "../../types/bookTypes";
import { generateAmazonLink } from "../../utils/bookDetailUtils";
import { motion } from "framer-motion";

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
    <motion.div 
      className="p-4 space-y-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <h2 className="font-bold text-xl font-heading text-foreground">{book.titulo}</h2>
      {book.subtitulo && <p className="text-sm text-muted-foreground">{book.subtitulo}</p>}
      <p className="text-base font-semibold">Por {book.autor}</p>

      <div className="flex flex-wrap gap-2 mt-2">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
            book.estado
          )}`}
        >
          {book.estado}
        </motion.span>
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getContentColor(
            book.contenido
          )}`}
        >
          {book.contenido}
        </motion.span>
      </div>

      {asin && (
        <motion.div 
          className="flex items-center gap-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Tag size={14} className="text-muted-foreground" />
          <span>ASIN: {asin}</span>
        </motion.div>
      )}

      {book.isbn && (
        <motion.div 
          className="flex items-center gap-2 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Tag size={14} className="text-muted-foreground" />
          <span>ISBN: {book.isbn}</span>
        </motion.div>
      )}

      {amazonLink && (
        <motion.div 
          className="mt-3"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <a
            href={amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ExternalLink size={14} className="mr-1" />
            Ver en Amazon
          </a>
        </motion.div>
      )}

      <motion.div 
        className="border-t border-border pt-3 mt-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Regalías netas (estimado):</span>
          <span className="text-lg font-semibold text-green-600">
            {calculateNetRoyalties(primaryFormat)}€
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
