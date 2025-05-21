
import { FileText } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Investigacion } from "../../types/investigacionTypes";

interface InvestigacionListCardProps {
  investigacion: Investigacion;
  onSelect: (investigacion: Investigacion) => void;
}

export const InvestigacionListCard = ({ investigacion, onSelect }: InvestigacionListCardProps) => {
  return (
    <motion.div
      key={investigacion.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onClick={() => onSelect(investigacion)}
      className="h-full"
    >
      <div className="card-hover group cursor-pointer rounded-lg border bg-card shadow-sm h-full flex overflow-hidden">
        <div className="bg-primary/10 flex items-center justify-center p-6 w-1/4">
          <FileText size={48} className="text-primary" />
        </div>
        
        <div className="p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">{investigacion.titulo}</h3>
              <div className="rounded-md px-2 py-1 text-xs bg-secondary/10 text-secondary-foreground">
                <Link 
                  to={`/biblioteca/libros/${investigacion.libroId}`} 
                  onClick={(e) => e.stopPropagation()} // Evita que el click en el link seleccione la tarjeta
                  className="hover:underline"
                >
                  {investigacion.libroTitulo}
                </Link>
              </div>
            </div>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {investigacion.descripcion}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <span>
              Actualizada: {new Date(investigacion.fechaActualizacion).toLocaleDateString()}
            </span>
            <span className="font-medium text-primary group-hover:underline">
              Abrir investigación
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
