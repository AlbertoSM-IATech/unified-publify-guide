import { Book } from "../../../../types/bookTypes";
import { Separator } from "@/components/ui/separator";
import { DescriptionEditorView } from "./components/DescriptionEditorView";
interface DescriptionSectionProps {
  book: Book;
  isEditing: boolean;
  form: any; // Type for react-hook-form instance
  onUpdateBook: (updatedData: Partial<Book>) => void; // Añadido
}
export const DescriptionSection = ({
  book,
  isEditing,
  form,
  onUpdateBook // Añadido
}: DescriptionSectionProps) => {
  const handleEditorChange = (html: string) => {
    // Actualizamos el campo 'descripcionHtml' del formulario de react-hook-form.
    form.setValue("descripcionHtml", html, {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true
    });

    // También actualizamos el formData general del libro para que se guarde correctamente.
    if (onUpdateBook) {
      onUpdateBook({
        descripcionHtml: html
      });
    }
  };
  return <div className="space-y-6 mt-8">
      <div className="flex items-center">
        <h3 className="text-lg text-blue-500 font-semibold">Descripción </h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
      <DescriptionEditorView book={book} isEditing={isEditing} form={form} handleEditorChange={handleEditorChange} />
    </div>;
};