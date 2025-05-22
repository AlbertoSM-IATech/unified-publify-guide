
import { Button } from "@/components/ui/button";
import { Code, Eye, EyeOff } from "lucide-react";
// import { Book } from "../../../../../types/bookTypes"; // No se usa Book directamente

interface HtmlActionButtonsProps {
  isEditing: boolean;
  generateHtml: () => void;
  showHtmlPreview: boolean;
  setShowHtmlPreview: (show: boolean) => void;
  bookDescripcionHtml?: string | null; // Usado para el modo no edición
  hasGeneratedThisEditSession?: boolean; // Nuevo prop, opcional para compatibilidad
}

export const HtmlActionButtons = ({
  isEditing,
  generateHtml,
  showHtmlPreview,
  setShowHtmlPreview,
  bookDescripcionHtml,
  hasGeneratedThisEditSession,
}: HtmlActionButtonsProps) => {
  if (isEditing) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={generateHtml}
          className="flex items-center gap-1 border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10 hover:text-[#FB923C] font-medium transition-colors shadow-sm"
        >
          <Code size={16} />
          Generar código HTML
        </Button>
        {hasGeneratedThisEditSession && ( // Solo mostrar el botón de toggle si se ha generado HTML
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={() => setShowHtmlPreview(!showHtmlPreview)}
            className="flex items-center gap-1 hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors shadow-sm"
          >
            {showHtmlPreview ? <EyeOff size={16} /> : <Eye size={16} />}
            {showHtmlPreview ? "Ocultar HTML" : "Ver HTML"}
          </Button>
        )}
      </div>
    );
  }

  // Lógica para modo no edición (solo ver HTML si existe en el libro)
  if (bookDescripcionHtml) {
    return (
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="flex items-center gap-1 mb-3 hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10 transition-colors shadow-sm"
        onClick={() => setShowHtmlPreview(!showHtmlPreview)}
      >
        {showHtmlPreview ? <EyeOff size={16} /> : <Eye size={16} />}
        {showHtmlPreview ? "Ocultar código HTML" : "Ver código HTML generado"}
      </Button>
    );
  }

  return null;
};
