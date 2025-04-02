
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BookFormat } from "../../../types/bookTypes";
import { File, Upload, X } from "lucide-react";

interface FileSectionProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
}

export const FileSection = ({ formatType, format, isEditing }: FileSectionProps) => {
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
                <Button size="sm" variant="outline">
                  <File className="mr-2 h-4 w-4" />
                  Manuscrito
                </Button>
                <Button size="sm" variant="outline">
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
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
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
