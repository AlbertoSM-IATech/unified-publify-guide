
import { BookOpen, Eye, Edit } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface BookGridItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BookGridItem = ({ libro, getStatusColor, getContentColor }: BookGridItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:hover:shadow-primary/10 h-full bg-card border border-border relative group">
        <CardContent className="p-0 h-full">
          <div className="flex flex-col h-full">
            {/* Book cover with proper aspect ratio 1600x2560 */}
            <div className="relative w-full bg-muted flex-shrink-0 overflow-hidden">
              {libro.imageUrl ? (
                <div className="w-full overflow-hidden">
                  <AspectRatio ratio={1600/2560} className="w-full">
                    <motion.img 
                      src={libro.imageUrl} 
                      alt={libro.titulo} 
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AspectRatio>
                </div>
              ) : (
                <AspectRatio ratio={1600/2560} className="w-full">
                  <motion.div 
                    className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/30 to-accent/10"
                    whileHover={{ 
                      backgroundColor: "rgba(251, 146, 60, 0.1)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <BookOpen size={48} className="text-muted-foreground/50" />
                  </motion.div>
                </AspectRatio>
              )}
            </div>
            
            {/* Book information with better spacing */}
            <div className="flex flex-1 flex-col justify-between p-5 gap-4">
              <div className="space-y-2.5">
                <h3 className="font-heading font-semibold text-lg line-clamp-1 text-foreground group-hover:text-primary transition-colors duration-200">
                  <Link to={`/biblioteca/libros/${libro.id}`} className="hover:text-primary transition-colors duration-200">
                    {libro.titulo}
                  </Link>
                </h3>
                
                {libro.subtitulo && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {libro.subtitulo}
                  </p>
                )}
                
                <p className="text-sm font-medium">
                  <span className="text-muted-foreground">Autor:</span> {libro.autor}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-1">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                      libro.estado
                    )}`}
                  >
                    {libro.estado}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getContentColor(
                      libro.contenido
                    )}`}
                  >
                    {libro.contenido}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">ISBN: </span>
                    <span className="font-mono text-xs">{libro.isbn.substring(0, 10)}...</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ASIN: </span>
                    <span className="font-mono text-xs">{libro.asin.substring(0, 10)}...</span>
                  </div>
                </div>
                
                {libro.ebook?.links?.amazon && (
                  <a 
                    href={libro.ebook.links.amazon}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-xs text-primary hover:underline inline-block transition-all duration-200 hover:text-primary/80"
                  >
                    Ver en Amazon →
                  </a>
                )}
              </div>
              
              <div className="flex justify-end space-x-2 pt-1">
                <Link
                  to={`/biblioteca/libros/${libro.id}`}
                  className="flex items-center rounded-md border border-input bg-background px-3 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
                >
                  <Eye size={14} className="mr-1.5" />
                  Ver detalle
                </Link>
                <Link
                  to={`/biblioteca/libros/${libro.id}/edit`}
                  className="flex items-center rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                >
                  <Edit size={14} className="mr-1.5" />
                  Editar
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
        
        {/* Subtle overlay effect on hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  );
};
