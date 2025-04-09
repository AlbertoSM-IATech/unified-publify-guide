
import { Eye, ExternalLink, Tag, Calendar, BookOpen, Copy } from "lucide-react";
import { Book } from "../../types/bookTypes";
import { generateAmazonLink } from "../../utils/bookDetailUtils";
import { getContentHexColor } from "../../utils/librosUtils";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

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
  const [showHtmlCode, setShowHtmlCode] = useState(false);
  
  // Obtener el formato principal para mostrar ASIN
  const primaryFormat = book.hardcover || book.paperback || book.ebook;
  const asin = primaryFormat?.asin || book.asin;
  const amazonLink = generateAmazonLink(asin);
  
  // Get content specific color for styling
  const contentColor = getContentHexColor(book.contenido);

  // Handle copying HTML code to clipboard
  const handleCopyHtml = () => {
    if (book.descripcionHtml) {
      navigator.clipboard.writeText(book.descripcionHtml)
        .then(() => {
          toast({
            title: "Código HTML copiado",
            description: "El código HTML de la descripción ha sido copiado al portapapeles",
          });
        })
        .catch(() => {
          toast({
            title: "Error al copiar",
            description: "No se pudo copiar el código HTML",
            variant: "destructive"
          });
        });
    }
  };

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
      
      <p className="text-lg font-medium">Por <span className="text-foreground" style={{color: contentColor}}>{book.autor}</span></p>

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
        
        {book.bsr && (
          <motion.div 
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <BookOpen size={16} className="text-muted-foreground" />
            <span>BSR: <span className="font-medium">#{book.bsr}</span></span>
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
              {book.descripcionHtml ? (
                <p 
                  className="text-sm text-muted-foreground" 
                  dangerouslySetInnerHTML={{ __html: book.descripcionHtml }}
                />
              ) : (
                <p className="text-sm text-muted-foreground">{book.descripcion}</p>
              )}
            </div>
          </motion.div>
        )}
        
        {/* HTML Code Section - Always shown with expandable UI */}
        {book.descripcionHtml && (
          <motion.div 
            className="pt-4 mt-2 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex flex-row items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Código HTML para Amazon</h3>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyHtml}
                className="text-[#FB923C] border-[#FB923C]/30 hover:bg-[#FB923C]/5"
              >
                <Copy size={14} className="mr-1" />
                Copiar HTML
              </Button>
            </div>
            
            <motion.div
              initial={{ height: showHtmlCode ? "auto" : "48px", opacity: 1 }}
              animate={{ height: showHtmlCode ? "auto" : "48px", opacity: 1 }}
              className="mt-1 p-3 bg-black/5 dark:bg-white/5 rounded-md overflow-hidden border border-border relative"
            >
              <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-mono max-h-48 overflow-auto">
                {book.descripcionHtml}
              </pre>
              
              {!showHtmlCode && (
                <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/90 to-background/0 cursor-pointer"
                     onClick={() => setShowHtmlCode(true)}>
                  <Button variant="ghost" size="sm" className="mb-2">
                    Mostrar todo
                  </Button>
                </div>
              )}
              
              {showHtmlCode && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowHtmlCode(false)}
                  className="mt-2 w-full"
                >
                  Ocultar
                </Button>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 pt-3">
        {amazonLink && (
          <motion.div 
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#FB923C] hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#FB923C] rounded-sm"
            >
              <ExternalLink size={16} className="mr-2" />
              Ver en Amazon
            </a>
          </motion.div>
        )}
        
        {book.landingPageUrl && (
          <motion.div 
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a
              href={book.landingPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#3B82F6] hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#3B82F6] rounded-sm"
            >
              <ExternalLink size={16} className="mr-2" />
              Landing Page
            </a>
          </motion.div>
        )}
      </div>

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
