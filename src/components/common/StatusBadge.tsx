
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

type StatusType = "pending" | "draft" | "published" | "archived" | "review" | "success" | "error" | "warning" | "info";

interface StatusBadgeProps {
  status: StatusType | string;
  label?: string;
  icon?: ReactNode;
  className?: string;
}

/**
 * StatusBadge component for displaying status indicators with consistent styling
 */
export const StatusBadge = ({ status, label, icon, className }: StatusBadgeProps) => {
  // Get color and default label based on status
  const getStatusConfig = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    // Map of predefined statuses to their configurations
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string; className: string }> = {
      // Status types
      publicado: { 
        variant: "default", 
        label: "Publicado",
        className: "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800" 
      },
      borrador: { 
        variant: "outline", 
        label: "Borrador", 
        className: "bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800" 
      },
      "en revisión": { 
        variant: "secondary", 
        label: "En Revisión", 
        className: "bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800" 
      },
      archivado: { 
        variant: "outline", 
        label: "Archivado", 
        className: "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800" 
      },
      
      // Content types
      "alto contenido": {
        variant: "default",
        label: "Alto Contenido",
        className: "bg-blue-100 text-[#3B82F6] border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
      },
      "medio contenido": { 
        variant: "default", 
        label: "Medio Contenido", 
        className: "bg-orange-100 text-[#FB923C] border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800" 
      },
      "bajo contenido": {
        variant: "default",
        label: "Bajo Contenido",
        className: "bg-emerald-100 text-[#22C55E] border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800"
      },
      
      // Generic types
      pending: { variant: "secondary", label: "Pendiente", className: "" },
      draft: { variant: "outline", label: "Borrador", className: "" },
      published: { variant: "default", label: "Publicado", className: "" },
      archived: { variant: "outline", label: "Archivado", className: "" },
      review: { variant: "secondary", label: "En Revisión", className: "" },
      success: { variant: "default", label: "Éxito", className: "" },
      error: { variant: "destructive", label: "Error", className: "" },
      warning: { variant: "outline", label: "Advertencia", className: "" },
      info: { variant: "secondary", label: "Información", className: "" },
    };
    
    // Return matching config or default
    return statusMap[normalizedStatus] || { variant: "outline", label: status, className: "" };
  };
  
  const { variant, label: defaultLabel, className: statusClassName } = getStatusConfig(status);
  
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.05 }}
    >
      <Badge 
        variant={variant} 
        className={cn("flex items-center gap-1 px-2.5 py-1 text-xs font-medium shadow-sm", statusClassName, className)}
      >
        {icon}
        {label || defaultLabel}
      </Badge>
    </motion.div>
  );
};
