import { useState } from "react";
import { Book } from "../../../../types/bookTypes";
import { Separator } from "@/components/ui/separator";
import { DescriptionEditorView } from "./components/DescriptionEditorView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
interface DescriptionSectionProps {
  book: Book;
  isEditing: boolean;
  form: any; // Type for react-hook-form instance
  onUpdateBook: (updatedData: Partial<Book>) => void;
}
export const DescriptionSection = ({
  book,
  isEditing,
  form,
  onUpdateBook
}: DescriptionSectionProps) => {
  const [activeTab, setActiveTab] = useState("editor");
  const {
    toast
  } = useToast();
  const handleEditorChange = (html: string) => {
    form.setValue("descripcionHtml", html, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true
    });
    if (onUpdateBook) {
      onUpdateBook({
        descripcionHtml: html
      });
    }
  };

  // Observamos el valor de descripcionHtml directamente desde el formulario
  // para asegurar que la pestaña HTML muestre el contenido más reciente durante la edición.
  const currentHtmlDescription = form.watch("descripcionHtml");
  const htmlContentForTab = isEditing ? currentHtmlDescription : book.descripcionHtml;
  const handleCopyHtml = () => {
    if (htmlContentForTab) {
      navigator.clipboard.writeText(htmlContentForTab).then(() => {
        toast({
          title: "HTML Copiado",
          description: "El código HTML de la descripción se ha copiado al portapapeles.",
          variant: "default"
        });
      }).catch(err => {
        console.error("Error al copiar HTML: ", err);
        toast({
          title: "Error al copiar",
          description: "No se pudo copiar el código HTML.",
          variant: "destructive"
        });
      });
    } else {
      toast({
        title: "Nada que copiar",
        description: "No hay contenido HTML para copiar.",
        variant: "default"
      });
    }
  };
  return <div className="space-y-6 mt-8">
      <div className="flex items-center">
        <h3 className="text-lg font-semibold text-content-medium">Descripción</h3>
        <Separator className="flex-grow ml-3" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="editor">Editor Visual</TabsTrigger>
          <TabsTrigger value="html">Ver HTML</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <DescriptionEditorView book={book} isEditing={isEditing} form={form} handleEditorChange={handleEditorChange} />
        </TabsContent>

        <TabsContent value="html">
          <div className="space-y-2">
            <Textarea value={htmlContentForTab || "No hay descripción HTML disponible."} readOnly rows={10} className="font-mono text-xs bg-muted/30 border-border focus-visible:ring-ring w-full" aria-label="Código HTML de la descripción" />
            <Button onClick={handleCopyHtml} variant="outline" size="sm">
              <Copy size={16} className="mr-2" />
              Copiar HTML
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};