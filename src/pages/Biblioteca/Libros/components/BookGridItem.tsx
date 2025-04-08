
import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { 
  Card, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Eye } from "lucide-react";
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
        transition={{ duration: 0.2 }}
      >
        <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
          {/* Book cover */}
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
            {libro.imageUrl ? (
              <img
                src={libro.imageUrl}
                alt={libro.titulo}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-secondary/10">
                <span className="font-heading text-xl font-semibold text-foreground/70">{libro.titulo}</span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-2">
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(
                  libro.estado
                )}`}
              >
                {libro.estado}
              </span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getContentColor(
                  libro.contenido
                )}`}
              >
                {libro.contenido}
              </span>
            </div>
          </div>

          <CardContent className="p-3">
            <h3 className="line-clamp-2 text-base font-semibold mt-1">{libro.titulo}</h3>
            <p className="line-clamp-1 text-sm text-muted-foreground">{libro.autor}</p>
          </CardContent>

          <CardFooter className="border-t p-3 flex justify-between items-center text-sm">
            <span className="text-muted-foreground">{libro.isbn}</span>
            <span className="flex items-center text-primary">
              <Eye className="mr-1 h-3 w-3" />
              Ver detalle
            </span>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};
