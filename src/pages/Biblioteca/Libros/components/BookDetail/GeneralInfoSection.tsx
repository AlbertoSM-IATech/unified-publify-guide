
import { useState } from "react";
import { Book } from "../../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGeneralInfoForm } from "./GeneralInfo/useGeneralInfoForm";
import { BasicInfoFields } from "./GeneralInfo/BasicInfo";
import { ContentAplusSection } from "./GeneralInfo/ContentAplusSection";
import { motion } from "framer-motion";
import { FileText, LayoutPanelTop } from "lucide-react";
import { Form } from "@/components/ui/form";
import { StatusFields } from "./GeneralInfo/StatusFields";

interface GeneralInfoSectionProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const GeneralInfoSection = ({ 
  book, 
  isEditing,
  onUpdateBook
}: GeneralInfoSectionProps) => {
  const [activeTab, setActiveTab] = useState("basic-info");
  
  const { form } = useGeneralInfoForm(book, isEditing, onUpdateBook);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Form {...form}> {/* Cambiado de form.formProps a form */}
        <Tabs 
          defaultValue="basic-info" 
          className="w-full"
          onValueChange={(value) => setActiveTab(value)}
        >
          <TabsList className="mb-4 grid w-full grid-cols-2 bg-muted/80 p-1">
            <TabsTrigger 
              value="basic-info"
            >
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span className="hidden md:block">Información Básica</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger 
              value="aplus-content"
            >
              <div className="flex items-center gap-2">
                <LayoutPanelTop size={16} />
                <span className="hidden md:block">Contenido A+</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <Card className="border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
            <CardContent className="p-6">
              <TabsContent value="basic-info" className="mt-0">
                <BasicInfoFields 
                  book={book} 
                  isEditing={isEditing} 
                  form={form} 
                  onUpdateBook={onUpdateBook}
                />
                <div className="mt-6">
                  <StatusFields
                    book={book}
                    isEditing={isEditing}
                    form={form}
                    onUpdateBook={onUpdateBook}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="aplus-content" className="mt-0">
                <ContentAplusSection book={book} isEditing={isEditing} form={form} />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </Form>
    </motion.div>
  );
};
