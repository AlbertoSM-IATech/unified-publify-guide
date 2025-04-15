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
import { filterLibros, sortLibros } from "./utils/dataUtils";
import { supabaseService } from "@/services/supabase";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";

export const LibrosList = () => {
  // Retrieve view mode from localStorage or default to "grid"
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    const savedMode = localStorage.getItem("libroViewMode");
    return (savedMode === "list" || savedMode === "grid") ? savedMode : "grid";
  });
  
  // Search, filter, and sort state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterContent, setFilterContent] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  
  // Use the synced data hook to keep the books data in sync across the app
  const [libros, setLibros] = useSyncedData<Book[]>([], "librosData");
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Add pagination state to improve performance
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjust based on testing for optimal performance

  // Persist view mode in localStorage
  useEffect(() => {
    localStorage.setItem("libroViewMode", viewMode);
  }, [viewMode]);
  
  // Load books from Supabase or localStorage
  useEffect(() => {
    const loadBooks = async () => {
      setIsLoading(true);
      setLoadError(null);
      
      try {
        // Try to fetch from Supabase
        const supabaseBooks = await supabaseService.books.getAll();
        
        // If we get books from Supabase, use them
        if (supabaseBooks && supabaseBooks.length > 0) {
          console.log("Books loaded from Supabase:", supabaseBooks);
          setLibros(supabaseBooks);
        } else {
          console.log("No books found in Supabase, using mock data");
          // Check localStorage first
          const storedBooks = localStorage.getItem('librosData');
          if (storedBooks) {
            setLibros(JSON.parse(storedBooks));
          } else {
            setLibros(librosSimulados);
            // Save mock data to localStorage for persistence
            localStorage.setItem('librosData', JSON.stringify(librosSimulados));
          }
        }
      } catch (error) {
        console.error("Error loading books:", error);
        setLoadError("No se pudieron cargar los libros. Usando datos locales.");
        
        // Fallback to localStorage and then to mock data
        const storedBooks = localStorage.getItem('librosData');
        if (storedBooks) {
          setLibros(JSON.parse(storedBooks));
        } else {
          setLibros(librosSimulados);
          localStorage.setItem('librosData', JSON.stringify(librosSimulados));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBooks();
  }, [setLibros]);

  // Memoize the filtered books to prevent unnecessary recalculations
  const filteredLibros = useMemo(() => {
    // First apply text search filter
    let result = filterLibros(libros, searchQuery);
    
    // Then apply state filter if set
    if (filterState) {
      result = result.filter(libro => libro.estado === filterState);
    }
    
    // Then apply content filter if set
    if (filterContent) {
      result = result.filter(libro => libro.contenido === filterContent);
    }
    
    // Finally, apply sorting
    if (sortOrder) {
      const [field, direction] = sortOrder.split('_');
      result = sortLibros(result, field, direction);
    }
    
    return result;
  }, [libros, searchQuery, filterState, filterContent, sortOrder]);
  
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

  const handleCreateBook = useCallback(async (newBook: Book) => {
    try {
      // Try to create in Supabase
      const createdBook = await supabaseService.books.create(newBook);
      
      let bookToAdd = newBook;
      if (createdBook) {
        console.log("Book created in Supabase:", createdBook);
        bookToAdd = createdBook;
      }
      
      // Update local state
      const updatedBooks = [...libros, bookToAdd];
      setLibros(updatedBooks);
      
      // Update localStorage for persistence
      localStorage.setItem('librosData', JSON.stringify(updatedBooks));
      
      toast({
        title: "Libro creado",
        description: `El libro "${newBook.titulo}" ha sido creado con éxito.`
      });
    } catch (error) {
      console.error("Error creating book:", error);
      // Still update local state even if Supabase fails
      const updatedBooks = [...libros, newBook];
      setLibros(updatedBooks);
      localStorage.setItem('librosData', JSON.stringify(updatedBooks));
      
      toast({
        title: "Libro creado (modo local)",
        description: `El libro "${newBook.titulo}" ha sido creado localmente.`
      });
    }
  }, [libros, setLibros]);
  
  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Reset to first page when search query or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterState, filterContent, sortOrder]);

  // Handle retry loading
  const handleRetryLoading = useCallback(() => {
    setLoadError(null);
    setIsLoading(true);
    // Use setTimeout to avoid infinite loop if error persists
    setTimeout(() => {
      // Set libros directly from mock data
      setLibros(librosSimulados);
      // Save mock data to localStorage for persistence
      localStorage.setItem('librosData', JSON.stringify(librosSimulados));
      setIsLoading(false);
    }, 500);
  }, [setLibros]);

  return (
    <div className="animate-fade-in">
      <LibraryHeader onCreateBook={handleOpenCreateDialog} />

      <BooksToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        filterState={filterState}
        setFilterState={setFilterState}
        filterContent={filterContent}
        setFilterContent={setFilterContent}
      />

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <LoadingState text="Cargando libros..." size="lg" />
        </div>
      ) : loadError ? (
        <ErrorState 
          title="Error al cargar datos"
          message="No se pudieron cargar los datos de libros. Se usarán datos locales."
          onRetry={handleRetryLoading}
          fullPage={false}
          className="my-8"
        />
      ) : viewMode === "grid" ? (
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
      {!isLoading && !loadError && totalPages > 1 && (
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
