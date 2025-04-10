
import { Card } from "@/components/ui/card";
import { BookCover } from "./BookCover";
import { BookInfo } from "./BookInfo";
import { calculateNetRoyalties } from "../../utils/bookDetailUtils";
import { getStatusColor, getContentColor } from "../../utils/librosUtils";
import { Book } from "../../types/bookTypes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface BookSidebarProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const BookSidebar = ({ book, isEditing, onUpdateBook }: BookSidebarProps) => {
  const [copied, setCopied] = useState(false);

  // Reset copied state after 2 seconds
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (copied) {
      timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  // Función para copiar texto al portapapeles
  const copyToClipboard = (text: string) => {
    if (!navigator.clipboard) {
      // Fallback para navegadores que no soporten clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopied(true);
        toast({ description: "Texto copiado al portapapeles" });
      } catch (err) {
        toast({ 
          title: "Error al copiar", 
          description: "No se pudo copiar el texto",
          variant: "destructive" 
        });
      }
      
      document.body.removeChild(textArea);
      return;
    }
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({ description: "Texto copiado al portapapeles" });
    }).catch(() => {
      toast({ 
        title: "Error al copiar", 
        description: "No se pudo copiar el texto",
        variant: "destructive" 
      });
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.15), 0 8px 10px -6px rgba(251, 146, 60, 0.15)",
        borderColor: "rgba(251, 146, 60, 0.3)"
      }}
      className="transition-all duration-300"
    >
      <Card className="overflow-hidden bg-card shadow-md border border-slate-200 dark:border-slate-800 hover:border-[#FB923C]/30">
        <div className="flex flex-col">
          <div className="relative">
            <BookCover 
              book={book} 
              isEditing={isEditing}
              onUpdateBook={onUpdateBook}
            />
          </div>
          <BookInfo 
            book={book} 
            getStatusColor={getStatusColor} 
            getContentColor={getContentColor}
            calculateNetRoyalties={calculateNetRoyalties}
          />
          
          {/* HTML Description Section */}
          {book.descripcionHtml && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="mb-2 flex justify-between items-center">
                <h4 className="text-sm font-medium">Descripción HTML para Amazon</h4>
                <button
                  onClick={() => copyToClipboard(book.descripcionHtml || '')}
                  className="flex items-center text-xs text-primary hover:text-[#FB923C] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="mr-1" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <ClipboardCopy size={12} className="mr-1" />
                      Copiar HTML
                    </>
                  )}
                </button>
              </div>
              <div className="relative">
                <pre className="text-xs p-3 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 max-h-[200px] overflow-y-auto whitespace-pre-wrap break-all">
                  {book.descripcionHtml}
                </pre>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
