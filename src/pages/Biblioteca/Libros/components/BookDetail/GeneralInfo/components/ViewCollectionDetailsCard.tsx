
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Coleccion } from "../../../../utils/relationDataService";

interface ViewCollectionDetailsCardProps {
  coleccion: Coleccion;
}

export const ViewCollectionDetailsCard = ({ coleccion }: ViewCollectionDetailsCardProps) => {
  return (
    <motion.div
      className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-200 dark:border-slate-800"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{coleccion.titulo}</h4>
          {coleccion.estado && <Badge variant="outline" className="text-xs">{coleccion.estado}</Badge>}
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {coleccion.descripcion}
        </p>
        <Link
          to={`/biblioteca/colecciones/${coleccion.id}`} // Assuming this path structure
          className="flex items-center text-sm text-primary hover:underline hover:text-[#FB923C] transition-colors duration-200"
        >
          <ExternalLink size={14} className="mr-1" />
          Ver serie
        </Link>
      </div>
    </motion.div>
  );
};

