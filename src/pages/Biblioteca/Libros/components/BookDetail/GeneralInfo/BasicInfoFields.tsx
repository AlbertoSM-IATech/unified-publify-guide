
import { useState } from "react";
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Code, Copy, FileText, CheckCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface BasicInfoFieldsProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
}

export const BasicInfoFields = ({ book, isEditing, form }: BasicInfoFieldsProps) => {
  const [htmlOutput, setHtmlOutput] = useState<string>(book.descripcionHtml || "");
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHtml = () => {
    const description = form.getValues("descripcion") || book.descripcion;
    if (!description) {
      toast({
        title: "Error",
        description: "Por favor, introduce una descripción primero",
        variant: "destructive",
      });
      return;
    }
    
    // Simple HTML conversion (paragraphs, basic formatting)
    let html = description
      .split("\n\n").map(p => `<p>${p}</p>`) // Paragraphs
      .join("\n")
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic
    
    setHtmlOutput(html);
    form.setValue("descripcionHtml", html);
    setShowHtmlPreview(true);
    
    toast({
      title: "HTML generado",
      description: "El código HTML se ha generado correctamente",
    });
  };

  const copyHtml = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    
    toast({
      title: "Copiado",
      description: "El código HTML se ha copiado al portapapeles",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <>
      {/* Título */}
      <div className="grid gap-3">
        <Label htmlFor="titulo">Título</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <Input 
                id="titulo" 
                placeholder="Título del libro"
                {...field}
              />
            )}
          />
        ) : (
          <div className="text-xl font-semibold">{book.titulo}</div>
        )}
      </div>

      {/* Subtítulo */}
      <div className="grid gap-3">
        <Label htmlFor="subtitulo">Subtítulo</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="subtitulo"
            render={({ field }) => (
              <Input 
                id="subtitulo" 
                placeholder="Subtítulo del libro"
                {...field}
              />
            )}
          />
        ) : (
          <div>{book.subtitulo || "No definido"}</div>
        )}
      </div>

      {/* Descripción con generador HTML */}
      <div className="grid gap-3">
        <Label htmlFor="descripcion">Descripción</Label>
        {isEditing ? (
          <>
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <Textarea 
                  id="descripcion" 
                  placeholder="Descripción del libro"
                  rows={5}
                  {...field}
                />
              )}
            />
            <div className="flex flex-wrap gap-2 mt-1">
              <Button 
                type="button" 
                size="sm"
                variant="outline"
                onClick={generateHtml}
                className="flex items-center gap-1 border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10"
              >
                <Code size={16} />
                Generar código HTML
              </Button>
            </div>
            
            {showHtmlPreview && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3"
              >
                <Label htmlFor="html-output">HTML generado</Label>
                <div className="relative">
                  <Textarea 
                    id="html-output"
                    value={htmlOutput}
                    rows={6}
                    className="font-mono text-sm bg-muted"
                    readOnly
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={copyHtml}
                  >
                    {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                  </Button>
                </div>
                
                <Label className="mt-3">Vista previa</Label>
                <div 
                  className="p-3 border rounded-md bg-card mt-1"
                  dangerouslySetInnerHTML={{ __html: htmlOutput }}
                />
              </motion.div>
            )}
          </>
        ) : (
          book.descripcionHtml ? (
            <div className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: book.descripcionHtml }} />
          ) : (
            <div className="text-sm text-muted-foreground">{book.descripcion}</div>
          )
        )}
      </div>

      {/* Autor */}
      <div className="grid gap-3">
        <Label htmlFor="autor">Autor</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="autor"
            render={({ field }) => (
              <Input 
                id="autor" 
                placeholder="Nombre del autor"
                {...field}
              />
            )}
          />
        ) : (
          <div>{book.autor}</div>
        )}
      </div>

      {/* Best Seller Rank */}
      <div className="grid gap-3">
        <Label htmlFor="bsr">BSR (Best Seller Rank)</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="bsr"
            render={({ field }) => (
              <Input 
                id="bsr" 
                placeholder="Ranking de ventas (p. ej. 12345)"
                type="number"
                {...field}
                value={field.value || ''}
                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : null)}
              />
            )}
          />
        ) : (
          <div>{book.bsr ? `#${book.bsr}` : "No disponible"}</div>
        )}
      </div>
      
      {/* Landing Page URL */}
      <div className="grid gap-3">
        <Label htmlFor="landingPageUrl">URL de Landing Page</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="landingPageUrl"
            render={({ field }) => (
              <div className="flex gap-2">
                <Input 
                  id="landingPageUrl" 
                  placeholder="https://mipagina.com/libro"
                  type="url"
                  {...field}
                  value={field.value || ''}
                />
                {field.value && (
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="flex-shrink-0"
                    onClick={() => window.open(field.value, '_blank')}
                  >
                    <FileText size={16} />
                  </Button>
                )}
              </div>
            )}
          />
        ) : (
          book.landingPageUrl ? (
            <a 
              href={book.landingPageUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#3B82F6] hover:text-[#FB923C] hover:underline flex items-center gap-1"
            >
              <FileText size={16} /> Ver landing page
            </a>
          ) : (
            <div>No definida</div>
          )
        )}
      </div>
    </>
  );
};
