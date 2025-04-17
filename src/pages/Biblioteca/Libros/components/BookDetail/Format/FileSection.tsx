
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookFormat } from "../../../types/bookTypes";
import { File, Upload, X } from "lucide-react";

interface FileSectionProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const FileSection = ({ formatType, format, isEditing, onUpdateFormat }: FileSectionProps) => {
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
  
  // Mock function to remove a file
  const handleRemoveFile = (fileId: number) => {
    if (onUpdateFormat && isEditing && format.files) {
      // Remove the file from the format's files array
      const updatedFiles = format.files.filter(f => f.id !== fileId);
      
      // Update the format with the updated files array
      onUpdateFormat(formatType, { files: updatedFiles });
    }
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
                <Button size="sm" variant="outline" onClick={handleFileUpload}>
                  <Upload className="mr-2 h-4 w-4" />
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
                    <File className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{file.name}</span>
                  </div>
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
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          {format.files && format.files.length > 0 ? (
            <div className="space-y-2">
              {format.files.map((file) => (
                <div key={file.id} className="flex items-center rounded-md border border-border bg-background p-2">
                  <File className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No hay archivos adjuntos</div>
          )}
        </div>
      )}
    </div>
  );
};
