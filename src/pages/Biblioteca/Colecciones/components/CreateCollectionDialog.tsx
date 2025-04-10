
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface CreateCollectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (collection: { nombre: string; descripcion: string }) => void;
}

export const CreateCollectionDialog = ({ isOpen, onClose, onCreate }: CreateCollectionDialogProps) => {
  const [newCollection, setNewCollection] = useState({
    nombre: "",
    descripcion: ""
  });

  const handleCreate = () => {
    onCreate(newCollection);
    setNewCollection({ nombre: "", descripcion: "" });
  };

  const handleClose = () => {
    setNewCollection({ nombre: "", descripcion: "" });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nueva Colección</DialogTitle>
          <DialogDescription>
            Introduce la información para crear una nueva colección. Podrás añadir libros a la colección más adelante.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="nombre">Nombre</Label>
            <Input
              id="nombre"
              value={newCollection.nombre}
              onChange={(e) => setNewCollection({ ...newCollection, nombre: e.target.value })}
              placeholder="Nombre de la colección"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              value={newCollection.descripcion}
              onChange={(e) => setNewCollection({ ...newCollection, descripcion: e.target.value })}
              placeholder="Descripción de la colección"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleCreate}>Crear Colección</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
