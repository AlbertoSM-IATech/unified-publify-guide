
import { toast } from "@/hooks/use-toast";

export const useLinkCopy = () => {
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

  return { copyLink };
};
