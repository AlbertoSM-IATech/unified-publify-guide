
import { memo } from "react";
import { Book } from "../types/bookTypes";
import { BooksGrid } from "./BooksGrid";
import { BooksList } from "./BooksList";
import { getStatusColor, getContentColor } from "../utils/formatUtils";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";
import { EmptyState } from "@/components/common/EmptyState";
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
  console.log("Rendering BooksContent with", libros?.length || 0, "books");
  
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

  if (!libros || libros.length === 0) {
    return (
      <EmptyState
        title="No hay libros"
        message="No hay libros disponibles que coincidan con tu búsqueda."
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
            
            <PaginationItem>
              <PaginationLink isActive>
                {currentPage} de {totalPages}
              </PaginationLink>
            </PaginationItem>
            
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

