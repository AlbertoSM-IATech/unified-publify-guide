
import { Book } from "../../../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { RichTextEditor } from "./RichTextEditor";
import { Textarea } from "@/components/ui/textarea";
import { useWatch } from "react-hook-form"; // Importar useWatch

interface DescriptionEditorViewProps {
  book: Book;
  isEditing: boolean;
  form: any; // Type for react-hook-form instance, specifically needs form.control
  handleEditorChange: (html: string) => void;
}

export const DescriptionEditorView = ({
  book,
  isEditing,
  form,
  handleEditorChange,
}: DescriptionEditorViewProps) => {
  // Usamos useWatch para observar el campo 'descripcionHtml' de forma más reactiva.
  // Esto asegura que el componente se re-renderice cuando 'descripcionHtml' cambie.
  const currentHtmlContent = useWatch({
    control: form.control, // Pasamos el control del formulario
    name: "descripcionHtml", // El nombre del campo a observar
    defaultValue: form.getValues("descripcionHtml") || "" // Valor inicial opcional
  });

  // console.log("DescriptionEditorView - currentHtmlContent:", currentHtmlContent); // Para depuración

  return (
    <div className="grid gap-3">
      <Label htmlFor="descripcionHtml" className="text-foreground">Descripción</Label>
      {isEditing ? (
        <>
          <FormField
            control={form.control}
            name="descripcionHtml"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <RichTextEditor
                    content={field.value || ""}
                    onChange={handleEditorChange}
                    placeholder="Ingresa la descripción detallada del libro aquí..."
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-4">
            <Label htmlFor="html-output-inline" className="text-sm font-medium text-foreground">
              Código HTML (del editor)
            </Label>
            <Textarea
              id="html-output-inline"
              value={currentHtmlContent || ""} // Usamos el valor observado por useWatch
              rows={8}
              className="font-mono text-xs bg-muted/30 border-border mt-1 focus-visible:ring-ring"
              readOnly
              aria-label="Código HTML generado por el editor"
            />
          </div>
        </>
      ) : (
        <div
          className="text-sm text-muted-foreground prose prose-sm max-w-none dark:prose-invert p-3 border rounded-md bg-card shadow-sm min-h-[100px]"
          dangerouslySetInnerHTML={{ __html: book.descripcionHtml || book.descripcion || "No hay descripción disponible." }}
        />
      )}
    </div>
  );
};
