
import { useState, useEffect, useMemo, useCallback } from "react";
import { BooksToolbar } from "./components/BooksToolbar";
import { BooksGrid } from "./components/BooksGrid";
import { BooksList } from "./components/BooksList";
import { LibraryHeader } from "./components/LibraryHeader";
import { BookCreateDialog } from "./components/BookCreateDialog";
import { librosSimulados } from "./utils/mockData/librosData";
import { getStatusColor, getContentColor } from "./utils/formatUtils";
import { Book } from "./types/bookTypes";
import { useSyncedData } from "@/hooks/useSyncedData";
import { toast } from "@/hooks/use-toast";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export const LibrosList = () => {
  // Retrieve view mode from localStorage or default to "grid"
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    const savedMode = localStorage.getItem("libroViewMode");
    return (savedMode === "list" || savedMode === "grid") ? savedMode : "grid";
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  // Use the synced data hook to keep the books data in sync across the app
  const [libros, setLibros] = useSyncedData<Book[]>(librosSimulados, "librosData");
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  
  // Add pagination state to improve performance
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjust based on testing for optimal performance

  // Persist view mode in localStorage
  useEffect(() => {
    localStorage.setItem("libroViewMode", viewMode);
  }, [viewMode]);

  // Memoize the filtered books to prevent unnecessary recalculations
  const filteredLibros = useMemo(() => {
    return libros.filter(
      (libro) =>
        libro.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        libro.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (libro.isbn && libro.isbn.includes(searchQuery)) ||
        (libro.asin && libro.asin.includes(searchQuery))
    );
  }, [libros, searchQuery]);
  
  // Calculate total pages
  const totalPages = useMemo(() => Math.ceil(filteredLibros.length / itemsPerPage), [filteredLibros, itemsPerPage]);
  
  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLibros.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLibros, currentPage, itemsPerPage]);

  // Use useCallback for event handlers
  const handleOpenCreateDialog = useCallback(() => {
    setIsCreatingBook(true);
  }, []);

  const handleCloseCreateDialog = useCallback(() => {
    setIsCreatingBook(false);
  }, []);

  const handleCreateBook = useCallback((newBook: Book) => {
    // Fix: Pass the new array directly instead of a function
    const updatedBooks = [...libros, newBook];
    setLibros(updatedBooks);
    
    toast({
      title: "Libro creado",
      description: `El libro "${newBook.titulo}" ha sido creado con éxito.`
    });
  }, [libros, setLibros]);
  
  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="animate-fade-in">
      <LibraryHeader onCreateBook={handleOpenCreateDialog} />

      <BooksToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === "grid" ? (
        <BooksGrid 
          libros={currentItems} 
          getStatusColor={getStatusColor} 
          getContentColor={getContentColor}
        />
      ) : (
        <BooksList 
          libros={currentItems} 
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
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
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
                        onClick={() => handlePageChange(page)}
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
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <BookCreateDialog 
        isOpen={isCreatingBook} 
        onClose={handleCloseCreateDialog} 
        onCreateBook={handleCreateBook}
        libros={libros}
      />
    </div>
  );
};

export default LibrosList;
