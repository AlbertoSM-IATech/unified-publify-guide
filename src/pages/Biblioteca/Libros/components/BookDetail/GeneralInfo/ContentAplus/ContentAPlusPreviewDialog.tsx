
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { File as FileIcon, Image as ImageIcon } from "lucide-react";

interface ContentAPlusPreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileUrl: string | null;
  fileType: string | null;
}

export const ContentAPlusPreviewDialog = ({
  isOpen,
  onClose,
  fileName,
  fileUrl,
  fileType,
}: ContentAPlusPreviewDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl">
        <div className="space-y-4">
          <h3 className="text-lg font-medium break-all">{fileName}</h3>
          {fileType === "document" ? (
            <div className="flex flex-col items-center justify-center p-12 bg-muted/50 rounded-md">
              <FileIcon className="h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                Vista previa de documento no disponible.
              </p>
              {/* Consider adding a download button if URLs are available */}
              {/* <Button className="mt-4">Descargar documento</Button> */}
            </div>
          ) : fileUrl && fileType === "image" ? (
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img
                src={fileUrl}
                alt={fileName}
                className="object-contain w-full h-full rounded-md"
              />
            </AspectRatio>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-muted/50 rounded-md">
              <ImageIcon className="h-16 w-16 text-muted-foreground" />
              <p className="mt-4 text-sm text-muted-foreground">
                No hay previsualización disponible.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
