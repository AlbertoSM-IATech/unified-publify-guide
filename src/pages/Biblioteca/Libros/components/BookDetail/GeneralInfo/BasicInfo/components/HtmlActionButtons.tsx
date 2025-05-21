
import { Button } from "@/components/ui/button";
import { Code, Eye, EyeOff } from "lucide-react";
import { Book } from "../../../../../types/bookTypes";

interface HtmlActionButtonsProps {
  isEditing: boolean;
  generateHtml: () => void;
  showHtmlPreview: boolean;
  setShowHtmlPreview: (show: boolean) => void;
  bookDescripcionHtml?: string | null;
}

export const HtmlActionButtons = ({
  isEditing,
  generateHtml,
  showHtmlPreview,
  setShowHtmlPreview,
  bookDescripcionHtml,
}: HtmlActionButtonsProps) => {
  if (isEditing) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={generateHtml}
          className="flex items-center gap-1 border-[#FB923C] text-[#FB923C] hover:bg-[#FB923C]/10"
        >
          <Code size={16} />
          Generar código HTML
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => setShowHtmlPreview(!showHtmlPreview)}
          className="flex items-center gap-1"
        >
          {showHtmlPreview ? <EyeOff size={16} /> : <Eye size={16} />}
          {showHtmlPreview ? "Ocultar HTML" : "Ver HTML"}
        </Button>
      </div>
    );
  }

  if (bookDescripcionHtml) {
    return (
      <Button
        type="button"
        size="sm"
        variant="outline"
        className="flex items-center gap-1 mb-3"
        onClick={() => setShowHtmlPreview(!showHtmlPreview)}
      >
        {showHtmlPreview ? <EyeOff size={16} /> : <Eye size={16} />}
        {showHtmlPreview ? "Ocultar código HTML" : "Ver código HTML generado"}
      </Button>
    );
  }

  return null;
};

