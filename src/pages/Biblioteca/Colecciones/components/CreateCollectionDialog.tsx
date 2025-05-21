
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
import { Checkbox } from "@/components/ui/checkbox";
import { X, Search, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useBookData } from "@/hooks/useBookData";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CreateCollectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (collection: { 
    nombre: string; 
    descripcion: string;
    libros: number[];
  }) => void;
}

export const CreateCollectionDialog = ({ isOpen, onClose, onCreate }: CreateCollectionDialogProps) => {
  const [newCollection, setNewCollection] = useState({
    nombre: "",
    descripcion: "",
    libros: [] as number[]
  });
  const [searchTerm, setSearchTerm] = useState("");
  const { books, isLoading } = useBookData();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [selectedBooks, setSelectedBooks] = useState<any[]>([]);

  // Reset form when dialog is opened/closed
  useEffect(() => {
    if (!isOpen) {
      setNewCollection({
        nombre: "",
        descripcion: "",
        libros: []
      });
      setSearchTerm("");
      setSelectedBooks([]);
    }
  }, [isOpen]);

  // Filter books based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredBooks(
        books.filter(book => 
          book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.autor.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books]);

  // Update selectedBooks whenever newCollection.libros changes
  useEffect(() => {
    const selected = books.filter(book => newCollection.libros.includes(book.id));
    setSelectedBooks(selected);
  }, [newCollection.libros, books]);

  const handleCreate = () => {
    onCreate(newCollection);
  };

  const handleClose = () => {
    onClose();
  };

  const toggleBookSelection = (bookId: number, isChecked: boolean) => {
    if (isChecked) {
      setNewCollection({
        ...newCollection,
        libros: [...newCollection.libros, bookId]
      });
    } else {
      setNewCollection({
        ...newCollection,
        libros: newCollection.libros.filter(id => id !== bookId)
      });
    }
  };

  const removeBook = (bookId: number) => {
    setNewCollection({
      ...newCollection,
      libros: newCollection.libros.filter(id => id !== bookId)
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Nueva Colección</DialogTitle>
          <DialogDescription>
            Introduce la información para crear una nueva colección y selecciona los libros que deseas añadir.
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
              rows={3}
            />
          </div>
          
          <div className="mt-4">
            <Label>Seleccionar Libros</Label>
            <div className="relative mt-2">
              <Input
                placeholder="Buscar libros..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            
            <ScrollArea className="h-[200px] mt-2 border rounded-md p-4">
              {isLoading ? (
                <div className="text-center py-4 text-muted-foreground">Cargando libros...</div>
              ) : filteredBooks.length > 0 ? (
                <div className="space-y-2">
                  {filteredBooks.map(book => (
                    <div key={book.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`book-${book.id}`} 
                        checked={newCollection.libros.includes(book.id)}
                        onCheckedChange={(checked) => 
                          toggleBookSelection(book.id, checked === true)
                        }
                      />
                      <Label 
                        htmlFor={`book-${book.id}`}
                        className="text-sm font-normal cursor-pointer text-ellipsis overflow-hidden"
                      >
                        {book.titulo} - <span className="text-xs text-muted-foreground">{book.autor}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  {searchTerm ? "No hay resultados para tu búsqueda" : "No hay libros disponibles"}
                </div>
              )}
            </ScrollArea>
          </div>
          
          {selectedBooks.length > 0 && (
            <div>
              <Label className="mb-2 block">Libros Seleccionados</Label>
              <div className="flex flex-wrap gap-2 mt-1 border rounded-md p-3 bg-muted/20">
                {selectedBooks.map(book => (
                  <Badge 
                    key={book.id} 
                    variant="secondary"
                    className="flex items-center gap-1 px-3 py-1 pr-1"
                  >
                    {book.titulo}
                    <button 
                      type="button"
                      onClick={() => removeBook(book.id)}
                      className="ml-1 hover:bg-destructive/20 p-1 rounded-full transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Cancelar</Button>
          <Button 
            onClick={handleCreate} 
            disabled={!newCollection.nombre.trim()}
          >
            Crear Colección
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
