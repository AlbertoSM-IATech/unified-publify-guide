
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
}

/**
 * Standard card component with consistent styling and structure
 */
export const ContentCard = ({
  title,
  description,
  children,
  footer,
  className,
  headerClassName,
  contentClassName,
  footerClassName,
}: ContentCardProps) => {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      {(title || description) && (
        <CardHeader className={headerClassName}>
          {title && (typeof title === "string" ? <CardTitle>{title}</CardTitle> : title)}
          {description && (typeof description === "string" ? <CardDescription>{description}</CardDescription> : description)}
        </CardHeader>
      )}
      <CardContent className={cn("p-6", contentClassName)}>
        {children}
      </CardContent>
      {footer && (
        <CardFooter className={cn("border-t bg-muted/50 px-6 py-4", footerClassName)}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};
