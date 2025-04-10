import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book } from "../../types/bookTypes";
import { FormatTabContent } from "./FormatTabContent";
import { GeneralInfoSection } from "./GeneralInfo/GeneralInfoSection";
import { NotesSection } from "./NotesSection";
import { RelationFields } from "./Relations/RelationFields";

interface DetailedTabsProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const DetailedTabs = ({ book, isEditing, onUpdateBook }: DetailedTabsProps) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="formatos">Formatos</TabsTrigger>
        <TabsTrigger value="relaciones">Relaciones</TabsTrigger>
        <TabsTrigger value="notas">Notas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <GeneralInfoSection book={book} />
      </TabsContent>

      <TabsContent value="formatos">
        <FormatTabContent book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
      </TabsContent>

      <TabsContent value="relaciones">
        <RelationFields book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
      </TabsContent>

      <TabsContent value="notas">
        <NotesSection book={book} isEditing={isEditing} />
      </TabsContent>
    </Tabs>
  );
};
