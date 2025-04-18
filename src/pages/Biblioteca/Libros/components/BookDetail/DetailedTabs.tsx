
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book } from "../../types/bookTypes";
import { GeneralInfoSection } from "./GeneralInfoSection";
import { FormatSection } from "./FormatSection";
import { NotesSection } from "./NotesSection";
import { AudienceSection } from "./GeneralInfo/AudienceSection";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Info, 
  BookOpen, 
  FileText, 
  Users
} from "lucide-react";

interface DetailedTabsProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const DetailedTabs = ({ book, isEditing, onUpdateBook }: DetailedTabsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Tabs defaultValue="info" className="space-y-4">
        <Card className="p-1 shadow-md overflow-hidden border border-slate-200 dark:border-slate-700">
          <TabsList className="grid grid-cols-4 md:grid-cols-4 w-full bg-transparent">
            <TabsTrigger 
              value="info"
              className="data-[state=active]:text-[#FB923C] data-[state=active]:shadow-[0_1px_0_0_#FB923C]"
            >
              <div className="flex items-center gap-2">
                <Info size={16} />
                <span className="hidden md:block">Información</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="formats"
              className="data-[state=active]:text-[#FB923C] data-[state=active]:shadow-[0_1px_0_0_#FB923C]"
            >
              <div className="flex items-center gap-2">
                <BookOpen size={16} />
                <span className="hidden md:block">Formatos</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="audience"
              className="data-[state=active]:text-[#FB923C] data-[state=active]:shadow-[0_1px_0_0_#FB923C]"
            >
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span className="hidden md:block">Audiencia</span>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="notes"
              className="data-[state=active]:text-[#FB923C] data-[state=active]:shadow-[0_1px_0_0_#FB923C]"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span className="hidden md:block">Notas</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </Card>

        <TabsContent value="info" className="mt-4">
          <GeneralInfoSection book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
        </TabsContent>

        <TabsContent value="formats" className="mt-4">
          <FormatSection book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
        </TabsContent>

        <TabsContent value="audience" className="mt-4">
          <Card className="p-6 border-slate-200 dark:border-slate-700 shadow-md">
            <AudienceSection book={book} isEditing={isEditing} form={null} />
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <NotesSection book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
