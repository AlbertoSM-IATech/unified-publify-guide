import { useState, useEffect } from "react";
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

  const filteredLibros = libros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.isbn.includes(searchQuery) ||
      libro.asin.includes(searchQuery)
  );

  const handleOpenCreateDialog = () => {
    setIsCreatingBook(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreatingBook(false);
  };

  const handleCreateBook = (newBook: Book) => {
    // Add the new book to the list
    const updatedLibros = [...libros, newBook];
    setLibros(updatedLibros);
    
    toast({
      title: "Libro creado",
      description: `El libro "${newBook.titulo}" ha sido creado con éxito.`
    });
  };

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
