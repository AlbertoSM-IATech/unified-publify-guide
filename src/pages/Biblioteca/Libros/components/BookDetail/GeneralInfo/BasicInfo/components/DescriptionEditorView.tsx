
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
  return (
    <div className="grid gap-3">
      <Label htmlFor="descripcion" className="text-foreground">Descripción</Label>
      {isEditing ? (
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RichTextEditor
                  content={field.value || ""}
                  onChange={handleEditorChange}
                  placeholder="Ingresa la descripción del libro"
                />
              </FormControl>
            </FormItem>
          )}
        />
      ) : (
        <div
          className="text-sm text-muted-foreground prose prose-sm max-w-none dark:prose-invert p-3 border rounded-md bg-card shadow-sm"
          dangerouslySetInnerHTML={{ __html: book.descripcion || "" }}
        />
      )}
    </div>
  );
};
