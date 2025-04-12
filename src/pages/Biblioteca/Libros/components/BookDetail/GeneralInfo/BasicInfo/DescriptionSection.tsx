import { useState } from "react";
import { Book } from "../../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Code, Copy, CheckCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { useHtmlDescription } from "./hooks/useHtmlDescription";
import { RichTextEditor } from "./components/RichTextEditor";
interface DescriptionSectionProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
}
export const DescriptionSection = ({
  book,
  isEditing,
  form
}: DescriptionSectionProps) => {
  const {
    htmlOutput,
    showHtmlPreview,
    setShowHtmlPreview,
    copied,
    generateHtml,
    copyHtml
  } = useHtmlDescription(book, form);

  // Handle rich text editor changes
  const handleEditorChange = (html: string) => {
    form.setValue("descripcion", html);
  };
  return <div className="space-y-6 mt-8">
      <div className="flex items-center">
        <h3 className="text-lg text-blue-500 font-extrabold">Descripción</h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
      <div className="grid gap-3">
        <Label htmlFor="descripcion">Descripción</Label>
        {isEditing ? <FormField control={form.control} name="descripcion" render={({
        field
      }) => <FormControl>
                <RichTextEditor content={field.value || ""} onChange={handleEditorChange} />
              </FormControl>} /> : <div className="text-sm text-muted-foreground prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{
        __html: book.descripcion
      }} />}
      </div>

      {/* HTML Preview - Now shows in editing mode too */}
      <div className="mt-4">
        {isEditing ? <>
            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="outline" onClick={generateHtml} className="flex items-center gap-1 border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10">
                <Code size={16} />
                Generar código HTML
              </Button>
            </div>
            
            {/* Always show HTML preview in edit mode after generating */}
            {showHtmlPreview && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} className="mt-3">
                <Card className="p-4 bg-card border border-muted">
                  <div className="flex justify-between items-center mb-3">
                    <Label className="text-sm font-medium">Código HTML</Label>
                    <Button type="button" size="sm" variant="ghost" className="h-8 flex items-center gap-1" onClick={copyHtml}>
                      {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                      <span className="ml-1">Copiar</span>
                    </Button>
                  </div>
                
                  <Textarea id="html-output" value={htmlOutput || form.getValues("descripcionHtml") || ""} rows={4} className="font-mono text-sm bg-muted mb-3" readOnly />
                  
                  <Label className="text-sm font-medium block mb-2">Vista previa</Label>
                  <div className="p-3 border rounded-md bg-white dark:bg-slate-900 mt-1 text-sm prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{
              __html: htmlOutput || form.getValues("descripcionHtml") || ""
            }} />
                </Card>
              </motion.div>}
          </> : book.descripcionHtml && <>
              <Button type="button" size="sm" variant="outline" className="flex items-center gap-1 mb-3" onClick={() => setShowHtmlPreview(!showHtmlPreview)}>
                <Code size={16} />
                {showHtmlPreview ? "Ocultar código HTML" : "Ver código HTML"}
              </Button>
              
              {showHtmlPreview && <motion.div initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} className="mt-3">
                  <Card className="p-4 bg-card border border-muted">
                    <div className="flex justify-between items-center mb-3">
                      <Label className="text-sm font-medium">Código HTML</Label>
                      <Button type="button" size="sm" variant="ghost" className="h-8 flex items-center gap-1" onClick={copyHtml}>
                        {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                        <span className="ml-1">Copiar</span>
                      </Button>
                    </div>
                  
                    <Textarea id="html-output" value={book.descripcionHtml} rows={4} className="font-mono text-sm bg-muted mb-3" readOnly />
                    
                    <Label className="text-sm font-medium block mb-2">Vista previa</Label>
                    <div className="p-3 border rounded-md bg-white dark:bg-slate-900 mt-1 text-sm prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{
              __html: book.descripcionHtml
            }} />
                  </Card>
                </motion.div>}
            </>}
      </div>
    </div>;
};