
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookFormat } from "../../../types/bookTypes";
import { File, Upload, X, Image as ImageIcon } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FileSectionProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const FileSection = ({ formatType, format, isEditing, onUpdateFormat }: FileSectionProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFileName, setPreviewFileName] = useState<string>("");

  // Mock function to handle file upload simulation
  const handleFileUpload = () => {
    if (onUpdateFormat && isEditing) {
      // Create a mock file
      const mockFile = {
        id: Date.now(),
        name: "archivo-ejemplo.pdf",
        type: "document"
      };
      
      // Add the file to the format's files array
      const updatedFiles = [...(format.files || []), mockFile];
      
      // Update the format with the new file
      onUpdateFormat(formatType, { files: updatedFiles });
    }
  };
  
  // Mock function for image upload
  const handleImageUpload = () => {
    if (onUpdateFormat && isEditing) {
      // Create a mock image file
      const mockFile = {
        id: Date.now(),
        name: "imagen-ejemplo.jpg",
        type: "image"
      };
      
      // Add the file to the format's files array
      const updatedFiles = [...(format.files || []), mockFile];
      
      // Update the format with the new file
      onUpdateFormat(formatType, { files: updatedFiles });
    }
  };
  
  // Mock function to remove a file
  const handleRemoveFile = (fileId: number) => {
    if (onUpdateFormat && isEditing && format.files) {
      // Remove the file from the format's files array
      const updatedFiles = format.files.filter(f => f.id !== fileId);
      
      // Update the format with the updated files array
      onUpdateFormat(formatType, { files: updatedFiles });
    }
  };

  // Función para previsualizar los archivos
  const handlePreviewFile = (file: { id: number; name: string; type: string }) => {
    // Aquí simularemos la previsualización con URLs de muestra
    // En un caso real, usarías las URLs reales de los archivos
    if (file.type === "image") {
      // Para imágenes, usaremos una imagen de ejemplo
      setPreviewUrl("https://edit.org/images/cat/portadas-libros-big-2019101610.jpg");
    } else {
      // Para documentos PDF, mostraríamos un iframe o enlace de descarga
      // Pero aquí simularemos con un mensaje
      setPreviewUrl("document");
    }
    setPreviewFileName(file.name);
  };

  // Cerrar la previsualización
  const closePreview = () => {
    setPreviewUrl(null);
  };

  return (
    <div className="grid gap-3">
      <Label>Archivos adjuntos</Label>
      {isEditing ? (
        <div className="grid gap-4">
          <div className="rounded-md border border-dashed border-border p-6">
            <div className="flex flex-col items-center justify-center gap-2 text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Arrastra archivos aquí o haz clic para cargar</p>
                <p className="text-xs text-muted-foreground">Manuscrito, portada, contraportada, ilustraciones, códigos QR</p>
              </div>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="outline" onClick={handleFileUpload}>
                  <File className="mr-2 h-4 w-4" />
                  Manuscrito
                </Button>
                <Button size="sm" variant="outline" onClick={handleImageUpload}>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Imágenes
                </Button>
              </div>
            </div>
          </div>
          {format.files && format.files.length > 0 && (
            <div className="space-y-2">
              {format.files.map((file) => (
                <div key={file.id} className="flex items-center justify-between rounded-md border border-border bg-background p-2">
                  <div className="flex items-center">
                    {file.type === "image" ? (
                      <ImageIcon className="mr-2 h-4 w-4 text-blue-500" />
                    ) : (
                      <File className="mr-2 h-4 w-4 text-orange-500" />
                    )}
                    <span>{file.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0" 
                      onClick={() => handlePreviewFile(file)}
                    >
                      <span className="sr-only">Previsualizar</span>
                      {file.type === "image" ? (
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                      ) : (
                        <File className="h-4 w-4 text-orange-500" />
                      )}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0" 
                      onClick={() => handleRemoveFile(file.id)}
                    >
                      <span className="sr-only">Eliminar</span>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {format.files && format.files.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {format.files.map((file) => (
                <div 
                  key={file.id} 
                  className="flex flex-col rounded-md border border-border bg-background overflow-hidden cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handlePreviewFile(file)}
                >
                  {file.type === "image" ? (
                    <div className="relative">
                      <AspectRatio ratio={4/3} className="bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                          <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                      </AspectRatio>
                      <div className="p-2 text-sm font-medium truncate">{file.name}</div>
                    </div>
                  ) : (
                    <div className="flex items-center p-3">
                      <File className="mr-2 h-5 w-5 text-orange-500 flex-shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No hay archivos adjuntos</div>
          )}
        </div>
      )}

      {/* Modal de previsualización */}
      <Dialog open={!!previewUrl} onOpenChange={() => closePreview()}>
        <DialogContent className="sm:max-w-xl">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{previewFileName}</h3>
            {previewUrl === "document" ? (
              <div className="flex flex-col items-center justify-center p-12 bg-muted/50 rounded-md">
                <File className="h-16 w-16 text-muted-foreground" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Vista previa de documento no disponible. Haz clic para descargar.
                </p>
                <Button className="mt-4">Descargar documento</Button>
              </div>
            ) : previewUrl && (
              <AspectRatio ratio={16/9}>
                <img 
                  src={previewUrl} 
                  alt={previewFileName} 
                  className="object-contain w-full h-full rounded-md" 
                />
              </AspectRatio>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
