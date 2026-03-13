import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WaitlistDialog = ({ open, onOpenChange }: WaitlistDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="font-heading text-xl font-bold text-center">
            Reserva tu acceso prioritario
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            Rellena el formulario para bloquear tu plaza.
          </DialogDescription>
        </DialogHeader>
        <div className="px-2 pb-2">
          <iframe
            src="https://wild-paperback-a33.notion.site/ebd/32283e512fb280f5aa76e0ed984c866f"
            width="100%"
            height="600"
            frameBorder="0"
            allowFullScreen
            className="rounded-b-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

/** Hook helper to manage dialog state */
export const useWaitlistDialog = () => {
  const [open, setOpen] = useState(false);
  return { open, setOpen, openDialog: () => setOpen(true) };
};
