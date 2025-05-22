
import { useState } from "react";
import { Book } from "../../../../../types/bookTypes";
import { toast } from "@/hooks/use-toast";
import { UseFormReturn } from "react-hook-form";

export const useHtmlDescription = (book: Book, form: UseFormReturn<any>) => {
  const [htmlOutput, setHtmlOutput] = useState<string>(book.descripcionHtml || "");
  // Ensure showHtmlPreview is false by default, regardless of whether there's HTML content
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHtml = () => {
    // Obtener la descripción del formulario o del libro
    const description = form.getValues("descripcion") || book.descripcion;
    if (!description) {
      toast({
        title: "Error",
        description: "Por favor, introduce una descripción primero",
        variant: "destructive",
      });
      return;
    }
    
    // Usamos el HTML directamente del editor
    let html = description;
    
    // Actualizar el estado local
    setHtmlOutput(html);
    
    // Actualizar el valor en el formulario
    form.setValue("descripcionHtml", html, { 
      shouldValidate: false,
      shouldDirty: true
    });
    
    // Mostrar la vista previa automáticamente
    setShowHtmlPreview(true);
    
    toast({
      title: "HTML generado",
      description: "El código HTML se ha generado correctamente",
    });
  };

  const copyHtml = () => {
    const htmlToCopy = form.getValues("descripcionHtml") || book.descripcionHtml || "";
    
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
    htmlOutput,
    showHtmlPreview,
    setShowHtmlPreview,
    copied,
    generateHtml,
    copyHtml
  };
};
