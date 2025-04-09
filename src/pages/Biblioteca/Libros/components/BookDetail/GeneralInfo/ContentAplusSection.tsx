
import React, { useState } from "react";
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { FilePlus2, File, Image, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface ContentAplusSectionProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
}

export const ContentAplusSection = ({ book, isEditing, form }: ContentAplusSectionProps) => {
  const [files, setFiles] = useState<File[]>([]);

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

      {isEditing ? (
        <>
          <div className="grid gap-3">
            <Label htmlFor="contenidoAPlus">Texto para contenido A+</Label>
            <FormField
              control={form.control}
              name="contenidoAPlus"
              render={({ field }) => (
                <Textarea
                  id="contenidoAPlus"
                  placeholder="Introduce el texto para el contenido A+ (se mostrará en Amazon)"
                  rows={4}
                  {...field}
                />
              )}
            />
          </div>

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
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <AnimatePresence>
                {files.length > 0 && (
                  <motion.div 
                    className="grid gap-2 mt-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {files.map((file, index) => (
                      <motion.div 
                        key={index}
                        className="flex items-center justify-between p-2 border rounded-md bg-background"
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </>
      ) : (
        <div>
          {book.contenidoAPlus ? (
            <>
              <p className="text-sm text-foreground">{book.contenidoAPlus}</p>
              
              {book.contenidoAPlusFiles && book.contenidoAPlusFiles.length > 0 && (
                <div className="mt-2">
                  <Label className="mb-2 block">Archivos adjuntos:</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {book.contenidoAPlusFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 border rounded-md"
                      >
                        {file.type === 'image' ? (
                          <Image size={16} className="text-[#3B82F6]" />
                        ) : (
                          <File size={16} className="text-[#FB923C]" />
                        )}
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No hay contenido A+ definido</p>
          )}
        </div>
      )}
    </div>
  );
};
