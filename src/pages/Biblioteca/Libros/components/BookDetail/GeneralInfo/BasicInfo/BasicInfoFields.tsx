
import { Book } from "../../../../types/bookTypes";
import { UseFormReturn } from "react-hook-form";
import { BasicInfoSection } from "./BasicInfoSection";
import { DescriptionSection } from "./DescriptionSection";
import { MetadataSection } from "./MetadataSection";
import { InvestigationRelation } from "../../Relations/InvestigationRelation";
import { CollectionRelation } from "../../Relations/CollectionRelation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { investigacionesSimuladas } from "../../../../utils/mockData/investigacionesData";
import { coleccionesSimuladas } from "../../../../utils/mockData/coleccionesData";
import { Separator } from "@/components/ui/separator";

interface BasicInfoFieldsProps {
  book: Book;
  isEditing: boolean;
  form: any; // Using 'any' here to handle the extended form object from useGeneralInfoForm
  onUpdateBook: (updatedData: Partial<Book>) => void; // Added onUpdateBook prop
}

export const BasicInfoFields = ({ book, isEditing, form, onUpdateBook }: BasicInfoFieldsProps) => {
  const [storedInvestigations, setStoredInvestigations] = useLocalStorage('investigacionesData', investigacionesSimuladas);
  const [storedCollections, setStoredCollections] = useLocalStorage('coleccionesData', coleccionesSimuladas);

  return (
    <>
      {/* Sección de Información Básica */}
      <BasicInfoSection book={book} isEditing={isEditing} form={form} />

      {/* Sección de Descripción */}
      <DescriptionSection book={book} isEditing={isEditing} form={form} />

      {/* Sección de Metadatos */}
      <MetadataSection book={book} isEditing={isEditing} form={form} />
      
      {/* Sección de Relaciones (Investigación y Colección) */}
      <div className="space-y-6 mt-8">
        <div className="flex items-center">
          <h3 className="text-lg text-blue-500 font-extrabold">Relaciones</h3>
          <Separator className="flex-grow ml-3" />
        </div>
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
      </div>
    </>
  );
};

