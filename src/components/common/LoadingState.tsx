
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  text?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullPage?: boolean;
}

/**
 * Loading state component for consistent loading UIs
 */
export const LoadingState = ({
  text = "Cargando...",
  className,
  size = "md",
  fullPage = false,
}: LoadingStateProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };
  
  const Component = (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
  
  if (fullPage) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        {Component}
      </div>
    );
  }
  
  return Component;
};
