import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book } from "../../types/bookTypes";
import { GeneralInfoSection } from "./GeneralInfoSection";
import { FormatSection } from "./FormatSection";
import { NotesSection } from "./NotesSection";
import { AudienceSection } from "./GeneralInfo/AudienceSection";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Info, 
  BookOpen, 
  FileText, 
  Users
} from "lucide-react";
import { useState } from "react";

interface DetailedTabsProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const DetailedTabs = ({ book, isEditing, onUpdateBook }: DetailedTabsProps) => {
  const [activeTab, setActiveTab] = useState("info");
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const tabContentVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Tabs 
        defaultValue="info" 
        className="space-y-4" 
        value={activeTab} 
        onValueChange={handleTabChange}
      >
        <Card className="shadow-md overflow-hidden border border-neutral-200 dark:border-neutral-700">
          <TabsList className="grid grid-cols-4 md:grid-cols-4 w-full">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <TabsTrigger 
                value="info"
              >
                <div className="flex items-center gap-2">
                  <Info size={16} />
                  <span className="hidden md:block">Información</span>
                </div>
              </TabsTrigger>
            </motion.div>
            
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <TabsTrigger 
                value="formats"
              >
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span className="hidden md:block">Formatos</span>
                </div>
              </TabsTrigger>
            </motion.div>
            
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <TabsTrigger 
                value="audience"
              >
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span className="hidden md:block">Audiencia</span>
                </div>
              </TabsTrigger>
            </motion.div>
            
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
              <TabsTrigger 
                value="notes"
              >
                <div className="flex items-center gap-2">
                  <FileText size={16} />
                  <span className="hidden md:block">Notas</span>
                </div>
              </TabsTrigger>
            </motion.div>
          </TabsList>
        </Card>

        <AnimatePresence mode="wait">
          {activeTab === "info" && (
            <TabsContent value="info" className="mt-4">
              <motion.div
                key="info"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <GeneralInfoSection book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
              </motion.div>
            </TabsContent>
          )}

          {activeTab === "formats" && (
            <TabsContent value="formats" className="mt-4">
              <motion.div
                key="formats"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <FormatSection book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
              </motion.div>
            </TabsContent>
          )}

          {activeTab === "audience" && (
            <TabsContent value="audience" className="mt-4">
              <motion.div
                key="audience"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <AudienceSection book={book} isEditing={isEditing} form={null} />
              </motion.div>
            </TabsContent>
          )}

          {activeTab === "notes" && (
            <TabsContent value="notes" className="mt-4">
              <motion.div
                key="notes"
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <NotesSection book={book} isEditing={isEditing} onUpdateBook={onUpdateBook} />
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
};
