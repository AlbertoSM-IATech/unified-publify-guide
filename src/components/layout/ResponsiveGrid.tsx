
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "none" | "sm" | "md" | "lg";
  className?: string;
}

/**
 * Responsive grid component with configurable columns at different breakpoints
 */
export const ResponsiveGrid = ({
  children,
  columns = { sm: 1, md: 2, lg: 3, xl: 4 },
  gap = "md",
  className,
}: ResponsiveGridProps) => {
  // Generate column classes based on columns prop
  const getColumnClasses = () => {
    const classes = [];
    
    if (columns.sm) classes.push(`grid-cols-${columns.sm}`);
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`);
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`);
    
    return classes.join(" ");
  };
  
  // Map gap sizes to Tailwind classes
  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };
  
  return (
    <div
      className={cn(
        "grid w-full", 
        getColumnClasses(), 
        gapClasses[gap], 
        className
      )}
    >
      {children}
    </div>
  );
};
