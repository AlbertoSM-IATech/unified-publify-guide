
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
    copyHtml,
    hasGeneratedThisEditSession, // Obtener nuevo estado
    setHasGeneratedThisEditSession // Obtener setter
  } = useHtmlDescription(book, form);

  const handleEditorChange = (html: string) => {
    console.log("DescriptionSection handleEditorChange: Recibido HTML del editor:", html ? html.substring(0, 50) + "..." : "vacío");
    
    form.setValue("descripcion", html, { 
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: true 
    });
    
    if (showHtmlPreview) {
      console.log("DescriptionSection handleEditorChange: Ocultando vista previa y reseteando hasGeneratedThisEditSession.");
      setShowHtmlPreview(false);
      setHasGeneratedThisEditSession(false); // Resetear al editar
    }
    
    console.log("DescriptionSection handleEditorChange: Form.descripcion DESPUÉS de setValue:", form.getValues("descripcion") ? form.getValues("descripcion").substring(0, 50) + "..." : "vacío");
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

      <div className="mt-4">
        <HtmlActionButtons
          isEditing={isEditing}
          generateHtml={generateHtml}
          showHtmlPreview={showHtmlPreview}
          setShowHtmlPreview={setShowHtmlPreview}
          bookDescripcionHtml={book.descripcionHtml} // Este prop podría no ser necesario para el botón de toggle en modo edición
          hasGeneratedThisEditSession={hasGeneratedThisEditSession} // Pasar nuevo estado
        />
        {showHtmlPreview && hasGeneratedThisEditSession && ( // HtmlCodePreview solo si se ha generado Y se quiere mostrar
          <HtmlCodePreview
            form={form}
            book={book} // Necesario para la vista no editable
            isEditing={isEditing}
            copyHtml={copyHtml}
            copied={copied}
            showHtmlPreview={showHtmlPreview} // Se mantiene para la lógica interna de HtmlCodePreview si es necesario
          />
        )}
      </div>
    </div>
  );
};
