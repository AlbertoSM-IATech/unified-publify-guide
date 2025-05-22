
import React from "react";
import { Label } from "@/components/ui/label";
import { File as FileIcon, ImageIcon } from "lucide-react";

// Definición del tipo para los archivos de Contenido A+ (debe coincidir con la de bookTypes.ts o ser importada)
type ContentAPlusFile = { id: number; name: string; type: string; url?: string };

interface ContentAPlusFileDisplayListProps {
  files: ContentAPlusFile[];
  onOpenPreview: (file: ContentAPlusFile) => void;
}

export const ContentAPlusFileDisplayList = ({
  files,
  onOpenPreview,
}: ContentAPlusFileDisplayListProps) => {
  if (!files || files.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No hay archivos adjuntos para Contenido A+</p>
    );
  }

  return (
    <div>
      <Label className="mb-2 block">Archivos adjuntos:</Label>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {files.map((file) => {
          const isImage = file.type === 'image';
          return (
            <div
              key={file.id}
              className={`flex flex-col gap-2 p-2 border rounded-md cursor-pointer hover:border-primary/50 transition-colors group bg-card`}
              onClick={() => onOpenPreview(file)}
            >
              <div className={`relative w-full ${isImage ? 'h-24' : 'h-auto py-4 flex items-center justify-center'} bg-muted rounded-md overflow-hidden`}>
                {isImage ? (
                  <>
                    <ImageIcon size={32} className="absolute inset-0 m-auto text-muted-foreground/50 group-hover:opacity-0 transition-opacity" />
                    <img src={file.url || "/placeholders/default-book-cover.png"} alt={file.name} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"/>
                  </>
                ) : (
                  <FileIcon size={32} className="text-muted-foreground/80" />
                )}
              </div>
              <div className="bg-background/50 p-1 mt-auto">
                <span className="text-xs text-foreground truncate block text-center">{file.name}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
