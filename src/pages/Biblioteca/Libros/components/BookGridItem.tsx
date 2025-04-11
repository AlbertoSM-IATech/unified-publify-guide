import { Link } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Tag, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { StatusBadge } from "@/components/common/StatusBadge";
interface BookGridItemProps {
  libro: Book;
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}
export const BookGridItem = ({
  libro,
  getStatusColor,
  getContentColor
}: BookGridItemProps) => {
  return <Link to={`/biblioteca/libros/${libro.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg h-full">
      <motion.div whileHover={{
      y: -5,
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(251, 146, 60, 0.2), 0 8px 10px -6px rgba(251, 146, 60, 0.2)"
    }} whileTap={{
      scale: 0.98
    }} transition={{
      duration: 0.2
    }} className="h-full">
        <Card className="overflow-hidden hover:shadow-lg hover:border-[#FB923C]/30 transition-all duration-300 h-full flex flex-col md:flex-row border dark:border-slate-800">
          {/* Book cover - Left side with proper aspect ratio */}
          <div className="relative md:w-1/3 w-full flex-shrink-0">
            <div className="aspect-[1600/2560] w-full h-full overflow-hidden bg-muted">
              {libro.imageUrl ? <motion.img whileHover={{
              scale: 1.05
            }} transition={{
              duration: 0.3
            }} src={libro.imageUrl} alt={libro.titulo} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-secondary/20 to-background p-4">
                  <span className="text-center font-heading text-lg font-semibold text-foreground/70">{libro.titulo}</span>
                </div>}
            </div>
          </div>

          {/* Book info - Right side */}
          <CardContent className="flex flex-col justify-between p-4 md:w-2/3 w-full">
            <div className="space-y-2">
              <h3 className="line-clamp-2 font-heading font-semibold text-orange-400 text-2xl">{libro.titulo}</h3>
              <p className="line-clamp-1 text-white text-sm">{libro.autor}</p>
              
              {/* Status and content badges moved here */}
              <div className="flex flex-wrap gap-2 my-2 py-[15px]">
                <motion.div whileHover={{
                scale: 1.05
              }} className="inline-block">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getStatusColor(libro.estado)}`}>
                    {libro.estado}
                  </span>
                </motion.div>
                <motion.div whileHover={{
                scale: 1.05
              }} className="inline-block">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getContentColor(libro.contenido)}`}>
                    {libro.contenido}
                  </span>
                </motion.div>
              </div>
              
              <div className="flex flex-col space-y-1 pt-1">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Tag className="mr-1 h-3 w-3" />
                  <span>ISBN: {libro.isbn}</span>
                </div>
                {libro.asin && <div className="flex items-center text-xs text-muted-foreground">
                    <Tag className="mr-1 h-3 w-3" />
                    <span>ASIN: {libro.asin}</span>
                  </div>}
                {libro.fechaPublicacion && <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{new Date(libro.fechaPublicacion).toLocaleDateString()}</span>
                  </div>}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end text-primary">
              <motion.div whileHover={{
              x: 3
            }} className="flex items-center font-medium">
                <Eye className="mr-1 h-4 w-4" />
                Ver detalle
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>;
};