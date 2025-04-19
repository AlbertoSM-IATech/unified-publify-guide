
import React from "react";
import { Book } from "../../../types/bookTypes";
import { Separator } from "@/components/ui/separator";
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
  // Function to determine which content to render based on editing mode
  const renderContent = (content: string) => {
    if (isEditing) {
      return (
        <RichTextEditor
          content={content || ""}
          onChange={(value) => form?.setValue("targetInterests", value)}
          readOnly={!isEditing}
          placeholder="Describe la audiencia objetivo del libro..."
        />
      );
    } else {
      return (
        <div className="prose prose-sm max-w-none dark:prose-invert" 
             dangerouslySetInnerHTML={{ __html: content || "<p>No hay información disponible</p>" }} 
        />
      );
    }
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center">
        <h3 className="text-lg font-extrabold text-blue-500">Audiencia y Posicionamiento</h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
      {/* Target Audience Section */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Users size={18} />
          <h4 className="text-md font-semibold">Audiencia Objetivo</h4>
        </div>
        
        {isEditing ? (
          <RichTextEditor
            content={book.targetInterests || ""}
            onChange={(value) => form?.setValue("targetInterests", value)}
            placeholder="Describe la audiencia objetivo del libro..."
          />
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert" 
               dangerouslySetInnerHTML={{ __html: book.targetInterests || "<p>No hay información disponible</p>" }} 
          />
        )}
      </Card>
      
      {/* Market Avatar */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Target size={18} />
          <h4 className="text-md font-semibold">Avatar Personalizado</h4>
        </div>
        
        {isEditing ? (
          <RichTextEditor
            content={book.marketPosition || ""}
            onChange={(value) => form?.setValue("marketPosition", value)}
            placeholder="Describe el avatar personalizado del libro..."
          />
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert" 
               dangerouslySetInnerHTML={{ __html: book.marketPosition || "<p>No hay información disponible</p>" }} 
          />
        )}
      </Card>
      
      {/* Unique Value Proposition */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Sparkles size={18} />
          <h4 className="text-md font-semibold">Propuesta de Valor Única</h4>
        </div>
        
        {isEditing ? (
          <RichTextEditor
            content={book.uniqueValueProposition || ""}
            onChange={(value) => form?.setValue("uniqueValueProposition", value)}
            placeholder="¿Qué hace único a este libro?"
          />
        ) : (
          <div className="prose prose-sm max-w-none dark:prose-invert" 
               dangerouslySetInnerHTML={{ __html: book.uniqueValueProposition || "<p>No hay información disponible</p>" }} 
          />
        )}
      </Card>
    </div>
  );
};
