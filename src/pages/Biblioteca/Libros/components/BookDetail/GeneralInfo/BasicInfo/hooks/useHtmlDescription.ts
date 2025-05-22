
import { useState } from "react";
import { Book } from "../../../../../types/bookTypes";
import { toast } from "@/hooks/use-toast";
import { UseFormReturn } from "react-hook-form";

export const useHtmlDescription = (book: Book, form: UseFormReturn<any>) => {
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasGeneratedThisEditSession, setHasGeneratedThisEditSession] = useState(false);

  const generateHtml = () => {
    const description = form.getValues("descripcion");
    
    if (!description || description.trim() === "<p></p>" || description.trim() === "") {
      toast({
        title: "Descripción vacía",
        description: "Por favor, introduce una descripción primero.",
        variant: "destructive",
      });
      return;
    }
    
    form.setValue("descripcionHtml", description, { 
      shouldValidate: false,
      shouldDirty: true
    });
    
    setHasGeneratedThisEditSession(true);
    setShowHtmlPreview(true);
    
    toast({
      title: "HTML generado",
      description: "El código HTML se ha generado correctamente.",
    });
  };

  const copyHtml = () => {
    const htmlToCopy = form.getValues("descripcionHtml") || "";
    
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
    hasGeneratedThisEditSession,
    setHasGeneratedThisEditSession
  };
};
