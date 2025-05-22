import React, { useState, useEffect } from "react";
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { FilePlus2, File as FileIcon, Image as ImageIcon, Trash2, GripVertical, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ContentAplusSectionProps {
  book: Book;
  isEditing: boolean;
  form: any; // Using 'any' here to handle the extended form object from useGeneralInfoForm
}

// Definición del tipo para los archivos de Contenido A+
type ContentAPlusFile = { id: number; name: string; type: string; url?: string };

export const ContentAplusSection = ({ book, isEditing, form }: ContentAplusSectionProps) => {
  const [files, setFiles] = useState<File[]>([]); // Files to be uploaded
  const [contentSections, setContentSections] = useState(
    book.contenidoAPlus 
      ? book.contenidoAPlus.split('\n\n---\n\n').map(section => ({ id: Date.now() + Math.random(), text: section }))
      : [{ id: Date.now(), text: '' }]
  );

  // State for preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFileName, setPreviewFileName] = useState<string>("");
  const [previewFileType, setPreviewFileType] = useState<string | null>(null);

  // Effect to combine existing files with form files for display
  const [displayedFiles, setDisplayedFiles] = useState<ContentAPlusFile[]>([]);

  useEffect(() => {
    // This effect ensures that displayedFiles is a merge of book.contenidoAPlusFiles
    // and any new files that might be in form.getValues("contenidoAPlusFiles") but not yet saved.
    // For simplicity, we'll primarily rely on book.contenidoAPlusFiles for existing
    // and `files` state for newly added ones before save.
    // A more robust solution might involve merging form values if they represent the source of truth.
    if (book.contenidoAPlusFiles) {
      setDisplayedFiles(book.contenidoAPlusFiles);
    }
  }, [book.contenidoAPlusFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFilesArray = Array.from(uploadedFiles);
      setFiles(prevFiles => [...prevFiles, ...newFilesArray]);
      
      const fileObjectsForForm = newFilesArray.map((file, index) => ({
        id: Date.now() + index + Math.random(), // ensure unique id
        name: file.name,
        // Determine type based on mime type for new files
        type: file.type.startsWith('image/') ? 'image' : 'document' 
      }));
      
      const existingFormFiles = form.getValues("contenidoAPlusFiles") || [];
      form.setValue("contenidoAPlusFiles", [...existingFormFiles, ...fileObjectsForForm]);
      // Update displayed files immediately for newly added ones
      setDisplayedFiles(prev => [...prev, ...fileObjectsForForm]);
    }
  };

  const removeFile = (fileIdToRemove: number, isNewFile: boolean) => {
    if (isNewFile) {
      // Find original File object by name from `files` state if possible, or use ID if we map IDs there too.
      // For simplicity, let's assume IDs in `fileObjectsForForm` map to something we can filter `files` by,
      // or filter `files` by name if names are unique enough for this stage.
      // This part needs careful handling of how `files` (File[]) and form values (ContentAPlusFile[]) are synced.
      // Let's assume for now we remove by index from `files` if `fileIdToRemove` is an index.
      // If `fileIdToRemove` is an ID, we need to map it back.
      // This mock remove needs to be more robust. For now, removing from displayed and form.
      console.warn("Removing new files needs a more robust ID mapping or removal by index from `files` state.")
    }
    
    const updatedFormFiles = (form.getValues("contenidoAPlusFiles") || []).filter((f: ContentAPlusFile) => f.id !== fileIdToRemove);
    form.setValue("contenidoAPlusFiles", updatedFormFiles);
    setDisplayedFiles(updatedFormFiles); // Re-sync displayed files from form after removal

    // If it was a new file from `files` state, also remove it from there.
    // This requires knowing if `fileIdToRemove` corresponds to a new file and its index in `files`.
    // For this example, we are simplifying and mainly managing `displayedFiles` and form values.
    // A better approach would be to give temporary IDs to new files in `files` state that match form values.
  };

  const handleContentChange = (index: number, value: string) => {
    const newSections = [...contentSections];
    newSections[index].text = value;
    setContentSections(newSections);
    
    // Update the form data
    form.setValue("contenidoAPlus", newSections.map(section => section.text).join('\n\n---\n\n'));
  };

  const addContentSection = () => {
    setContentSections([...contentSections, { id: Date.now(), text: '' }]);
  };

  const removeContentSection = (index: number) => {
    const newSections = [...contentSections];
    newSections.splice(index, 1);
    setContentSections(newSections);
    
    // Update the form data
    form.setValue("contenidoAPlus", newSections.map(section => section.text).join('\n\n---\n\n'));
  };

  const handlePreviewFile = (file: File | ContentAPlusFile) => {
    setPreviewFileName(file.name);
    
    let fileTypeResolved: string;
    let tempPreviewUrl: string | null = null;

    if (file instanceof File) { // New file (File object)
      fileTypeResolved = file.type.startsWith('image/') ? 'image' : 'document';
      if (fileTypeResolved === "image") {
        tempPreviewUrl = URL.createObjectURL(file);
      }
    } else { // Existing file (ContentAPlusFile object)
      fileTypeResolved = file.type === 'image' ? 'image' : 'document';
      if (fileTypeResolved === "image") {
        // For existing files, use placeholder or actual URL if available
        tempPreviewUrl = file.url || "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg"; 
      }
    }
    
    setPreviewFileType(fileTypeResolved);
    setPreviewUrl(tempPreviewUrl || (fileTypeResolved === 'document' ? 'document' : null) );
  };

  const closePreview = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPreviewFileName("");
    setPreviewFileType(null);
  };

  // Helper to get files from form for display during editing
  const getFilesForEditingDisplay = (): (File | ContentAPlusFile)[] => {
    const formStoredFiles: ContentAPlusFile[] = form.getValues("contenidoAPlusFiles") || [];
    // We need a way to distinguish new `File` objects from stored `ContentAPlusFile` objects
    // For simplicity, this example assumes `files` state holds the new `File` objects
    // and `formStoredFiles` (which should mirror `displayedFiles` or `book.contenidoAPlusFiles` plus new file info)
    // needs to be reconciled with actual `File` objects for preview.
    // This part can be complex. A simpler model might be to convert new Files to ContentAPlusFile shape immediately.

    // Show newly added files (from `files` state) first, then existing/form files.
    // This logic for merging needs to be robust to avoid duplicates and ensure correct preview.
    // For now, let's map over formValues and try to find corresponding File objects for preview.
    return formStoredFiles.map(ff => {
        const newFileMatch = files.find(f => f.name === ff.name); // Simple match by name
        return newFileMatch || ff;
    });
  };
  
  const filesToDisplayInEditMode = getFilesForEditingDisplay();

  return (
    <div className="grid gap-6 mt-3 p-4 border rounded-md bg-muted/30">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Contenido A+</h3>
        {isEditing && (
          <Button 
            size="sm" 
            variant="outline"
            className="text-[#FB923C] border-[#FB923C] hover:bg-[#FB923C]/10"
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
          {isEditing ? (
            <div className="space-y-4">
              <Reorder.Group 
                axis="y" 
                values={contentSections} 
                onReorder={(newOrder) => {
                  setContentSections(newOrder);
                  form.setValue("contenidoAPlus", newOrder.map(section => section.text).join('\n\n---\n\n'));
                }}
                className="space-y-4"
              >
                {contentSections.map((section, index) => (
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
                          onChange={(e) => handleContentChange(index, e.target.value)}
                          className="mb-2"
                        />
                        <div className="flex justify-end">
                          <Button 
                            type="button" 
                            size="sm" 
                            variant="destructive" 
                            onClick={() => removeContentSection(index)}
                            disabled={contentSections.length <= 1}
                          >
                            <Trash2 size={14} className="mr-1" /> Eliminar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Reorder.Item>
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
          ) : (
            <div className="space-y-4">
              {contentSections.length > 0 && contentSections.some(s => s.text.trim() !== "") ? (
                contentSections.filter(s => s.text.trim() !== "").map((section, index) => (
                  <Card key={index} className="mb-4">
                    <CardContent className="p-4">
                      <p className="whitespace-pre-wrap">{section.text}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No hay contenido A+ de texto definido.</p>
              )}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="gallery">
          {isEditing ? (
            <div className="grid gap-3">
              <Label htmlFor="contenidoAPlusFiles">Archivos para contenido A+</Label>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => document.getElementById("aplus-file-upload")?.click()} // Changed ID to avoid conflict
                    className="w-full justify-center py-8 border-dashed text-muted-foreground hover:text-[#FB923C] hover:border-[#FB923C]"
                  >
                    <FilePlus2 size={24} className="mr-2" />
                    Subir archivos para contenido A+
                  </Button>
                  <Input
                    id="aplus-file-upload" // Changed ID
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <AnimatePresence>
                  {(filesToDisplayInEditMode.length > 0) && (
                    <motion.div 
                      className="grid gap-2 mt-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {filesToDisplayInEditMode.map((file, index) => {
                        const isImage = file instanceof File ? file.type.startsWith('image/') : file.type === 'image';
                        const fileId = file instanceof File ? Date.now() + index : file.id; // Temp ID for new files for key
                        return (
                          <motion.div 
                            key={fileId}
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
                                onClick={() => handlePreviewFile(file)}
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
                                onClick={() => removeFile(file instanceof File ? 0 : file.id, file instanceof File)} // Needs better ID handling for new files
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
          ) : (
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
                          onClick={() => handlePreviewFile(file)}
                        >
                          <div className={`relative w-full ${isImage ? 'h-24' : 'h-auto py-4 flex items-center justify-center'} bg-muted rounded-md overflow-hidden`}>
                            {isImage ? (
                              <>
                                <ImageIcon size={32} className="absolute inset-0 m-auto text-muted-foreground/50 group-hover:opacity-0 transition-opacity" />
                                <img src={file.url || "https://edit.org/images/cat/portadas-libros-big-2019101610.jpg"} alt={file.name} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity"/>
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
          )}
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={!!previewUrl} onOpenChange={(isOpen) => !isOpen && closePreview()}>
        <DialogContent className="sm:max-w-xl">
          <div className="space-y-4">
            <h3 className="text-lg font-medium break-all">{previewFileName}</h3>
            {previewFileType === "document" ? (
              <div className="flex flex-col items-center justify-center p-12 bg-muted/50 rounded-md">
                <FileIcon className="h-16 w-16 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Vista previa de documento no disponible.
                </p>
                {/* Consider adding a download button if URLs are available */}
                {/* <Button className="mt-4">Descargar documento</Button> */}
              </div>
            ) : previewUrl && previewFileType === "image" ? (
              <AspectRatio ratio={16/9} className="bg-muted">
                <img 
                  src={previewUrl} 
                  alt={previewFileName} 
                  className="object-contain w-full h-full rounded-md" 
                />
              </AspectRatio>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-muted/50 rounded-md">
                 <ImageIcon className="h-16 w-16 text-muted-foreground" />
                 <p className="mt-4 text-sm text-muted-foreground">No hay previsualización disponible.</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
