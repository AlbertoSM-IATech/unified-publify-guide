
import { useState } from "react";
import { Book } from "../../../../../types/bookTypes";
import { toast } from "@/hooks/use-toast";
import { UseFormReturn } from "react-hook-form";

export const useHtmlDescription = (book: Book, form: UseFormReturn<any>) => {
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasGeneratedThisEditSession, setHasGeneratedThisEditSession] = useState(false); // Nuevo estado

  const generateHtml = () => {
    const description = form.getValues("descripcion");
    console.log("generateHtml: Contenido actual de form.descripcion:", description ? description.substring(0,50) + "..." : "vacío");
    
    if (!description || description.trim() === "<p></p>" || description.trim() === "") {
      toast({
        title: "Descripción vacía",
        description: "Por favor, introduce una descripción primero.",
        variant: "destructive",
      });
      setHasGeneratedThisEditSession(false); // Asegurar que no se considera generado
      setShowHtmlPreview(false); // Ocultar si estaba visible
      return;
    }
    
    console.log("generateHtml: Estableciendo descripcionHtml con el contenido de form.descripcion");
    form.setValue("descripcionHtml", description, { 
      shouldValidate: false,
      shouldDirty: true
    });
    
    setHasGeneratedThisEditSession(true); // Marcar como generado en esta sesión
    setShowHtmlPreview(true); // Mostrar la vista previa automáticamente
    
    toast({
      title: "HTML generado",
      description: "El código HTML se ha generado y la vista previa está visible.",
    });
  };

  const copyHtml = () => {
    const htmlToCopy = form.getValues("descripcionHtml") || ""; // No tomar de book.descripcionHtml aquí
    console.log("copyHtml: Contenido a copiar (de form.descripcionHtml):", htmlToCopy ? htmlToCopy.substring(0,50) + "..." : "vacío");
    
    if (!htmlToCopy) {
      toast({
        title: "Nada que copiar",
        description: "No hay código HTML generado para copiar.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      navigator.clipboard.writeText(htmlToCopy);
      setCopied(true);
      toast({
        title: "Copiado",
        description: "El código HTML se ha copiado al portapapeles.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
      toast({
        title: "Error al copiar",
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
    copyHtml,
    hasGeneratedThisEditSession, // Exponer nuevo estado
    setHasGeneratedThisEditSession // Exponer setter para resetear
  };
};
