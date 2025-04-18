import React, { useState } from "react";
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { FilePlus2, File, Image, Trash2, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentAplusSectionProps {
  book: Book;
  isEditing: boolean;
  form: any; // Using 'any' here to handle the extended form object from useGeneralInfoForm
}

export const ContentAplusSection = ({ book, isEditing, form }: ContentAplusSectionProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [contentSections, setContentSections] = useState(
    book.contenidoAPlus 
      ? book.contenidoAPlus.split('\n\n---\n\n').map(section => ({ id: Date.now() + Math.random(), text: section }))
      : [{ id: Date.now(), text: '' }]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      
      // In a real application, you would upload these files to a server
      // For now, we'll just add them to the form data
      const fileObjects = newFiles.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type.includes('image') ? 'image' : 'document'
      }));
      
      const existingFiles = form.getValues("contenidoAPlusFiles") || [];
      form.setValue("contenidoAPlusFiles", [...existingFiles, ...fileObjects]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    // Also update form data
    const formFiles = form.getValues("contenidoAPlusFiles") || [];
    formFiles.splice(index, 1);
    form.setValue("contenidoAPlusFiles", formFiles);
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
                onReorder={setContentSections}
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
              {contentSections.length > 0 ? (
                contentSections.map((section, index) => (
                  <Card key={index} className="mb-4">
                    <CardContent className="p-4">
                      <p className="whitespace-pre-wrap">{section.text}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No hay contenido A+ definido</p>
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
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="w-full justify-center py-8 border-dashed text-muted-foreground hover:text-[#FB923C] hover:border-[#FB923C]"
                  >
                    <FilePlus2 size={24} className="mr-2" />
                    Subir archivos para contenido A+
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                <AnimatePresence>
                  {(files.length > 0 || (book.contenidoAPlusFiles && book.contenidoAPlusFiles.length > 0)) && (
                    <motion.div 
                      className="grid gap-2 mt-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {/* New files */}
                      {files.map((file, index) => (
                        <motion.div 
                          key={`new-${index}`}
                          className="flex items-center justify-between p-3 border rounded-md bg-background"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="flex items-center gap-2">
                            {file.type.includes('image') ? (
                              <Image size={16} className="text-[#3B82F6]" />
                            ) : (
                              <File size={16} className="text-[#FB923C]" />
                            )}
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFile(index)}
                            className="h-8 w-8"
                          >
                            <Trash2 size={16} className="text-destructive" />
                          </Button>
                        </motion.div>
                      ))}
                      
                      {/* Existing files */}
                      {book.contenidoAPlusFiles && book.contenidoAPlusFiles.map((file, index) => (
                        <motion.div 
                          key={`existing-${file.id}`}
                          className="flex items-center justify-between p-3 border rounded-md bg-background"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ delay: (files.length + index) * 0.05 }}
                        >
                          <div className="flex items-center gap-2">
                            {file.type.includes('image') ? (
                              <div className="relative w-full h-24 bg-muted rounded-md overflow-hidden">
                                <Image size={16} className="absolute top-2 left-2 text-[#3B82F6]" />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-1">
                                  <span className="text-xs text-white truncate">{file.name}</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <File size={16} className="text-[#FB923C]" />
                                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                              </>
                            )}
                          </div>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              const formFiles = form.getValues("contenidoAPlusFiles") || [];
                              const newFiles = formFiles.filter(f => f.id !== file.id);
                              form.setValue("contenidoAPlusFiles", newFiles);
                            }}
                            className="h-8 w-8"
                          >
                            <Trash2 size={16} className="text-destructive" />
                          </Button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div>
              {book.contenidoAPlusFiles && book.contenidoAPlusFiles.length > 0 ? (
                <div className="mt-2">
                  <Label className="mb-2 block">Archivos adjuntos:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {book.contenidoAPlusFiles.map((file, index) => (
                      <div
                        key={index}
                        className={`flex ${file.type === 'image' ? 'flex-col' : 'items-center'} gap-2 p-3 border rounded-md`}
                      >
                        {file.type === 'image' ? (
                          <div className="h-24 w-full bg-muted rounded-md relative">
                            <Image size={16} className="absolute top-2 left-2 text-[#3B82F6]" />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-1">
                              <span className="text-xs text-white truncate">{file.name}</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <File size={16} className="text-[#FB923C] flex-shrink-0" />
                            <span className="text-sm truncate">{file.name}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No hay archivos adjuntos</p>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
