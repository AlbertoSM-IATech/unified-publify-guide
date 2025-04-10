
import { BookOpen, FolderIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Collection {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadLibros: number;
  fechaCreacion: string;
  libros: number[];
}

interface CollectionGridItemProps {
  collection: Collection;
}

export const CollectionGridItem = ({ collection }: CollectionGridItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <div className="card-hover group rounded-lg border bg-card shadow-sm h-full flex overflow-hidden">
        {/* Left side - Icon */}
        <div className="bg-primary/10 flex items-center justify-center p-6 w-1/4">
          <FolderIcon size={48} className="text-primary" />
        </div>
        
        {/* Right side - Content */}
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">{collection.nombre}</h3>
              <span className="flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                {collection.cantidadLibros} libros
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {collection.descripcion}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {collection.libros.slice(0, 3).map((libroId) => (
                <div
                  key={libroId}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground"
                >
                  <BookOpen size={14} />
                </div>
              ))}
              {collection.libros.length > 3 && (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  +{collection.libros.length - 3}
                </div>
              )}
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">
              Creada: {new Date(collection.fechaCreacion).toLocaleDateString()}
            </span>
            <Link 
              to={`/biblioteca/colecciones/${collection.id}`}
              className="text-xs font-medium text-primary hover:underline"
            >
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
