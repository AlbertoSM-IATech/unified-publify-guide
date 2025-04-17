
import { Book } from "../../../types/bookTypes";
import { InvestigationRelation } from "./InvestigationRelation";
import { CollectionRelation } from "./CollectionRelation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";
import { investigacionesSimuladas } from "../../../utils/mockData/investigacionesData";
import { coleccionesSimuladas } from "../../../utils/mockData/coleccionesData";

interface RelationFieldsProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const RelationFields = ({ book, isEditing, onUpdateBook }: RelationFieldsProps) => {
  // Store relationships in localStorage for persistence
  const [storedInvestigations, setStoredInvestigations] = useLocalStorage('investigacionesData', investigacionesSimuladas);
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
            libroId: book.id,
            libroTitulo: book.titulo
          };
        }
        return investigation;
      });
      setStoredInvestigations(updatedInvestigations);
    }

    // Update collection relationships
    if (book.proyectoId) {
      const updatedCollections = storedCollections.map(collection => {
        if (collection.id === book.proyectoId) {
          // Make sure this book is linked to the collection
          if (!collection.libros.includes(book.id)) {
            return {
              ...collection,
              libros: [...collection.libros, book.id],
              cantidadLibros: collection.cantidadLibros + 1
            };
          }
        }
        return collection;
      });
      setStoredCollections(updatedCollections);
    }
  }, [book.investigacionId, book.proyectoId, book.id, book.titulo]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <InvestigationRelation 
        book={book}
        isEditing={isEditing}
        onUpdateBook={onUpdateBook}
        investigations={storedInvestigations}
      />
      <CollectionRelation
        book={book}
        isEditing={isEditing}
        onUpdateBook={onUpdateBook}
        collections={storedCollections}
      />
    </div>
  );
};
