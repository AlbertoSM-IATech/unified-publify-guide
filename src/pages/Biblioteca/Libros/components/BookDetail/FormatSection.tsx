
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Book, BookFormat } from "../../types/bookTypes";
import { FormatTabContent } from "./FormatTabContent";
import { calculateNetRoyalties } from "../../utils/bookDetail/calculationUtils";
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Tabs 
        defaultValue="hardcover" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="mb-4 grid w-full grid-cols-3 bg-muted/80 p-1">
          <TabsTrigger 
            value="hardcover"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm"
          >
            Tapa Dura
          </TabsTrigger>
          <TabsTrigger 
            value="paperback"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm"
          >
            Tapa Blanda
          </TabsTrigger>
          <TabsTrigger 
            value="ebook"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm"
          >
            eBook
          </TabsTrigger>
        </TabsList>
        
        <Card className="border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
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
    </motion.div>
  );
};
