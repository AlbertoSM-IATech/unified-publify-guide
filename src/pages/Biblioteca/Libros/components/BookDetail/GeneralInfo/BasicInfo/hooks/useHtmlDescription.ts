
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
    const description = form.getValues("descripcion") || book.descripcion;
    if (!description) {
      toast({
        title: "Error",
        description: "Por favor, introduce una descripción primero",
        variant: "destructive",
      });
      return;
    }
    
    // Since we're using a rich text editor, the HTML is already generated
    // We just need to set it to the description HTML field
    let html = description;
    
    setHtmlOutput(html);
    
    // Set the value without triggering watch effects to avoid recursion
    form.setValue("descripcionHtml", html, { 
      shouldValidate: false,
      shouldDirty: true
    });
    
    setShowHtmlPreview(true);
    
    toast({
      title: "HTML generado",
      description: "El código HTML se ha generado correctamente",
    });
  };

  const copyHtml = () => {
    const htmlToCopy = form.getValues("descripcionHtml") || book.descripcionHtml || "";
    navigator.clipboard.writeText(htmlToCopy);
    setCopied(true);
    
    toast({
      title: "Copiado",
      description: "El código HTML se ha copiado al portapapeles",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
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
