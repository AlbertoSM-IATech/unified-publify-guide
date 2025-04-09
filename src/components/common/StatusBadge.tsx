
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

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
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
      pending: { variant: "secondary", label: "Pendiente" },
      draft: { variant: "outline", label: "Borrador" },
      published: { variant: "default", label: "Publicado" },
      archived: { variant: "outline", label: "Archivado" },
      review: { variant: "secondary", label: "En Revisión" },
      success: { variant: "default", label: "Éxito" },
      error: { variant: "destructive", label: "Error" },
      warning: { variant: "outline", label: "Advertencia" },
      info: { variant: "secondary", label: "Información" },
    };
    
    // Return matching config or default
    return statusMap[normalizedStatus] || { variant: "outline", label: status };
  };
  
  const { variant, label: defaultLabel } = getStatusConfig(status);
  
  return (
    <Badge 
      variant={variant} 
      className={cn("flex items-center gap-1", className)}
    >
      {icon}
      {label || defaultLabel}
    </Badge>
  );
};
