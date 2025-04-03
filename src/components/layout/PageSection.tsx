
import { cn } from "@/lib/utils";

interface PageSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

/**
 * Standard page section component with consistent styling
 * Used to create uniformity across different pages
 */
export const PageSection = ({
  title,
  description,
  children,
  action,
  className,
}: PageSectionProps) => {
  return (
    <section className={cn("mb-6 animate-fade-in", className)}>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">{title}</h1>
          {description && (
            <p className="mt-1 text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </section>
  );
};
