
import { Book } from "../types/bookTypes";
import { BookGridItem } from "./BookGridItem";
import { memo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { coleccionesSimuladas } from "../utils/mockData/coleccionesData";
import { Collection } from "../../Colecciones/types/collectionTypes";
import { investigacionesSimuladas } from "../utils/mockData/investigacionesData"; // Importar datos de investigaciones

// Definir un tipo simple para Investigación si no existe uno más complejo
interface Investigation {
  id: number;
  titulo: string;
  // otros campos relevantes si los hay
}

interface BooksGridProps {
  libros: Book[];
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BooksGrid = memo(({ libros, getStatusColor, getContentColor }: BooksGridProps) => {
  const [collections, setCollections] = useLocalStorage<Collection[]>(
    'coleccionesData',
    coleccionesSimuladas
  );
  
  const [investigations, setInvestigations] = useLocalStorage<Investigation[]>(
    'investigacionesData',
    investigacionesSimuladas
  );
  
  // If there are no books, show empty state
  if (libros.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center border rounded-lg bg-card shadow-sm">
        <p className="text-muted-foreground">No hay libros que coincidan con tu búsqueda</p>
      </div>
    );
  }

  // Get collection names for each book based on its coleccionesIds
  const getBookCollections = (book: Book) => {
    if (!book.coleccionesIds || book.coleccionesIds.length === 0) return [];
    
    return collections
      .filter(col => book.coleccionesIds?.includes(col.id))
      .map(col => ({
        id: col.id,
        nombre: col.nombre
      }));
  };

  // Get related investigation name for the book
  const getBookInvestigationName = (book: Book): string | undefined => {
    if (!book.investigacionId) return undefined;
    const investigation = investigations.find(inv => inv.id === book.investigacionId);
    return investigation?.titulo;
  };

  return (
    <div className="w-full">
      {/* Modificado para mostrar 2 columnas en md y superior, 1 en sm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {libros.map((libro) => (
          <div key={libro.id} className="h-full">
            <BookGridItem
              libro={libro}
              getStatusColor={getStatusColor}
              getContentColor={getContentColor}
              collections={getBookCollections(libro)}
              investigationName={getBookInvestigationName(libro)}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

BooksGrid.displayName = 'BooksGrid';
