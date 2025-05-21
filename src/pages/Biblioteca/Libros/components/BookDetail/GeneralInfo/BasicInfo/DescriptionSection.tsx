
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

  // Handle rich text editor changes without causing infinite recursion
  const handleEditorChange = (html: string) => {
    // Prevent recursive updates by temporarily disabling watch
    const watchState = form.formState.isSubmitted;
    form._options.shouldUnregister = true;
    
    form.setValue("descripcion", html, { 
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true 
    });
    
    form.setValue("descripcionHtml", html, { 
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true 
    });
    
    form._options.shouldUnregister = false;
    form.formState.isSubmitted = watchState;
  };
  
  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center">
        <h3 className="text-lg text-blue-500 font-extrabold">Descripción</h3>
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

