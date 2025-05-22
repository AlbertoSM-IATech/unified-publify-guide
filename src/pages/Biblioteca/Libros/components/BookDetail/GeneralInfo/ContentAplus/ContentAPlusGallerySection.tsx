
import React, { useState, useEffect } from "react";
import { ContentAPlusFileDisplayList } from "./ContentAPlusFileDisplayList";
import { ContentAPlusFileEditList } from "./ContentAPlusFileEditList";
// Book import no es necesario aquí si initialFiles ya tiene el tipo correcto
// import { Book } from "../../../../types/bookTypes"; // Assuming bookTypes is correctly pathed

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
  }, [initialFiles, form]); // Added form to dependency array as per ESLint best practices


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
    // Casting onOpenPreview because ContentAPlusFileDisplayList expects (file: ContentAPlusFile) => void
    // and here it is (file: File | ContentAPlusFile) => void.
    // In display mode, we only pass ContentAPlusFile objects.
    return <ContentAPlusFileDisplayList files={displayedFiles} onOpenPreview={onOpenPreview as (file: ContentAPlusFile) => void} />;
  }

  return (
    <ContentAPlusFileEditList
      displayedFiles={displayedFiles}
      handleFileChange={handleFileChange}
      removeFile={removeFile}
      onOpenPreview={onOpenPreview}
      findOriginalFileObject={findOriginalFileObject}
    />
  );
};
