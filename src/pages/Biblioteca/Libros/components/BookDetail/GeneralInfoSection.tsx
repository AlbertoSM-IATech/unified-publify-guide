
import { useState } from "react";
import { Book } from "../../types/bookTypes";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { useGeneralInfoForm } from "./GeneralInfo/useGeneralInfoForm";
import { BasicInfoFields } from "./GeneralInfo/BasicInfo";
import { AudienceSection } from "./GeneralInfo/AudienceSection";
import { ContentAplusSection } from "./GeneralInfo/ContentAplusSection";
import { motion } from "framer-motion";
import { FileText, Users, LayoutPanelTop } from "lucide-react";

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
  const form = useForm({
    defaultValues: {
      titulo: book.titulo,
      subtitulo: book.subtitulo,
      autor: book.autor,
      descripcion: book.descripcion,
      descripcionHtml: book.descripcionHtml,
      estado: book.estado,
      fechaPublicacion: book.fechaPublicacion,
      fechaLanzamiento: book.fechaLanzamiento,
      bsr: book.bsr,
      landingPageUrl: book.landingPageUrl,
      contenidoAPlus: book.contenidoAPlus,
      
      // Audience fields
      targetAge: book.targetAge,
      targetGender: book.targetGender,
      targetInterests: book.targetInterests,
      marketPosition: book.marketPosition,
      competitorBooks: book.competitorBooks,
      uniqueValueProposition: book.uniqueValueProposition,
    }
  });

  // Observe form values and update parent component
  useGeneralInfoForm(form, book, onUpdateBook);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Tabs 
        defaultValue="basic-info" 
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="mb-4 grid w-full grid-cols-3 bg-muted/80 p-1">
          <TabsTrigger 
            value="basic-info"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span className="hidden md:block">Información Básica</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="audience"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span className="hidden md:block">Audiencia</span>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="aplus-content"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm"
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
              <BasicInfoFields book={book} isEditing={isEditing} form={form} />
            </TabsContent>
            
            <TabsContent value="audience" className="mt-0">
              <AudienceSection book={book} isEditing={isEditing} form={form} />
            </TabsContent>
            
            <TabsContent value="aplus-content" className="mt-0">
              <ContentAplusSection book={book} isEditing={isEditing} form={form} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </motion.div>
  );
};
