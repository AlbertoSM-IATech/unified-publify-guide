
import { Book } from "../../../types/bookTypes";
import { UseFormReturn } from "react-hook-form"; 
import { useRelationData } from "./hooks/useRelationData";
import { InvestigationDetails } from "./components/InvestigationDetails";
import { CollectionDetails } from "./components/CollectionDetails";

interface RelationFieldsProps {
  form: UseFormReturn<any>; // Este prop parece no usarse, pero se mantiene según el original
  book?: Book;
}

export const RelationFields = ({
  form, // Se mantiene pero no se usa activamente en la lógica de renderizado
  book
}: RelationFieldsProps) => {
  const { loadingLists } = useRelationData();
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-3 text-blue-500">Relaciones</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 h-full">
        {/* Investigación Relacionada */}
        <InvestigationDetails 
          book={book} 
          loadingLists={loadingLists} 
        />

        {/* Colección Relacionada */}
        <CollectionDetails 
          book={book} 
          loadingLists={loadingLists} 
        />
      </div>
    </div>
  );
};
