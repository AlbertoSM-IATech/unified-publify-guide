
import { useState, useEffect, useMemo, useCallback } from "react";
import { BooksToolbar } from "./components/BooksToolbar";
import { BooksGrid } from "./components/BooksGrid";
import { BooksList } from "./components/BooksList";
import { LibraryHeader } from "./components/LibraryHeader";
import { BookCreateDialog } from "./components/BookCreateDialog";
import { librosSimulados, getStatusColor, getContentColor } from "./utils/librosUtils";
import { Book } from "./types/bookTypes";
import { useSyncedData } from "@/hooks/useSyncedData";
import { toast } from "@/hooks/use-toast";

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
          libros={filteredLibros} 
          getStatusColor={getStatusColor} 
          getContentColor={getContentColor}
        />
      ) : (
        <BooksList 
          libros={filteredLibros} 
          getStatusColor={getStatusColor} 
          getContentColor={getContentColor}
        />
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
