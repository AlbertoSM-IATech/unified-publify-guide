import { Book } from "../types/bookTypes";
import { BookGridItem } from "./BookGridItem";
import { memo } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { coleccionesSimuladas } from "../utils/mockData/coleccionesData";
import { Collection } from "../../Colecciones/types/collectionTypes";
import { investigacionesSimuladas } from "../utils/mockData/investigacionesData";

interface Investigation {
  id: number;
  titulo: string;
}

interface BooksGridProps {
  libros: Book[];
}

export const BooksGrid = memo(({ libros }: BooksGridProps) => {
  const [collections, setCollections] = useLocalStorage<Collection[]>(
    'coleccionesData',
    coleccionesSimuladas
  );
  
  const [investigations, setInvestigations] = useLocalStorage<Investigation[]>(
    'investigacionesData',
    investigacionesSimuladas
  );
  
  if (libros.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center border rounded-lg bg-card shadow-sm">
        <p className="text-muted-foreground">No hay libros que coincidan con tu búsqueda</p>
      </div>
    );
  }

  const getBookCollections = (book: Book) => {
    if (!book.coleccionesIds || book.coleccionesIds.length === 0) return [];
    
    return collections
      .filter(col => book.coleccionesIds?.includes(col.id))
      .map(col => ({
        id: col.id,
        nombre: col.nombre
      }));
  };

  const getBookInvestigationName = (book: Book): string | undefined => {
    if (!book.investigacionId) return undefined;
    const investigation = investigations.find(inv => inv.id === book.investigacionId);
    return investigation?.titulo;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {libros.map((libro) => (
          <div key={libro.id} className="h-full">
            <BookGridItem
              libro={libro}
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
