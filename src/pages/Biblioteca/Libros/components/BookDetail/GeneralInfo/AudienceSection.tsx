import React from "react";
import { Book } from "../../../types/bookTypes";
// Separator ya no es necesario aquí directamente si el diseño cambia
import { Card } from "@/components/ui/card";
import { Users, Target, Sparkles } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { RichTextEditor } from "./BasicInfo/components/RichTextEditor";
interface AudienceSectionProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any> | null;
}
export const AudienceSection = ({
  book,
  isEditing,
  form
}: AudienceSectionProps) => {
  return <div className="space-y-6"> {/* mt-4 eliminado */}
      
      
      {/* Target Audience Section */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-primary mb-1"> {/* Cambiado text-blue-500 a text-primary */}
          <Users size={18} />
          <h4 className="text-md font-semibold text-inherit">Audiencia Objetivo</h4>
        </div>
        
        {isEditing ? <RichTextEditor content={book.targetInterests || ""} onChange={value => form?.setValue("targetInterests", value)} placeholder="Describe la audiencia objetivo del libro..." /> : <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{
        __html: book.targetInterests || "<p>No hay información disponible</p>"
      }} />}
      </Card>
      
      {/* Market Avatar */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-primary mb-1"> {/* Cambiado text-blue-500 a text-primary */}
          <Target size={18} />
          <h4 className="text-md font-semibold">Avatar Personalizado</h4>
        </div>
        
        {isEditing ? <RichTextEditor content={book.marketPosition || ""} onChange={value => form?.setValue("marketPosition", value)} placeholder="Describe el avatar personalizado del libro..." /> : <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{
        __html: book.marketPosition || "<p>No hay información disponible</p>"
      }} />}
      </Card>
      
      {/* Unique Value Proposition */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-primary mb-1"> {/* Cambiado text-blue-500 a text-primary */}
          <Sparkles size={18} />
          <h4 className="text-md font-semibold">Propuesta de Valor Única</h4>
        </div>
        
        {isEditing ? <RichTextEditor content={book.uniqueValueProposition || ""} onChange={value => form?.setValue("uniqueValueProposition", value)} placeholder="¿Qué hace único a este libro?" /> : <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{
        __html: book.uniqueValueProposition || "<p>No hay información disponible</p>"
      }} />}
      </Card>
    </div>;
};