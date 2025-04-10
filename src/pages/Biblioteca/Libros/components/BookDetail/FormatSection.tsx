
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Book, BookFormat } from "../../types/bookTypes";
import { FormatTabContent } from "./FormatTabContent";
import { calculateNetRoyalties } from "../../utils/formatUtils";

interface FormatSectionProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}

export const FormatSection = ({ 
  book, 
  isEditing, 
  onUpdateBook
}: FormatSectionProps) => {
  const [activeTab, setActiveTab] = useState("hardcover");

  const handleUpdateFormat = (formatType: string, formatData: Partial<BookFormat>) => {
    if (onUpdateBook) {
      const updatedBook: Partial<Book> = {
        [formatType]: { ...book[formatType as keyof Book] as BookFormat, ...formatData }
      };
      onUpdateBook(updatedBook);
    }
  };

  return (
    <Tabs 
      defaultValue="hardcover" 
      className="w-full"
      onValueChange={(value) => setActiveTab(value)}
    >
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
              onUpdateFormat={handleUpdateFormat}
            />
          </TabsContent>
          
          <TabsContent value="paperback" className="mt-0">
            <FormatTabContent 
              formatType="paperback" 
              format={book.paperback} 
              isEditing={isEditing} 
              calculateNetRoyalties={calculateNetRoyalties} 
              onUpdateFormat={handleUpdateFormat}
            />
          </TabsContent>
          
          <TabsContent value="ebook" className="mt-0">
            <FormatTabContent 
              formatType="ebook" 
              format={book.ebook} 
              isEditing={isEditing} 
              calculateNetRoyalties={calculateNetRoyalties} 
              onUpdateFormat={handleUpdateFormat}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};
