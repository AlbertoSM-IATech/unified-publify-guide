
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilePlus2, File as FileIcon, ImageIcon, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Definición del tipo para los archivos de Contenido A+
type ContentAPlusFile = { id: number; name: string; type: string; url?: string };

interface ContentAPlusFileEditListProps {
  displayedFiles: ContentAPlusFile[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (fileIdToRemove: number) => void;
  onOpenPreview: (file: File | ContentAPlusFile) => void;
  findOriginalFileObject: (displayFile: ContentAPlusFile) => File | ContentAPlusFile;
}

export const ContentAPlusFileEditList = ({
  displayedFiles,
  handleFileChange,
  removeFile,
  onOpenPreview,
  findOriginalFileObject,
}: ContentAPlusFileEditListProps) => {
  return (
    <div className="grid gap-3">
      <Label htmlFor="contenidoAPlusFilesGallery">Archivos para contenido A+</Label>
      
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("aplus-gallery-file-upload")?.click()}
            className="w-full justify-center py-8 border-dashed text-muted-foreground hover:text-[#FB923C] hover:border-[#FB923C]"
          >
            <FilePlus2 size={24} className="mr-2" />
            Subir archivos para contenido A+
          </Button>
          <Input
            id="aplus-gallery-file-upload"
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <AnimatePresence>
          {(displayedFiles.length > 0) && (
            <motion.div
              className="grid gap-2 mt-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {displayedFiles.map((file, index) => {
                const isImage = file.type === 'image';
                return (
                  <motion.div
                    key={file.id}
                    className="flex items-center justify-between p-3 border rounded-md bg-background"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {isImage ? (
                        <ImageIcon size={16} className="text-[#3B82F6] flex-shrink-0" />
                      ) : (
                        <FileIcon size={16} className="text-[#FB923C] flex-shrink-0" />
                      )}
                      <span className="text-sm truncate ">{file.name}</span>
                    </div>
                    <div className="flex items-center flex-shrink-0">
                       <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => onOpenPreview(findOriginalFileObject(file))}
                        className="h-8 w-8"
                        title="Previsualizar"
                      >
                        {isImage ? (
                          <ImageIcon size={16} className="text-muted-foreground hover:text-primary" />
                        ) : (
                          <FileIcon size={16} className="text-muted-foreground hover:text-primary" />
                        )}
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFile(file.id)}
                        className="h-8 w-8"
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
