
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilePlus2, File as FileIcon, Image as ImageIcon, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Book } from "../../../../types/bookTypes"; // Assuming bookTypes is correctly pathed

// Definición del tipo para los archivos de Contenido A+ (debe coincidir con la de bookTypes.ts o ser importada)
type ContentAPlusFile = { id: number; name: string; type: string; url?: string };

interface ContentAPlusGallerySectionProps {
  isEditing: boolean;
  form: any; // Using 'any' for form to match parent
  initialFiles?: ContentAPlusFile[];
  onOpenPreview: (file: File | ContentAPlusFile) => void;
}

export const ContentAPlusGallerySection = ({
  isEditing,
  form,
  initialFiles = [],
  onOpenPreview,
}: ContentAPlusGallerySectionProps) => {
  // New files to be uploaded (actual File objects)
  const [newlyAddedFiles, setNewlyAddedFiles] = useState<File[]>([]); 
  // Files for display, merging initial/saved files and info about new files
  const [displayedFiles, setDisplayedFiles] = useState<ContentAPlusFile[]>(initialFiles);

  useEffect(() => {
    setDisplayedFiles(initialFiles);
    // Initialize form with initial files
    form.setValue("contenidoAPlusFiles", initialFiles);
  }, [initialFiles]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFilesArray = Array.from(uploadedFiles);
      setNewlyAddedFiles(prev => [...prev, ...newFilesArray]);

      const newFileObjectsForDisplay = newFilesArray.map((file, index) => ({
        id: Date.now() + index + Math.random(), // Temp unique ID
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'document',
        // url will be generated on preview for new files, or on save for backend
      }));
      
      setDisplayedFiles(prev => [...prev, ...newFileObjectsForDisplay]);
      // Update form with all files (existing from display + new file objects)
      const currentFormFiles = form.getValues("contenidoAPlusFiles") || [];
      form.setValue("contenidoAPlusFiles", [...currentFormFiles, ...newFileObjectsForDisplay]);
    }
  };

  const removeFile = (fileIdToRemove: number) => {
    // Remove from displayedFiles (which contains both saved and new file info)
    const updatedDisplayedFiles = displayedFiles.filter(f => f.id !== fileIdToRemove);
    setDisplayedFiles(updatedDisplayedFiles);

    // Remove from newlyAddedFiles if it was a new file (match by name as IDs are temporary for new ones)
    const fileToRemoveDetails = displayedFiles.find(f => f.id === fileIdToRemove);
    if (fileToRemoveDetails) {
        setNewlyAddedFiles(prevNewFiles => prevNewFiles.filter(nf => nf.name !== fileToRemoveDetails.name));
    }
    
    // Update form value
    form.setValue("contenidoAPlusFiles", updatedDisplayedFiles);
  };

  // Helper to map displayedFile (ContentAPlusFile) back to File object if it's a new one
  const findOriginalFileObject = (displayFile: ContentAPlusFile): File | ContentAPlusFile => {
    const originalNewFile = newlyAddedFiles.find(nf => nf.name === displayFile.name);
    return originalNewFile || displayFile; // Return original File object or the displayFile itself
  };


  if (!isEditing) {
    return (
      <div>
        {displayedFiles && displayedFiles.length > 0 ? (
          <div className="mt-2">
            <Label className="mb-2 block">Archivos adjuntos:</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {displayedFiles.map((file) => {
                const isImage = file.type === 'image';
                return (
                  <div
                    key={file.id}
                    className={`flex flex-col gap-2 p-2 border rounded-md cursor-pointer hover:border-primary/50 transition-colors group bg-card`}
                    onClick={() => onOpenPreview(file)} // Pass ContentAPlusFile here
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
        ) : (
          <p className="text-sm text-muted-foreground">No hay archivos adjuntos para Contenido A+</p>
        )}
      </div>
    );
  }

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
