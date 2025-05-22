
import { Book } from "../../../../types/bookTypes";
import { Separator } from "@/components/ui/separator";
import { useHtmlDescription } from "./hooks/useHtmlDescription";
import { DescriptionEditorView } from "./components/DescriptionEditorView";
import { HtmlActionButtons } from "./components/HtmlActionButtons";
import { HtmlCodePreview } from "./components/HtmlCodePreview";

interface DescriptionSectionProps {
  book: Book;
  isEditing: boolean;
  form: any; // Using 'any' here to handle the extended form object from useGeneralInfoForm
}

export const DescriptionSection = ({
  book,
  isEditing,
  form
}: DescriptionSectionProps) => {
  const {
    showHtmlPreview,
    setShowHtmlPreview,
    copied,
    generateHtml,
    copyHtml
  } = useHtmlDescription(book, form);

  // Handle rich text editor changes - actualiza tanto descripcion como descripcionHtml
  const handleEditorChange = (html: string) => {
    console.log("DescriptionSection handleEditorChange: Received HTML from RichTextEditor:", html);
    // console.log("DescriptionSection handleEditorChange: Current form.descripcion BEFORE setValue:", form.getValues("descripcion"));
    
    // Actualiza el campo 'descripcion' que está vinculado al editor
    form.setValue("descripcion", html, { 
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true 
    });
    // console.log("DescriptionSection handleEditorChange: Form.descripcion AFTER setValue:", form.getValues("descripcion"));
  };
  
  console.log("DescriptionSection render: isEditing:", isEditing, "Book description:", book.descripcion);
  console.log("DescriptionSection render: Form values for descripcion:", form.getValues("descripcion"));

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

      <div className="mt-4">
        <HtmlActionButtons
          isEditing={isEditing}
          generateHtml={generateHtml}
          showHtmlPreview={showHtmlPreview}
          setShowHtmlPreview={setShowHtmlPreview}
          bookDescripcionHtml={book.descripcionHtml}
        />
        <HtmlCodePreview
          form={form}
          book={book}
          isEditing={isEditing}
          copyHtml={copyHtml}
          copied={copied}
          showHtmlPreview={showHtmlPreview}
        />
      </div>
    </div>
  );
};
