
import { useState } from "react";
import { Book } from "../../../../../types/bookTypes";
import { toast } from "@/hooks/use-toast";
import { UseFormReturn } from "react-hook-form";

export const useHtmlDescription = (book: Book, form: UseFormReturn<any>) => {
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
    navigator.clipboard.writeText(htmlOutput || book.descripcionHtml || "");
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
