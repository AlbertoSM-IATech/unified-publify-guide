import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FilePlus2, GripVertical, Trash2 } from "lucide-react"; // GripVertical y Trash2 ya no se usan directamente aquí
import { Reorder } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ContentAPlusTextReorderItem } from "./ContentAPlusTextReorderItem"; // Importamos el nuevo componente
import { Textarea } from "@/components/ui/textarea"; // Textarea ya no se usa directamente aquí

interface ContentSection {
  id: number;
  text: string;
}

interface ContentAPlusTextSectionProps {
  isEditing: boolean;
  form: any; // Using 'any' for form to match parent
  initialTextContent?: string;
}

export const ContentAPlusTextSection = ({
  isEditing,
  form,
  initialTextContent,
}: ContentAPlusTextSectionProps) => {
  const [contentSections, setContentSections] = useState<ContentSection[]>(
    initialTextContent
      ? initialTextContent.split('\n\n---\n\n').map((section, idx) => ({ id: Date.now() + Math.random() + idx, text: section }))
      : [{ id: Date.now(), text: '' }]
  );

  useEffect(() => {
    // Initialize form if initialTextContent is provided and sections are generated
    if (initialTextContent && contentSections.length > 0 && contentSections.some(s => s.text)) {
      form.setValue("contenidoAPlus", contentSections.map(section => section.text).join('\n\n---\n\n'));
    } else if (!initialTextContent) {
       // Ensure form is cleared or set to default if no initial content
      form.setValue("contenidoAPlus", "");
    }
  }, []); // Run once on mount

  const handleContentChange = (index: number, value: string) => {
    const newSections = [...contentSections];
    newSections[index].text = value;
    setContentSections(newSections);
    form.setValue("contenidoAPlus", newSections.map(section => section.text).join('\n\n---\n\n'));
  };

  const addContentSection = () => {
    const newSections = [...contentSections, { id: Date.now() + Math.random(), text: '' }];
    setContentSections(newSections);
    // Form value will be updated on next content change, or could be updated here explicitly if needed
  };

  const removeContentSection = (index: number) => {
    const newSections = [...contentSections];
    newSections.splice(index, 1);
    setContentSections(newSections);
    form.setValue("contenidoAPlus", newSections.map(section => section.text).join('\n\n---\n\n'));
  };

  const handleReorder = (newOrder: ContentSection[]) => {
    setContentSections(newOrder);
    form.setValue("contenidoAPlus", newOrder.map(section => section.text).join('\n\n---\n\n'));
  };

  if (!isEditing) {
    const sectionsToDisplay = contentSections.filter(s => s.text.trim() !== "");
    return (
      <div className="space-y-4">
        {sectionsToDisplay.length > 0 ? (
          sectionsToDisplay.map((section, index) => (
            <Card key={section.id || index} className="mb-4">
              <CardContent className="p-4">
                <p className="whitespace-pre-wrap">{section.text}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No hay contenido A+ de texto definido.</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Reorder.Group
        axis="y"
        values={contentSections}
        onReorder={handleReorder}
        className="space-y-4"
      >
        {contentSections.map((section, index) => (
          <ContentAPlusTextReorderItem
            key={section.id}
            section={section}
            index={index}
            isSingleNonEmptyItem={contentSections.length <= 1 && section.text.trim() === ''}
            onContentChange={handleContentChange}
            onRemoveSection={removeContentSection}
          />
        ))}
      </Reorder.Group>

      <Button
        type="button"
        size="sm"
        variant="outline"
        className="w-full mt-2"
        onClick={addContentSection}
      >
        <FilePlus2 size={16} className="mr-1" /> Agregar sección
      </Button>
    </div>
  );
};
