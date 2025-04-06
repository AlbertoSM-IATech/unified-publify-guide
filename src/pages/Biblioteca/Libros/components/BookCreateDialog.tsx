
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "../types/bookTypes";
import { toast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BookCreateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBook: (newBook: Book) => void;
  libros: Book[];
}

export const BookCreateDialog = ({ isOpen, onClose, onCreateBook, libros }: BookCreateDialogProps) => {
  const navigate = useNavigate();
  const [newBook, setNewBook] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    asin: "",
    estado: "Borrador",
    contenido: "Medio Contenido"
  });

  const handleCloseDialog = () => {
    setNewBook({
      titulo: "",
      autor: "",
      isbn: "",
      asin: "",
      estado: "Borrador",
      contenido: "Medio Contenido"
    });
    onClose();
  };

  const handleCreateBook = () => {
    if (!newBook.titulo || !newBook.autor) {
      toast({
        title: "Campos requeridos",
        description: "Por favor completa al menos el título y autor del libro.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...libros.map(libro => libro.id), 0) + 1;
    const libro: Book = {
      id: newId,
      titulo: newBook.titulo,
      subtitulo: "", // Ensure subtitulo is always set
      autor: newBook.autor,
      isbn: newBook.isbn || `ISBN-${newId}`,
      asin: newBook.asin || `ASIN-${newId}`,
      estado: newBook.estado,
      contenido: newBook.contenido,
      fechaPublicacion: null,
      imageUrl: ""
    };

    onCreateBook(libro);
    handleCloseDialog();
    navigate(`/biblioteca/libros/${newId}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Libro</DialogTitle>
          <DialogDescription>
            Introduce la información básica para crear un nuevo libro. Podrás completar el resto de detalles más adelante.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="titulo" className="col-span-4">Título</Label>
            <Input
              id="titulo"
              value={newBook.titulo}
              onChange={(e) => setNewBook({ ...newBook, titulo: e.target.value })}
              className="col-span-4"
              placeholder="Título del libro"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="autor" className="col-span-4">Autor</Label>
            <Input
              id="autor"
              value={newBook.autor}
              onChange={(e) => setNewBook({ ...newBook, autor: e.target.value })}
              className="col-span-4"
              placeholder="Nombre del autor"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="isbn" className="block mb-2">ISBN</Label>
              <Input
                id="isbn"
                value={newBook.isbn}
                onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                placeholder="ISBN (opcional)"
              />
            </div>
            <div>
              <Label htmlFor="asin" className="block mb-2">ASIN</Label>
              <Input
                id="asin"
                value={newBook.asin}
                onChange={(e) => setNewBook({ ...newBook, asin: e.target.value })}
                placeholder="ASIN (opcional)"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="estado" className="block mb-2">Estado</Label>
              <Select
                value={newBook.estado}
                onValueChange={(value) => setNewBook({ ...newBook, estado: value })}
              >
                <SelectTrigger id="estado">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Borrador">Borrador</SelectItem>
                  <SelectItem value="En revisión">En revisión</SelectItem>
                  <SelectItem value="Publicado">Publicado</SelectItem>
                  <SelectItem value="Archivado">Archivado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="contenido" className="block mb-2">Nivel de Contenido</Label>
              <Select
                value={newBook.contenido}
                onValueChange={(value) => setNewBook({ ...newBook, contenido: value })}
              >
                <SelectTrigger id="contenido">
                  <SelectValue placeholder="Seleccionar nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alto Contenido">Alto Contenido</SelectItem>
                  <SelectItem value="Medio Contenido">Medio Contenido</SelectItem>
                  <SelectItem value="Bajo Contenido">Bajo Contenido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCreateBook}>Crear Libro</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
