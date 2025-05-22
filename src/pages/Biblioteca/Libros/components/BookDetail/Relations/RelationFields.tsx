
import { Book } from "../../../types/bookTypes";
import { InvestigationRelation } from "./InvestigationRelation";
import { CollectionRelation } from "./CollectionRelation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { investigacionesSimuladas } from "../../../utils/mockData/investigacionesData";
import { coleccionesSimuladas } from "../../../utils/mockData/coleccionesData";
import { Investigacion } from "@/pages/Biblioteca/Investigaciones/types/investigacionTypes"; // Importar el tipo Investigacion
import { Separator } from "@/components/ui/separator";

interface RelationFieldsProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const RelationFields = ({ book, isEditing, onUpdateBook }: RelationFieldsProps) => {
  // Store relationships in localStorage for persistence
  const [storedInvestigations, setStoredInvestigations] = useLocalStorage<Investigacion[]>('investigacionesData', investigacionesSimuladas);
  const [storedCollections, setStoredCollections] = useLocalStorage('coleccionesData', coleccionesSimuladas);

  // Update relationships when book changes
  useEffect(() => {
    // Update investigation relationships
    if (book.investigacionId) {
      const updatedInvestigations = storedInvestigations.map(investigation => {
        if (investigation.id === book.investigacionId) {
          // Make sure this book is linked to the investigation
          return {
            ...investigation,
            libroId: book.id.toString(), // Convertir book.id a string
            libroTitulo: book.titulo
          };
        }
        return investigation;
      });
      setStoredInvestigations(updatedInvestigations);
    }

    // Update collection relationships
    if (book.coleccionesIds && book.coleccionesIds.length > 0) {
      const updatedCollections = storedCollections.map(collection => {
        // If this collection is linked to the book
        if (book.coleccionesIds?.includes(collection.id)) {
          // Add the book to the collection if it's not already there
          if (!collection.libros.includes(book.id)) {
            return {
              ...collection,
              libros: [...collection.libros, book.id],
              cantidadLibros: collection.libros.length + 1
            };
          }
        } else {
          // Remove the book from the collection if it's there but shouldn't be
          if (collection.libros.includes(book.id)) {
            const updatedLibros = collection.libros.filter(id => id !== book.id);
            return {
              ...collection,
              libros: updatedLibros,
              cantidadLibros: updatedLibros.length
            };
          }
        }
        return collection;
      });
      setStoredCollections(updatedCollections);
    }
  }, [book.investigacionId, book.coleccionesIds, book.id, book.titulo, storedInvestigations, storedCollections, setStoredInvestigations, setStoredCollections]);

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-blue-500 mb-6">Relaciones</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <InvestigationRelation 
            book={book}
            isEditing={isEditing}
            onUpdateBook={onUpdateBook}
            investigations={storedInvestigations}
          />
        </div>
        <div className="space-y-4">
          <CollectionRelation
            book={book}
            isEditing={isEditing}
            onUpdateBook={onUpdateBook}
            collections={storedCollections}
          />
        </div>
      </div>
    </div>
  );
};
