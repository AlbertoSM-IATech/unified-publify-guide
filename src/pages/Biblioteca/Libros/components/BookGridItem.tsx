
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Eye, Tag, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface BookGridItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BookGridItem = ({ libro, getStatusColor, getContentColor }: BookGridItemProps) => {
  return (
    <Link to={`/biblioteca/libros/${libro.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg">
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col md:flex-row">
          {/* Book cover - Left side */}
          <div className="relative md:w-1/3 w-full">
            <div className="aspect-[1600/2560] w-full overflow-hidden bg-muted">
              {libro.imageUrl ? (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  src={libro.imageUrl}
                  alt={libro.titulo}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/20 to-background p-4">
                  <span className="text-center font-heading text-lg font-semibold text-foreground/70">{libro.titulo}</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2 bg-gradient-to-t from-black/60 to-transparent">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
                    libro.estado
                  )}`}
                >
                  {libro.estado}
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${getContentColor(
                    libro.contenido
                  )}`}
                >
                  {libro.contenido}
                </motion.span>
              </div>
            </div>
          </div>

          {/* Book info - Right side */}
          <CardContent className="flex flex-col justify-between p-4 md:w-2/3 w-full">
            <div className="space-y-2">
              <h3 className="line-clamp-2 text-lg font-heading font-semibold">{libro.titulo}</h3>
              <p className="line-clamp-1 text-base text-muted-foreground">{libro.autor}</p>
              
              <div className="flex flex-col space-y-1 pt-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Tag className="mr-1 h-3 w-3" />
                  <span>ISBN: {libro.isbn}</span>
                </div>
                {libro.asin && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Tag className="mr-1 h-3 w-3" />
                    <span>ASIN: {libro.asin}</span>
                  </div>
                )}
                {libro.fechaPublicacion && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{new Date(libro.fechaPublicacion).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end text-primary">
              <motion.div 
                whileHover={{ x: 3 }}
                className="flex items-center font-medium"
              >
                <Eye className="mr-1 h-4 w-4" />
                Ver detalle
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};
