
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralInfoSection } from "./GeneralInfoSection";
import { FormatSection } from "./FormatSection";
import { NotesSection } from "./NotesSection";
import { calculateNetRoyalties } from "../../utils/bookDetailUtils";
import { Book } from "../../types/bookTypes";

interface DetailedTabsProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const DetailedTabs = ({ book, isEditing, onUpdateBook }: DetailedTabsProps) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-3">
        <TabsTrigger value="general">Información General</TabsTrigger>
        <TabsTrigger value="formats">Formatos</TabsTrigger>
        <TabsTrigger value="notes">Notas y Observaciones</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general" className="mt-0">
        <GeneralInfoSection 
          book={book} 
          isEditing={isEditing} 
          onUpdateBook={onUpdateBook}
        />
      </TabsContent>

      <TabsContent value="formats" className="mt-0">
        <FormatSection 
          book={book}
          isEditing={isEditing}
          calculateNetRoyalties={calculateNetRoyalties}
          onUpdateBook={onUpdateBook}
        />
      </TabsContent>

      <TabsContent value="notes" className="mt-0">
        <NotesSection 
          book={book}
          isEditing={isEditing}
          onUpdateBook={onUpdateBook}
        />
      </TabsContent>
    </Tabs>
  );
};
