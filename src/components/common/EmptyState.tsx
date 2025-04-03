
import { cn } from "@/lib/utils";
import { FolderOpen } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./Button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Empty state component for lists and grids
 */
export const EmptyState = ({
  title = "No hay contenido",
  message = "No hay elementos para mostrar en este momento.",
  icon,
  action,
  className,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center", className)}>
      {icon || <FolderOpen className="h-12 w-12 text-muted-foreground/70" />}
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
};
