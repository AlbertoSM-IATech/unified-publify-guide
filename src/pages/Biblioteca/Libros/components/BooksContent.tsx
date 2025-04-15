
import { memo } from "react";
import { Book } from "../types/bookTypes";
import { BooksGrid } from "./BooksGrid";
import { BooksList } from "./BooksList";
import { getStatusColor, getContentColor } from "../utils/formatUtils";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface BooksContentProps {
  libros: Book[];
  isLoading: boolean;
  loadError: string | null;
  viewMode: "grid" | "list";
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

export const BooksContent = memo(({
  libros,
  isLoading,
  loadError,
  viewMode,
  currentPage,
  totalPages,
  onPageChange,
  onRetry
}: BooksContentProps) => {
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <LoadingState text="Cargando libros..." size="lg" />
      </div>
    );
  }
  
  if (loadError) {
    return (
      <ErrorState 
        title="Error al cargar datos"
        message="No se pudieron cargar los datos de libros. Se usarán datos locales."
        onRetry={onRetry}
        fullPage={false}
        className="my-8"
      />
    );
  }

  return (
    <>
      {viewMode === "grid" ? (
        <BooksGrid 
          libros={libros} 
          getStatusColor={getStatusColor} 
          getContentColor={getContentColor}
        />
      ) : (
        <BooksList 
          libros={libros} 
          getStatusColor={getStatusColor} 
          getContentColor={getContentColor}
        />
      )}
      
      {/* Pagination controls */}
      {totalPages > 1 && (
        <Pagination className="my-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => 
                // Show first page, last page, and pages around current
                page === 1 || 
                page === totalPages || 
                (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, index, array) => {
                // Add ellipsis if there are gaps
                const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
                
                return (
                  <div key={page} className="flex items-center">
                    {showEllipsisBefore && (
                      <PaginationItem className="cursor-default">
                        <PaginationLink>...</PaginationLink>
                      </PaginationItem>
                    )}
                    
                    <PaginationItem>
                      <PaginationLink 
                        isActive={page === currentPage}
                        onClick={() => onPageChange(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  </div>
                );
              })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
});

BooksContent.displayName = 'BooksContent';
