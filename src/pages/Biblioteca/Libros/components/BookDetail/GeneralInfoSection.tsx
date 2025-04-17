
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Book } from "../../types/bookTypes";
import { useGeneralInfoForm } from "./GeneralInfo/useGeneralInfoForm";
import { BasicInfoFields } from "./GeneralInfo/BasicInfo";
import { StatusFields } from "./GeneralInfo/StatusFields";
import { PublicationDateField } from "./GeneralInfo/PublicationDateField";
import { RelationFields } from "./Relations/RelationFields";
import { ContentAplusSection } from "./GeneralInfo/ContentAplusSection";
import { motion } from "framer-motion";

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
  const { form, selectedDate, selectedLaunchDate, handleDateChange, handleLaunchDateChange } = useGeneralInfoForm(book, isEditing, onUpdateBook);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-slate-200 dark:border-slate-700 shadow-md">
        <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <CardTitle className="text-lg font-medium text-slate-800 dark:text-slate-200">
            Información General
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <div className="grid gap-6">
              {/* Basic Information Fields */}
              <BasicInfoFields book={book} isEditing={isEditing} form={form} />
              
              {/* Status Fields */}
              <StatusFields book={book} isEditing={isEditing} form={form} />
              
              {/* Publication Date Field */}
              <PublicationDateField 
                book={book} 
                isEditing={isEditing} 
                selectedDate={selectedDate}
                selectedLaunchDate={selectedLaunchDate}
                onDateChange={handleDateChange}
                onLaunchDateChange={handleLaunchDateChange}
              />
              
              {/* A+ Content section */}
              <ContentAplusSection book={book} isEditing={isEditing} form={form} />
            </div>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
