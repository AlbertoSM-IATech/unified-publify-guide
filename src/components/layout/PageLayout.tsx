
import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMemo } from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  showBreadcrumbs?: boolean;
}

/**
 * Standard page layout component with consistent styling and structure
 */
export const PageLayout = ({
  children,
  title,
  subtitle,
  className,
  showBreadcrumbs = true,
}: PageLayoutProps) => {
  const location = useLocation();
  
  // Generate breadcrumbs based on current path
  const breadcrumbs = useMemo(() => {
    if (!showBreadcrumbs) return [];
    
    const pathSegments = location.pathname
      .split('/')
      .filter(Boolean);
    
    const breadcrumbItems = pathSegments.map((segment, index) => {
      // Convert segment to more readable format
      const readableSegment = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Check if this is the last segment
      const isLast = index === pathSegments.length - 1;
      
      // Generate path for this breadcrumb
      const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
      
      return {
        label: readableSegment,
        path,
        isLast
      };
    });
    
    return breadcrumbItems;
  }, [location.pathname, showBreadcrumbs]);
  
  return (
    <div className={cn("animate-fade-in px-4 py-6 md:px-6", className)}>
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            
            {breadcrumbs.map((crumb, i) => (
              <BreadcrumbItem key={i}>
                {crumb.isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <>
                    <BreadcrumbLink asChild>
                      <Link to={crumb.path}>{crumb.label}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      )}
      
      {(title || subtitle) && (
        <header className="mb-8">
          {title && <h1 className="font-heading text-3xl font-bold md:text-4xl">{title}</h1>}
          {subtitle && <p className="mt-2 text-lg text-muted-foreground">{subtitle}</p>}
        </header>
      )}
      
      <main>{children}</main>
    </div>
  );
};
