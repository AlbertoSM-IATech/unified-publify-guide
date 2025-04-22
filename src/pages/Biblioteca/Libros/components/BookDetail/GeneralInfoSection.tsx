import { useState } from "react";
import { Book } from "../../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormReturn } from "react-hook-form";
import { useGeneralInfoForm } from "./GeneralInfo/useGeneralInfoForm";
import { BasicInfoFields } from "./GeneralInfo/BasicInfo";
import { ContentAplusSection } from "./GeneralInfo/ContentAplusSection";
import { motion } from "framer-motion";
import { FileText, LayoutPanelTop } from "lucide-react";
import { Form } from "@/components/ui/form";
interface GeneralInfoSectionProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}
export const GeneralInfoSection = ({
  book,
  isEditing,
  onUpdateBook
}: GeneralInfoSectionProps) => {
  const [activeTab, setActiveTab] = useState("basic-info");

  // Use the useGeneralInfoForm hook to manage form state
  const {
    form
  } = useGeneralInfoForm(book, isEditing, onUpdateBook);
  return <motion.div initial={{
    opacity: 0,
    y: 10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.4
  }} className="w-full">
      {/* Wrap all form content with the Form provider */}
      <Form {...form.formProps}>
        <Tabs defaultValue="basic-info" className="w-full" onValueChange={value => setActiveTab(value)}>
          <TabsList className="mb-4 grid w-full grid-cols-2 bg-muted/80 p-1">
            <TabsTrigger value="basic-info" className="data-[state=active]:shadow-sm bg-black text-orange-400">
              <div className="flex items-center gap-2">
                <FileText size={16} />
                <span className="hidden md:block">Información Básica</span>
              </div>
            </TabsTrigger>
            
            <TabsTrigger value="aplus-content" className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm">
              <div className="flex items-center gap-2">
                <LayoutPanelTop size={16} />
                <span className="hidden md:block">Contenido A+</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <Card className="border-slate-200 dark:border-slate-700 shadow-md overflow-hidden">
            <CardContent className="p-6">
              <TabsContent value="basic-info" className="mt-0">
                <BasicInfoFields book={book} isEditing={isEditing} form={form} />
              </TabsContent>
              
              <TabsContent value="aplus-content" className="mt-0">
                <ContentAplusSection book={book} isEditing={isEditing} form={form} />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </Form>
    </motion.div>;
};