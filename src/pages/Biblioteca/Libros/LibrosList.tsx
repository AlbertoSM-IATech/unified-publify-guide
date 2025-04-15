
import { useState, useCallback } from "react";
import { BooksToolbar } from "./components/BooksToolbar";
import { BooksContent } from "./components/BooksContent";
import { LibraryHeader } from "./components/LibraryHeader";
import { BookCreateDialog } from "./components/BookCreateDialog";
import { useViewMode } from "./hooks/useViewMode";
import { useBooks } from "./hooks/useBooks";
import { useBookFilters } from "./hooks/useBookFilters";

export const LibrosList = () => {
  const [viewMode, setViewMode] = useViewMode("grid");
  const {
    libros,
    isLoading,
    loadError,
    handleRetryLoading,
    handleCreateBook
  } = useBooks();
  
  const {
    searchQuery,
    setSearchQuery,
    filterState,
    setFilterState,
    filterContent,
    setFilterContent,
    sortOrder,
    setSortOrder,
    currentPage,
    totalPages,
    currentItems,
    handlePageChange
  } = useBookFilters({ books: libros });
  
  const [isCreatingBook, setIsCreatingBook] = useState(false);

  // Dialog handlers
  const handleOpenCreateDialog = useCallback(() => {
    setIsCreatingBook(true);
  }, []);

  const handleCloseCreateDialog = useCallback(() => {
    setIsCreatingBook(false);
  }, []);

  // Create book wrapper
  const onCreateBook = useCallback(async (newBook) => {
    const success = await handleCreateBook(newBook);
    if (success) {
      handleCloseCreateDialog();
    }
  }, [handleCreateBook, handleCloseCreateDialog]);

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

      <BooksContent
        libros={currentItems}
        isLoading={isLoading}
        loadError={loadError}
        viewMode={viewMode}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onRetry={handleRetryLoading}
      />

      <BookCreateDialog 
        isOpen={isCreatingBook} 
        onClose={handleCloseCreateDialog} 
        onCreateBook={onCreateBook}
        libros={libros}
      />
    </div>
  );
};

export default LibrosList;
