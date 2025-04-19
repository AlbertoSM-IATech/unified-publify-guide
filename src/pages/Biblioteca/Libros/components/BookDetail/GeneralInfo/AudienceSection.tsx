
import React from "react";
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Users, Target, Sparkles } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

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
  // Helper function to render form field or static content
  const renderField = (
    name: keyof Book, 
    label: string, 
    placeholder: string, 
    isTextarea: boolean = false,
    rows: number = 2
  ) => {
    if (isEditing && form) {
      return (
        <FormField 
          control={form.control}
          name={name as string}
          render={({ field }) => (
            <FormItem>
              <Label htmlFor={name as string}>{label}</Label>
              <FormControl>
                {isTextarea ? (
                  <Textarea 
                    id={name as string}
                    placeholder={placeholder}
                    rows={rows}
                    {...field}
                    value={field.value || ''}
                  />
                ) : (
                  <Input 
                    id={name as string}
                    placeholder={placeholder}
                    {...field}
                    value={field.value || ''}
                  />
                )}
              </FormControl>
            </FormItem>
          )}
        />
      );
    }
    
    // Enhanced renderValue function that properly handles complex objects and arrays
    const renderValue = () => {
      const value = book[name];
      
      // Handle null or undefined
      if (value === null || value === undefined) {
        return "No definido";
      }
      
      // Handle primitive types directly
      if (typeof value === 'string' || typeof value === 'number') {
        return String(value);
      }
      
      // Handle arrays by converting to a readable format
      if (Array.isArray(value)) {
        if (value.length === 0) return "No hay datos";
        
        // Simple string representation for arrays of objects
        return "Lista de datos";
      }
      
      // For objects, convert to a string representation
      if (typeof value === 'object') {
        return "Datos de objeto";
      }
      
      // Fallback for any other types
      return String(value);
    };
    
    return (
      <>
        <Label htmlFor={name as string}>{label}</Label>
        <div className="border rounded-md p-3 bg-card shadow-sm min-h-[40px]">
          {renderValue()}
        </div>
      </>
    );
  };
  
  return (
    <div className="space-y-6 mt-4">
      <div className="flex items-center">
        <h3 className="text-lg font-extrabold text-blue-500">Audiencia y Posicionamiento</h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
      {/* Target Audience Fields */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Users size={18} />
          <h4 className="text-md font-semibold">Audiencia Objetivo</h4>
        </div>
        
        <div className="grid gap-4">
          {renderField("targetAge", "Edad objetivo", "Ej: 25-45 años")}
          {renderField("targetGender", "Género", "Ej: Femenino, Masculino, Todos")}
          {renderField("targetInterests", "Intereses", "Ej: Desarrollo personal, finanzas, etc.", true)}
        </div>
      </Card>
      
      {/* Market Positioning */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Target size={18} />
          <h4 className="text-md font-semibold">Posicionamiento de Mercado</h4>
        </div>
        
        <div className="grid gap-4">
          {renderField("marketPosition", "Posicionamiento", "Describe cómo se posiciona este libro en el mercado", true)}
          {renderField("competitorBooks", "Libros competidores", "Libros similares con los que compite", true)}
        </div>
      </Card>
      
      {/* Unique Value Proposition */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Sparkles size={18} />
          <h4 className="text-md font-semibold">Propuesta de Valor Única</h4>
        </div>
        
        <div className="grid gap-3">
          {renderField("uniqueValueProposition", "¿Qué hace único a este libro?", "¿Por qué alguien debería comprar este libro?", true, 3)}
        </div>
      </Card>
    </div>
  );
};
