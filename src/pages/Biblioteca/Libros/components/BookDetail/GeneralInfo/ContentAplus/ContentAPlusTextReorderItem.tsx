
import React from "react";
import { Reorder } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";

interface ContentSection {
  id: number;
  text: string;
}

interface ContentAPlusTextReorderItemProps {
  section: ContentSection;
  index: number;
  isSingleNonEmptyItem: boolean;
  onContentChange: (index: number, value: string) => void;
  onRemoveSection: (index: number) => void;
}

export const ContentAPlusTextReorderItem = ({
  section,
  index,
  isSingleNonEmptyItem,
  onContentChange,
  onRemoveSection,
}: ContentAPlusTextReorderItemProps) => {
  return (
    <Reorder.Item key={section.id} value={section} className="bg-card border rounded-md p-3">
      <div className="flex items-start gap-2">
        <div className="mt-2 cursor-move">
          <GripVertical size={16} className="text-muted-foreground" />
        </div>
        <div className="flex-grow">
          <Textarea
            placeholder={`Sección ${index + 1} de contenido A+`}
            rows={4}
            value={section.text}
            onChange={(e) => onContentChange(index, e.target.value)}
            className="mb-2"
          />
          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => onRemoveSection(index)}
              disabled={isSingleNonEmptyItem}
            >
              <Trash2 size={14} className="mr-1" /> Eliminar
            </Button>
          </div>
        </div>
      </div>
    </Reorder.Item>
  );
};
