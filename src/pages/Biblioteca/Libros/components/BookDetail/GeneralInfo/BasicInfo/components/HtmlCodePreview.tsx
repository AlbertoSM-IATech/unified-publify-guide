
import { Book } from "../../../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface HtmlCodePreviewProps {
  form: any; // Type from react-hook-form
  book: Book;
  isEditing: boolean;
  copyHtml: () => void;
  copied: boolean;
  showHtmlPreview: boolean;
}

export const HtmlCodePreview = ({
  form,
  book,
  isEditing,
  copyHtml,
  copied,
  showHtmlPreview,
}: HtmlCodePreviewProps) => {
  if (!showHtmlPreview) {
    return null;
  }

  // Obtener contenido HTML del formulario o del libro
  const htmlContent = isEditing ? form.getValues("descripcionHtml") : book.descripcionHtml;
  console.log("HtmlCodePreview: Mostrando contenido HTML:", htmlContent ? htmlContent.substring(0, 50) + "..." : "vacío");

  if (!htmlContent && !isEditing) { // Don't show if not editing and no HTML content
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      className="mt-3"
    >
      <Card className="p-4 bg-card border border-muted shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <Label className="text-sm font-medium text-foreground">Código HTML</Label>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-8 flex items-center gap-1 hover:bg-[#FB923C]/10 hover:text-[#FB923C]"
            onClick={copyHtml}
          >
            {copied ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} />}
            <span className="ml-1">{copied ? "Copiado" : "Copiar"}</span>
          </Button>
        </div>

        <Textarea
          id="html-output"
          value={htmlContent || ""}
          rows={4}
          className="font-mono text-sm bg-muted/50 border-muted mb-3 focus-visible:ring-[#FB923C]/50"
          readOnly={!isEditing}
          onChange={(e) => {
            if (isEditing) {
              console.log("HtmlCodePreview: Usuario editando manualmente el HTML");
              form.setValue("descripcionHtml", e.target.value, {
                shouldValidate: false,
                shouldDirty: true,
              });
            }
          }}
        />

        <Label className="text-sm font-medium block mb-2 text-foreground">Vista previa</Label>
        <div
          className="p-3 border rounded-md bg-[#FB923C]/10 dark:bg-[#FB923C]/5 mt-1 text-sm prose prose-sm max-w-none dark:prose-invert shadow-inner"
          dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
        />
      </Card>
    </motion.div>
  );
};
