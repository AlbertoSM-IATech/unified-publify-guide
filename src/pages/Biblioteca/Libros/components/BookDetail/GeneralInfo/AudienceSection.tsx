
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
        
        <RichTextEditor
          content={book.targetInterests || ""}
          isEditing={isEditing}
          onChange={(value) => form?.setValue("targetInterests", value)}
          placeholder="Describe la audiencia objetivo del libro..."
        />
      </Card>
      
      {/* Market Avatar */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Target size={18} />
          <h4 className="text-md font-semibold">Avatar Personalizado</h4>
        </div>
        
        <RichTextEditor
          content={book.marketPosition || ""}
          isEditing={isEditing}
          onChange={(value) => form?.setValue("marketPosition", value)}
          placeholder="Describe el avatar personalizado del libro..."
        />
      </Card>
      
      {/* Unique Value Proposition */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Sparkles size={18} />
          <h4 className="text-md font-semibold">Propuesta de Valor Única</h4>
        </div>
        
        <RichTextEditor
          content={book.uniqueValueProposition || ""}
          isEditing={isEditing}
          onChange={(value) => form?.setValue("uniqueValueProposition", value)}
          placeholder="¿Qué hace único a este libro?"
        />
      </Card>
    </div>
  );
};
