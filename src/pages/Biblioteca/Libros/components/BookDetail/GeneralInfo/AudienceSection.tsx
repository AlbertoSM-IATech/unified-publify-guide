import React from "react";
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Users, Target, Sparkles } from "lucide-react";
interface AudienceSectionProps {
  book: Book;
  isEditing: boolean;
  form: any; // Using 'any' here to handle the extended form object from useGeneralInfoForm
}
export const AudienceSection = ({
  book,
  isEditing,
  form
}: AudienceSectionProps) => {
  return <div className="space-y-6 mt-8">
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
        
        <div className="grid gap-3">
          
          {isEditing ? <FormField control={form.control} name="targetAge" render={({
          field
        }) => <FormItem>
                  <FormControl>
                    <Input id="targetAge" placeholder="Ej: 25-45 años" {...field} value={field.value || ''} />
                  </FormControl>
                </FormItem>} /> : <div className="border rounded-md p-2 bg-card shadow-sm">
              {book.targetAge || "No definido"}
            </div>}
        </div>
        
        
        
        
      </Card>
      
      {/* Market Positioning */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Target size={18} />
          <h4 className="text-md font-semibold">Avatar</h4>
        </div>
        
        
        
        <div className="grid gap-3">
          
          {isEditing ? <FormField control={form.control} name="competitorBooks" render={({
          field
        }) => <FormItem>
                  <FormControl>
                    <Textarea id="competitorBooks" placeholder="Libros similares con los que compite" rows={2} {...field} value={field.value || ''} />
                  </FormControl>
                </FormItem>} /> : <div className="border rounded-md p-2 bg-card shadow-sm min-h-[50px]">
              {book.competitorBooks || "No definido"}
            </div>}
        </div>
      </Card>
      
      {/* Unique Value Proposition */}
      <Card className="p-5 space-y-4 shadow-sm border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-blue-500 mb-1">
          <Sparkles size={18} />
          <h4 className="text-md font-semibold">Propuesta de Valor Única</h4>
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor="uniqueValueProposition">¿Qué hace único a este libro?</Label>
          {isEditing ? <FormField control={form.control} name="uniqueValueProposition" render={({
          field
        }) => <FormItem>
                  <FormControl>
                    <Textarea id="uniqueValueProposition" placeholder="¿Por qué alguien debería comprar este libro?" rows={3} {...field} value={field.value || ''} />
                  </FormControl>
                </FormItem>} /> : <div className="border rounded-md p-2 bg-card shadow-sm min-h-[75px]">
              {book.uniqueValueProposition || "No definido"}
            </div>}
        </div>
      </Card>
    </div>;
};