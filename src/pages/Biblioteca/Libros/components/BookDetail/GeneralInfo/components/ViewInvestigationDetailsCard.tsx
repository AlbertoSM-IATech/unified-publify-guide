
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Investigacion } from "../../../../utils/relationDataService";

interface ViewInvestigationDetailsCardProps {
  investigacion: Investigacion;
}

export const ViewInvestigationDetailsCard = ({ investigacion }: ViewInvestigationDetailsCardProps) => {
  return (
    <motion.div
      className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-200 dark:border-slate-800"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">{investigacion.titulo}</h4>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {investigacion.descripcion}
        </p>
        <Link
          to={`/biblioteca/investigaciones`} // Consider making this path dynamic or configurable if needed
          state={{ selectInvestigacion: investigacion.id }}
          className="flex items-center text-sm text-primary hover:underline hover:text-[#FB923C] transition-colors duration-200"
        >
          <ExternalLink size={14} className="mr-1" />
          Ver investigación
        </Link>
      </div>
    </motion.div>
  );
};
