
import { useState } from "react";
import { Plus } from "lucide-react";
import { BooksToolbar } from "./components/BooksToolbar";
import { BooksGrid } from "./components/BooksGrid";
import { BooksList } from "./components/BooksList";
import { librosSimulados, getStatusColor, getContentColor } from "./utils/librosUtils";

const LibrosList = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [libros, setLibros] = useState(librosSimulados);

  // Filter books by search
  const filteredLibros = libros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.isbn.includes(searchQuery) ||
      libro.asin.includes(searchQuery)
  );

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Biblioteca</h1>
          <p className="mt-1 text-muted-foreground">Gestiona tus libros y colecciones</p>
        </div>
        <button className="mt-4 flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 md:mt-0">
          <Plus size={18} className="mr-2" />
          Nuevo Libro
        </button>
      </div>

      {/* Filters and search bar */}
      <BooksToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Book list */}
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
    </div>
  );
};

export default LibrosList;
