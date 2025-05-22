
import { Book } from "../../../../types/bookTypes";
import { Separator } from "@/components/ui/separator";
import { DescriptionEditorView } from "./components/DescriptionEditorView";
// Eliminadas importaciones de useHtmlDescription, HtmlActionButtons, HtmlCodePreview

interface DescriptionSectionProps {
  book: Book;
  isEditing: boolean;
  form: any; // Type for react-hook-form instance
}

export const DescriptionSection = ({
  book,
  isEditing,
  form
}: DescriptionSectionProps) => {

  const handleEditorChange = (html: string) => {
    // Actualizamos el campo 'descripcionHtml' del formulario.
    // El RichTextEditor ahora está vinculado a 'descripcionHtml'.
    form.setValue("descripcionHtml", html, {
      shouldValidate: false, // No validar en cada cambio para mejor rendimiento
      shouldDirty: true,    // Marcar el campo como modificado
      shouldTouch: true     // Marcar el campo como tocado
    });
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center">
        <h3 className="text-lg text-blue-500 font-semibold">Descripción</h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
      <DescriptionEditorView
        book={book}
        isEditing={isEditing}
        form={form}
        handleEditorChange={handleEditorChange}
      />

      {/* La sección de HtmlActionButtons y HtmlCodePreview ha sido eliminada */}
    </div>
  );
};
