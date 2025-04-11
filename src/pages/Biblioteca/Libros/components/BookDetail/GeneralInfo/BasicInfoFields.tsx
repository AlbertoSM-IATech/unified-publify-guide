
import { useState } from "react";
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { Code, Copy, FileText, CheckCheck, ExternalLink } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

interface BasicInfoFieldsProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
}

export const BasicInfoFields = ({ book, isEditing, form }: BasicInfoFieldsProps) => {
  const [htmlOutput, setHtmlOutput] = useState<string>(book.descripcionHtml || "");
  const [showHtmlPreview, setShowHtmlPreview] = useState(!!book.descripcionHtml);
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

  // Handle copying link to clipboard
  const copyLink = (url: string, title: string = "Enlace") => {
    if (!url) return;
    
    navigator.clipboard.writeText(url).then(() => {
      toast({
        description: `${title} copiado al portapapeles`
      });
    }).catch(() => {
      toast({
        title: "Error al copiar",
        description: `No se pudo copiar el ${title.toLowerCase()}`,
        variant: "destructive"
      });
    });
  };

  return (
    <>
      {/* Sección de Información Básica */}
      <div className="space-y-6">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">Información Básica</h3>
          <Separator className="flex-grow ml-3" />
        </div>
        
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
      </div>

      {/* Sección de Descripción */}
      <div className="space-y-6 mt-8">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">Descripción</h3>
          <Separator className="flex-grow ml-3" />
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor="descripcion">Descripción</Label>
          {isEditing ? (
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
          ) : (
            <div className="text-sm text-muted-foreground whitespace-pre-wrap">{book.descripcion}</div>
          )}
        </div>

        {/* HTML Preview */}
        <div className="mt-4">
          {isEditing ? (
            <div className="flex flex-wrap gap-2">
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
          ) : (
            book.descripcionHtml && (
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex items-center gap-1 mb-3"
                onClick={() => setShowHtmlPreview(!showHtmlPreview)}
              >
                <Code size={16} />
                {showHtmlPreview ? "Ocultar código HTML" : "Ver código HTML"}
              </Button>
            )
          )}
            
          {showHtmlPreview && book.descripcionHtml && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3"
            >
              <Card className="p-4 bg-card border border-muted">
                <div className="flex justify-between items-center mb-3">
                  <Label className="text-sm font-medium">Código HTML</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 flex items-center gap-1"
                    onClick={copyHtml}
                  >
                    {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                    <span className="ml-1">Copiar</span>
                  </Button>
                </div>
              
                <Textarea 
                  id="html-output"
                  value={book.descripcionHtml || htmlOutput}
                  rows={4}
                  className="font-mono text-sm bg-muted mb-3"
                  readOnly
                />
                
                <Label className="text-sm font-medium block mb-2">Vista previa</Label>
                <div 
                  className="p-3 border rounded-md bg-white dark:bg-slate-900 mt-1 text-sm"
                  dangerouslySetInnerHTML={{ __html: book.descripcionHtml || htmlOutput }}
                />
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Sección de Metadatos */}
      <div className="space-y-6 mt-8">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold">Metadatos</h3>
          <Separator className="flex-grow ml-3" />
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
              <div className="flex items-center gap-2">
                <a 
                  href={book.landingPageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#3B82F6] hover:text-[#FB923C] hover:underline flex items-center gap-1"
                >
                  <ExternalLink size={16} /> {book.landingPageUrl}
                </a>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2"
                  onClick={() => copyLink(book.landingPageUrl, "URL de Landing Page")}
                >
                  <Copy size={14} />
                </Button>
              </div>
            ) : (
              <div>No definida</div>
            )
          )}
        </div>
      </div>
    </>
  );
};
