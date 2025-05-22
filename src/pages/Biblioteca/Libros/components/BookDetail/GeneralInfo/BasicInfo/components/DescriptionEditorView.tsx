
import { Book } from "../../../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { RichTextEditor } from "./RichTextEditor";
import { Textarea } from "@/components/ui/textarea"; // Añadido para mostrar el HTML

interface DescriptionEditorViewProps {
  book: Book;
  isEditing: boolean;
  form: any; // Type for react-hook-form instance
  handleEditorChange: (html: string) => void;
}

export const DescriptionEditorView = ({
  book,
  isEditing,
  form,
  handleEditorChange,
}: DescriptionEditorViewProps) => {
  // Observamos el campo 'descripcionHtml' para mostrar su contenido en el Textarea
  const currentHtmlContent = form.watch("descripcionHtml");

  return (
    <div className="grid gap-3">
      <Label htmlFor="descripcionHtml" className="text-foreground">Descripción</Label>
      {isEditing ? (
        <>
          <FormField
            control={form.control}
            name="descripcionHtml" // Cambiado de "descripcion" a "descripcionHtml"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <RichTextEditor
                    content={field.value || ""}
                    // onChange es llamado por RichTextEditor, que a su vez llamará a handleEditorChange.
                    // handleEditorChange (definido en DescriptionSection) se encarga de form.setValue("descripcionHtml", html)
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
              value={currentHtmlContent || ""}
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
