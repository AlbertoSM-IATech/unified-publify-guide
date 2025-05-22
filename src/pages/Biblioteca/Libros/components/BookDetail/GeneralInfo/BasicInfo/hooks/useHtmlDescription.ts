
import { useState } from "react";
import { Book } from "../../../../../types/bookTypes";
import { toast } from "@/hooks/use-toast";
import { UseFormReturn } from "react-hook-form";

export const useHtmlDescription = (book: Book, form: UseFormReturn<any>) => {
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHtml = () => {
    // Obtener la descripción del formulario (contenido del RichTextEditor)
    const description = form.getValues("descripcion");
    
    if (!description) {
      toast({
        title: "Error",
        description: "Por favor, introduce una descripción primero",
        variant: "destructive",
      });
      return;
    }
    
    // Usamos directamente el HTML del editor para ambos campos
    form.setValue("descripcionHtml", description, { 
      shouldValidate: false,
      shouldDirty: true
    });
    
    // Mostrar la vista previa automáticamente
    setShowHtmlPreview(true);
    
    toast({
      title: "HTML generado",
      description: "El código HTML se ha generado correctamente y la vista previa está visible.",
    });
  };

  const copyHtml = () => {
    // Obtener el HTML del campo 'descripcionHtml' del formulario, o del libro como fallback
    const htmlToCopy = form.getValues("descripcionHtml") || book.descripcionHtml || "";
    
    if (!htmlToCopy) {
      toast({
        title: "Error",
        description: "No hay código HTML para copiar. Genera el HTML primero.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      navigator.clipboard.writeText(htmlToCopy);
      setCopied(true);
      
      toast({
        title: "Copiado",
        description: "El código HTML se ha copiado al portapapeles",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
      toast({
        title: "Error",
        description: "No se pudo copiar el código. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  return {
    showHtmlPreview,
    setShowHtmlPreview,
    copied,
    generateHtml,
    copyHtml
  };
};
