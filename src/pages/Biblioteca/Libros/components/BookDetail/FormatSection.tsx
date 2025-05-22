import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Book, BookFormat } from "../../types/bookTypes";
import { FormatTabContent } from "./FormatTabContent";
import { motion } from "framer-motion";

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
  const [activeTab, setActiveTab] = useState("paperback"); // Change default to paperback

  // Handle format update
  const handleUpdateFormat = (formatType: string, formatData: Partial<BookFormat>) => {
    if (onUpdateBook) {
      // Create a deep copy of the book format
      const currentFormat = book[formatType as keyof Book] as BookFormat || {};
      const updatedFormat = { ...currentFormat, ...formatData };
      
      // Update the book with the new format data
      const updatedBook: Partial<Book> = {
        [formatType]: updatedFormat
      };
      
      console.log(`Updating ${formatType} format:`, updatedFormat);
      onUpdateBook(updatedBook);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Tabs 
        defaultValue="paperback" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="mb-4 grid w-full grid-cols-3 bg-muted/80 p-1">
          <TabsTrigger 
            value="hardcover"
            >
            Tapa Dura
          </TabsTrigger>
          <TabsTrigger 
            value="paperback"
            >
            Tapa Blanda
          </TabsTrigger>
          <TabsTrigger 
            value="ebook"
            >
            eBook
          </TabsTrigger>
        </TabsList>
        
        <Card className="border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
          <CardContent className="p-6">
            <TabsContent value="hardcover" className="mt-0">
              <FormatTabContent 
                formatType="hardcover" 
                format={book.hardcover || {}} 
                isEditing={isEditing} 
                onUpdateFormat={handleUpdateFormat}
              />
            </TabsContent>
            
            <TabsContent value="paperback" className="mt-0">
              <FormatTabContent 
                formatType="paperback" 
                format={book.paperback || {}} 
                isEditing={isEditing} 
                onUpdateFormat={handleUpdateFormat}
              />
            </TabsContent>
            
            <TabsContent value="ebook" className="mt-0">
              <FormatTabContent 
                formatType="ebook" 
                format={book.ebook || {}} 
                isEditing={isEditing} 
                onUpdateFormat={handleUpdateFormat}
              />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </motion.div>
  );
};
