
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Book } from '@/pages/Biblioteca/Libros/types/bookTypes';
import { Loader2 } from 'lucide-react';
import { NewInvestigationData } from '../types/investigacionTypes'; // Ruta corregida

// La interfaz local NewInvestigationData ha sido eliminada

interface CreateInvestigationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewInvestigationData) => void; // Usar el tipo importado
  books: Book[];
  isLoadingBooks: boolean;
}

export const CreateInvestigationDialog: React.FC<CreateInvestigationDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  books,
  isLoadingBooks,
}) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedBookId, setSelectedBookId] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Reset form when dialog is opened/closed
    if (!isOpen) {
      setTitulo('');
      setDescripcion('');
      setSelectedBookId(undefined);
      setError(null);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!titulo.trim()) {
      setError('El título es obligatorio.');
      return;
    }
    if (!selectedBookId) {
      setError('Debe seleccionar un libro asociado.');
      return;
    }
    setError(null);
    onSubmit({
      titulo,
      descripcion,
      libroId: selectedBookId, // selectedBookId ya es un string, no se necesita parseInt
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nueva Investigación</DialogTitle>
          <DialogDescription>
            Completa los detalles para crear una nueva investigación y asóciala a un libro.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="titulo" className="text-right">
              Título
            </Label>
            <Input
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="col-span-3"
              placeholder="Título de la investigación"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descripcion" className="text-right">
              Descripción
            </Label>
            <Textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="col-span-3"
              placeholder="Descripción (opcional)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="libro" className="text-right">
              Libro Asociado
            </Label>
            {isLoadingBooks ? (
              <div className="col-span-3 flex items-center text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando libros...
              </div>
            ) : (
              <Select value={selectedBookId} onValueChange={setSelectedBookId}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecciona un libro" />
                </SelectTrigger>
                <SelectContent>
                  {books.length > 0 ? (
                    books.map((book) => (
                      <SelectItem key={book.id} value={book.id.toString()}> {/* Aseguramos que book.id es string */}
                        {book.titulo}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">No hay libros disponibles.</div>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>
          {error && (
            <div className="col-span-4 text-sm text-red-500 text-center">{error}</div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>
            Guardar Investigación
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
