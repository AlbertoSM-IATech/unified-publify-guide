
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
  
  return (
    <div className="grid gap-3">
      <Label htmlFor="descripcion" className="text-foreground">Descripción</Label>
      {isEditing ? (
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => {
            console.log("DescriptionEditorView FormField render (isEditing=true): field.value for 'descripcion':", field.value ? field.value.substring(0, 50) + "..." : "undefined/empty");
            return (
              <FormItem className="w-full">
                <FormControl>
                  <RichTextEditor
                    content={field.value || ""} // book.descripcion ya está en form.defaultValues
                    onChange={(html) => {
                      // console.log("DescriptionEditorView RichTextEditor onChange: Calling handleEditorChange with HTML:", html ? html.substring(0,50) + "..." : "empty");
                      handleEditorChange(html);
                    }}
                    placeholder="Ingresa la descripción del libro"
                    // readOnly={!isEditing} // RichTextEditor ya maneja esto internamente basado en su prop readOnly
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
