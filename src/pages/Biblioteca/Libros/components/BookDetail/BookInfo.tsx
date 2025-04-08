
import { Eye, ExternalLink, Tag, Calendar, BookOpen } from "lucide-react";
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
      className="p-6 space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <div className="space-y-1">
        <h2 className="font-bold text-2xl font-heading text-foreground">{book.titulo}</h2>
        {book.subtitulo && <p className="text-base text-muted-foreground italic">{book.subtitulo}</p>}
      </div>
      
      <p className="text-lg font-medium">Por <span className="text-primary">{book.autor}</span></p>

      <div className="flex flex-wrap gap-2 mt-3">
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${getStatusColor(
            book.estado
          )}`}
        >
          {book.estado}
        </motion.span>
        <motion.span
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${getContentColor(
            book.contenido
          )}`}
        >
          {book.contenido}
        </motion.span>
      </div>

      <div className="space-y-2 pt-2">
        {asin && (
          <motion.div 
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Tag size={16} className="text-muted-foreground" />
            <span>ASIN: <span className="font-medium">{asin}</span></span>
          </motion.div>
        )}

        {book.isbn && (
          <motion.div 
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Tag size={16} className="text-muted-foreground" />
            <span>ISBN: <span className="font-medium">{book.isbn}</span></span>
          </motion.div>
        )}
        
        {book.fechaPublicacion && (
          <motion.div 
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Calendar size={16} className="text-muted-foreground" />
            <span>Publicado: <span className="font-medium">{new Date(book.fechaPublicacion).toLocaleDateString()}</span></span>
          </motion.div>
        )}
        
        {book.descripcion && (
          <motion.div 
            className="pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-start gap-2">
              <BookOpen size={16} className="text-muted-foreground mt-1" />
              <p className="text-sm text-muted-foreground">{book.descripcion}</p>
            </div>
          </motion.div>
        )}
      </div>

      {amazonLink && (
        <motion.div 
          className="pt-3"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <a
            href={amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#FB923C] hover:underline font-medium"
          >
            <ExternalLink size={16} className="mr-2" />
            Ver en Amazon
          </a>
        </motion.div>
      )}

      <motion.div 
        className="border-t border-border pt-4 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Regalías netas (estimado):</span>
          <span className="text-xl font-bold text-[#3B82F6]">
            {calculateNetRoyalties(primaryFormat)}€
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};
