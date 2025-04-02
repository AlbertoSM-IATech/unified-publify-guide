
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Book, BookFormat } from "../../types/bookTypes";
import { FormatTabContent } from "./FormatTabContent";

interface FormatSectionProps {
  book: Book;
  isEditing: boolean;
  calculateNetRoyalties: (format?: BookFormat) => string;
}

export const FormatSection = ({ book, isEditing, calculateNetRoyalties }: FormatSectionProps) => {
  return (
    <Tabs defaultValue="hardcover" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-3">
        <TabsTrigger value="hardcover">Tapa Dura</TabsTrigger>
        <TabsTrigger value="paperback">Tapa Blanda</TabsTrigger>
        <TabsTrigger value="ebook">eBook</TabsTrigger>
      </TabsList>
      
      <Card>
        <CardContent className="p-6">
          <TabsContent value="hardcover" className="mt-0">
            <FormatTabContent 
              formatType="hardcover" 
              format={book.hardcover} 
              isEditing={isEditing} 
              calculateNetRoyalties={calculateNetRoyalties} 
            />
          </TabsContent>
          
          <TabsContent value="paperback" className="mt-0">
            <FormatTabContent 
              formatType="paperback" 
              format={book.paperback} 
              isEditing={isEditing} 
              calculateNetRoyalties={calculateNetRoyalties} 
            />
          </TabsContent>
          
          <TabsContent value="ebook" className="mt-0">
            <FormatTabContent 
              formatType="ebook" 
              format={book.ebook} 
              isEditing={isEditing} 
              calculateNetRoyalties={calculateNetRoyalties} 
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};
