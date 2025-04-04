import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { BooksToolbar } from "./components/BooksToolbar";
import { BooksGrid } from "./components/BooksGrid";
import { BooksList } from "./components/BooksList";
import { librosSimulados, getStatusColor, getContentColor } from "./utils/librosUtils";
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
import { Book } from "./types/bookTypes";

export const LibrosList = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [libros, setLibros] = useState<Book[]>(librosSimulados);
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  const [newBook, setNewBook] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    asin: "",
    estado: "Borrador",
    contenido: "Medio Contenido"
  });

  const filteredLibros = libros.filter(
    (libro) =>
      libro.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.autor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      libro.isbn.includes(searchQuery) ||
      libro.asin.includes(searchQuery)
  );

  const handleOpenCreateDialog = () => {
    setIsCreatingBook(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreatingBook(false);
    setNewBook({
      titulo: "",
      autor: "",
      isbn: "",
      asin: "",
      estado: "Borrador",
      contenido: "Medio Contenido"
    });
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
      subtitulo: "",
      autor: newBook.autor,
      isbn: newBook.isbn || `ISBN-${newId}`,
      asin: newBook.asin || `ASIN-${newId}`,
      estado: newBook.estado,
      contenido: newBook.contenido,
      fechaPublicacion: null,
      imageUrl: ""
    };

    librosSimulados.push(libro);
    setLibros([...librosSimulados]);

    toast({
      title: "Libro creado",
      description: `El libro "${libro.titulo}" ha sido creado con éxito.`
    });

    handleCloseCreateDialog();
    navigate(`/biblioteca/libros/${newId}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Biblioteca</h1>
          <p className="mt-1 text-muted-foreground">Gestiona tus libros y colecciones</p>
        </div>
        <button 
          className="mt-4 flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 md:mt-0"
          onClick={handleOpenCreateDialog}
        >
          <Plus size={18} className="mr-2" />
          Nuevo Libro
        </button>
      </div>

      <BooksToolbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === "grid" ? (
        <BooksGrid 
          libros={filteredLibros} 
          getStatusColor={getStatusColor} 
          getContentColor={getContentColor}
        />
      ) : (
        <BooksList 
          libros={filteredLibros} 
          getStatusColor={getStatusColor} 
          getContentColor={getContentColor}
        />
      )}

      <Dialog open={isCreatingBook} onOpenChange={handleCloseCreateDialog}>
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
            <Button variant="outline" onClick={handleCloseCreateDialog}>Cancelar</Button>
            <Button onClick={handleCreateBook}>Crear Libro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LibrosList;
