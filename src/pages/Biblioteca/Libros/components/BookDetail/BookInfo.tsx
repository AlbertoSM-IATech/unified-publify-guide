
import { ExternalLink, Tag, Calendar, BookOpen, Copy, CheckCheck, Euro } from "lucide-react";
import { Book, BookFormat } from "../../types/bookTypes";
import { generateAmazonLink } from "../../utils/bookDetailUtils";
import { getContentHexColor, formatDecimal } from "../../utils/formatUtils";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

interface BookInfoProps {
  book: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
  calculateNetRoyalties: (format?: BookFormat) => string;
}

export const BookInfo = ({
  book,
  getStatusColor,
  getContentColor,
  calculateNetRoyalties,
}: BookInfoProps) => {
  const [copied, setCopied] = useState(false);
  const [netRoyalties, setNetRoyalties] = useState("0,00");

  // Obtener el formato principal para mostrar ASIN
  const primaryFormat = book.paperback || book.hardcover || book.ebook;
  const asin = primaryFormat?.asin || book.asin;
  const amazonLink = generateAmazonLink(asin);

  // Get content specific color for styling
  const contentColor = getContentHexColor(book.contenido);

  // Update royalties when book data changes
  useEffect(() => {
    if (primaryFormat) {
      // Calculate net royalties
      const price = primaryFormat.price || 0;
      const royaltyPercentage = primaryFormat.royaltyPercentage || 0;
      const printingCost = primaryFormat.printingCost || 0;
      
      // Formula: (Price * RoyaltyPercentage) - PrintingCost
      const royaltyAmount = price * royaltyPercentage;
      const netRoyalty = Math.max(0, royaltyAmount - printingCost);
      
      // Format with comma for display
      setNetRoyalties(formatDecimal(netRoyalty));
    }
  }, [book, primaryFormat, calculateNetRoyalties]);

  // Handle copying text to clipboard
  const copyToClipboard = (text: string, message: string = "copiado") => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        description: `${message} al portapapeles`
      });
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      toast({
        title: "Error al copiar",
        description: `No se pudo copiar ${message.toLowerCase()}`,
        variant: "destructive"
      });
    });
  };

  return (
    <Card className="shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
      <motion.div 
        className="p-6 space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="space-y-1">
          <h2 className="font-bold text-2xl font-heading text-blue-500">{book.titulo}</h2>
          {book.subtitulo && <p className="italic text-muted-foreground font-normal text-base">{book.subtitulo}</p>}
        </div>
        
        <p className="text-lg font-medium">
          Por <span className="text-foreground" style={{ color: contentColor }}>{book.autor}</span>
        </p>

        <div className="flex flex-wrap gap-2 mt-3">
          <motion.span 
            whileHover={{ scale: 1.05 }} 
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${getStatusColor(book.estado)}`}
          >
            {book.estado}
          </motion.span>
          <motion.span 
            whileHover={{ scale: 1.05 }} 
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium ${getContentColor(book.contenido)}`}
          >
            {book.contenido}
          </motion.span>
        </div>

        <div className="space-y-2 pt-2">
          {book.fechaPublicacion && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-sm my-[16px]"
            >
              <Calendar size={16} className="text-muted-foreground" />
              <span>
                Publicado: <span className="font-medium">{new Date(book.fechaPublicacion).toLocaleDateString()}</span>
              </span>
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
              <span>
                BSR: <span className="font-medium">#{book.bsr}</span>
              </span>
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
              className="flex items-center"
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
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 ml-1 text-muted-foreground hover:text-[#3B82F6]"
                onClick={() => copyToClipboard(book.landingPageUrl, "URL de Landing Page")}
              >
                <Copy size={14} />
              </Button>
            </motion.div>
          )}
        </div>

        <motion.div 
          className="mt-4 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-md border shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Regalías netas (estimado):</span>
            <span className="font-bold text-green-600 text-3xl">
              {netRoyalties}€
            </span>
          </div>
        </motion.div>
      </motion.div>
    </Card>
  );
};
