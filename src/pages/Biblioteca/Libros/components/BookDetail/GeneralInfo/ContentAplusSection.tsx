
import React, { useState } from "react";
import { Book } from "../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { FilePlus2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentAPlusTextSection } from "./ContentAplus/ContentAPlusTextSection";
import { ContentAPlusGallerySection } from "./ContentAplus/ContentAPlusGallerySection";
import { ContentAPlusPreviewDialog } from "./ContentAplus/ContentAPlusPreviewDialog";

// Definición del tipo para los archivos de Contenido A+
type ContentAPlusFile = { id: number; name: string; type: string; url?: string };

interface ContentAplusSectionProps {
  book: Book;
  isEditing: boolean;
  form: any; 
}

export const ContentAplusSection = ({ book, isEditing, form }: ContentAplusSectionProps) => {
  // State for preview dialog
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFileName, setPreviewFileName] = useState<string>("");
  const [previewFileType, setPreviewFileType] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleOpenPreview = (fileToPreview: File | ContentAPlusFile) => {
    setPreviewFileName(fileToPreview.name);
    
    let fileTypeResolved: string;
    let tempPreviewUrl: string | null = null;

    if (fileToPreview instanceof File) { // New file (File object)
      fileTypeResolved = fileToPreview.type.startsWith('image/') ? 'image' : 'document';
      if (fileTypeResolved === "image") {
        tempPreviewUrl = URL.createObjectURL(fileToPreview);
      }
    } else { // Existing file (ContentAPlusFile object)
      fileTypeResolved = fileToPreview.type === 'image' ? 'image' : 'document';
      if (fileTypeResolved === "image") {
        tempPreviewUrl = fileToPreview.url || "/placeholders/default-book-cover.png"; 
      }
    }
    
    setPreviewFileType(fileTypeResolved);
    setPreviewUrl(tempPreviewUrl || (fileTypeResolved === 'document' ? 'document_placeholder' : null) );
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPreviewFileName("");
    setPreviewFileType(null);
    setIsPreviewOpen(false);
  };
  
  return (
    <div className="grid gap-6 mt-3 p-4 border rounded-md bg-muted/30">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Contenido A+</h3>
        {isEditing && (
          <Button 
            size="sm" 
            variant="outline"
            className="text-[#FB923C] border-[#FB923C] hover:bg-[#FB923C]/10"
            // onClick={() => {/* Implementar lógica para ver guía A+ si es necesario */}}
          >
            <FilePlus2 size={16} className="mr-1" /> Ver guía A+
          </Button>
        )}
      </div>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="text">Texto</TabsTrigger>
          <TabsTrigger value="gallery">Galería</TabsTrigger>
        </TabsList>
        
        <TabsContent value="text">
          <ContentAPlusTextSection
            isEditing={isEditing}
            form={form}
            initialTextContent={book.contenidoAPlus}
          />
        </TabsContent>
        
        <TabsContent value="gallery">
          <ContentAPlusGallerySection
            isEditing={isEditing}
            form={form}
            initialFiles={book.contenidoAPlusFiles || []}
            onOpenPreview={handleOpenPreview}
          />
        </TabsContent>
      </Tabs>

      <ContentAPlusPreviewDialog
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        fileName={previewFileName}
        fileUrl={previewUrl}
        fileType={previewFileType}
      />
    </div>
  );
};
