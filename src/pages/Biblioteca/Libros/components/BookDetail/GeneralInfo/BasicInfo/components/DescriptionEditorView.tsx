
import { Book } from "../../../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { RichTextEditor } from "./RichTextEditor";

interface DescriptionEditorViewProps {
  book: Book;
  isEditing: boolean;
  form: any; // Type from react-hook-form
  handleEditorChange: (html: string) => void;
}

export const DescriptionEditorView = ({
  book,
  isEditing,
  form,
  handleEditorChange,
}: DescriptionEditorViewProps) => {
  console.log("DescriptionEditorView render: isEditing:", isEditing);
  console.log("DescriptionEditorView render: Valor actual form.descripcion:", form.getValues("descripcion") ? form.getValues("descripcion").substring(0, 50) + "..." : "vacío");
  
  return (
    <div className="grid gap-3">
      <Label htmlFor="descripcion" className="text-foreground">Descripción</Label>
      {isEditing ? (
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => {
            console.log("DescriptionEditorView FormField render: field.value:", field.value ? field.value.substring(0, 50) + "..." : "undefined/empty");
            return (
              <FormItem className="w-full">
                <FormControl>
                  <RichTextEditor
                    content={field.value || ""} // Usa el valor del campo
                    onChange={(html) => {
                      console.log("DescriptionEditorView: Editor cambió. Llamando a handleEditorChange");
                      handleEditorChange(html);
                    }}
                    placeholder="Ingresa la descripción del libro"
                  />
                </FormControl>
              </FormItem>
            );
          }}
        />
      ) : (
        <div
          className="text-sm text-muted-foreground prose prose-sm max-w-none dark:prose-invert p-3 border rounded-md bg-card shadow-sm"
          dangerouslySetInnerHTML={{ __html: book.descripcion || form.getValues("descripcion") || "" }}
        />
      )}
    </div>
  );
};
