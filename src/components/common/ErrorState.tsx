
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  fullPage?: boolean;
}

/**
 * Error state component for consistent error UIs
 */
export const ErrorState = ({
  title = "Ha ocurrido un error",
  message = "No pudimos cargar la información solicitada. Por favor, intenta de nuevo.",
  onRetry,
  className,
  fullPage = false,
}: ErrorStateProps) => {
  const Component = (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <AlertTriangle className="h-12 w-12 text-destructive" />
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-4">
          Intentar de nuevo
        </Button>
      )}
    </div>
  );
  
  if (fullPage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <div className="max-w-md">{Component}</div>
      </div>
    );
  }
  
  return Component;
};
