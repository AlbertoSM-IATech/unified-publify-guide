
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus2 } from "lucide-react";

interface ContentAPlusFileUploadProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputId?: string;
}

export const ContentAPlusFileUpload = ({
  handleFileChange,
  inputId = "aplus-gallery-file-upload",
}: ContentAPlusFileUploadProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={() => document.getElementById(inputId)?.click()}
        className="w-full justify-center py-8 border-dashed text-muted-foreground hover:text-[#FB923C] hover:border-[#FB923C]"
      >
        <FilePlus2 size={24} className="mr-2" />
        Subir archivos para contenido A+
      </Button>
      <Input
        id={inputId}
        type="file"
        multiple
        accept="image/*,.pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
