
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { coleccionesSimuladas } from "../Libros/utils/mockData/coleccionesData";
import { Collection } from "./types/collectionTypes";
import { Book } from "../Libros/types/bookTypes";
import { CollectionDetailHeader } from "./components/detail/CollectionDetailHeader";
import { CollectionInfo } from "./components/detail/CollectionInfo";
import { BooksInCollection } from "./components/detail/BooksInCollection";
import { useBookData } from "@/hooks/useBookData";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";

const ColeccionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use local storage for collections
  const [storedCollections, setStoredCollections] = useLocalStorage<Collection[]>('coleccionesData', coleccionesSimuladas);
  const { books } = useBookData();
  
  // Estado para la colección actual
  const [coleccion, setColeccion] = useState<Collection | null>(null);
  const [editedColeccion, setEditedColeccion] = useState<Collection | null>(null);
  const [librosEnColeccion, setLibrosEnColeccion] = useState<Book[]>([]);
  
  // Buscar la colección cuando se carga el componente
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      const coleccionId = parseInt(id || "0");
      const coleccionEncontrada = storedCollections.find(col => col.id === coleccionId);
      
      if (coleccionEncontrada) {
        setColeccion(coleccionEncontrada);
        setEditedColeccion({...coleccionEncontrada});
        
        // Encontrar los libros que pertenecen a esta colección
        const librosDeColeccion = books.filter(libro => 
          coleccionEncontrada.libros.includes(libro.id)
        );
        setLibrosEnColeccion(librosDeColeccion);
      } else {
        setError("Colección no encontrada");
      }
    } catch (err) {
      setError("Error al cargar la colección");
      console.error("Error loading collection:", err);
    } finally {
      setIsLoading(false);
    }
  }, [id, books, storedCollections]);
  
  // Manejar la navegación hacia atrás
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Manejar el modo de edición
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Manejar la actualización de campos en el formulario
  const handleUpdateField = (field: keyof Collection, value: any) => {
    if (editedColeccion) {
      setEditedColeccion({
        ...editedColeccion,
        [field]: value
      });
    }
  };
  
  // Update books in collection
  const handleUpdateBooks = (bookIds: number[]) => {
    if (editedColeccion) {
      setEditedColeccion({
        ...editedColeccion,
        libros: bookIds,
        cantidadLibros: bookIds.length
      });
      
      // Update the books shown in the collection
      const updatedBooks = books.filter(libro => bookIds.includes(libro.id));
      setLibrosEnColeccion(updatedBooks);
    }
  };
  
  // Manejar guardar cambios
  const handleSave = async () => {
    try {
      setSaving(true);
      
      if (!editedColeccion) {
        throw new Error("No hay datos para guardar");
      }
      
      // Update collections in localStorage
      const updatedCollections = storedCollections.map(col => 
        col.id === editedColeccion.id ? editedColeccion : col
      );
      
      setStoredCollections(updatedCollections);
      setColeccion(editedColeccion);
      
      // Update books that reference this collection
      // For each book in the collection, make sure it has this collection in its coleccionesIds
      for (const bookId of editedColeccion.libros) {
        const book = books.find(b => b.id === bookId);
        if (book) {
          let bookUpdated = false;
          let coleccionesIds = book.coleccionesIds || [];
          
          if (!coleccionesIds.includes(editedColeccion.id)) {
            coleccionesIds = [...coleccionesIds, editedColeccion.id];
            bookUpdated = true;
          }
          
          if (bookUpdated) {
            // Update book's collections in local storage
            const bookData = localStorage.getItem('librosData');
            if (bookData) {
              const librosData = JSON.parse(bookData);
              const updatedBooks = librosData.map((b: Book) => 
                b.id === bookId ? { ...b, coleccionesIds } : b
              );
              localStorage.setItem('librosData', JSON.stringify(updatedBooks));
            }
          }
        }
      }
      
      // For books that were removed from the collection, remove this collection from their coleccionesIds
      const removedBooks = books.filter(b => 
        !editedColeccion.libros.includes(b.id) && 
        (b.coleccionesIds || []).includes(editedColeccion.id)
      );
      
      for (const book of removedBooks) {
        // Update book's collections in local storage
        const bookData = localStorage.getItem('librosData');
        if (bookData) {
          const librosData = JSON.parse(bookData);
          const updatedBooks = librosData.map((b: Book) => {
            if (b.id === book.id) {
              const coleccionesIds = (b.coleccionesIds || []).filter(
                cId => cId !== editedColeccion.id
              );
              return { ...b, coleccionesIds };
            }
            return b;
          });
          localStorage.setItem('librosData', JSON.stringify(updatedBooks));
        }
      }
      
      // Dispatch event to notify book data has changed
      const updateEvent = new CustomEvent('publify_books_updated');
      window.dispatchEvent(updateEvent);
      
      toast({
        title: "Cambios guardados",
        description: "La colección ha sido actualizada con éxito."
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving collection:", error);
      toast({
        title: "Error al guardar",
        description: "Ha ocurrido un error al guardar los cambios.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  // Manejar la eliminación de la colección
  const handleDelete = async () => {
    try {
      setSaving(true);
      
      if (!coleccion) {
        throw new Error("No hay colección para eliminar");
      }
      
      // Remove this collection from all books that reference it
      const booksToUpdate = books.filter(b => 
        (b.coleccionesIds || []).includes(coleccion.id)
      );
      
      for (const book of booksToUpdate) {
        // Update book's collections in local storage
        const bookData = localStorage.getItem('librosData');
        if (bookData) {
          const librosData = JSON.parse(bookData);
          const updatedBooks = librosData.map((b: Book) => {
            if (b.id === book.id) {
              const coleccionesIds = (b.coleccionesIds || []).filter(
                cId => cId !== coleccion.id
              );
              return { ...b, coleccionesIds };
            }
            return b;
          });
          localStorage.setItem('librosData', JSON.stringify(updatedBooks));
        }
      }
      
      // Update collections in localStorage
      const filteredCollections = storedCollections.filter(col => col.id !== coleccion.id);
      setStoredCollections(filteredCollections);
      
      // Dispatch event to notify book data has changed
      const updateEvent = new CustomEvent('publify_books_updated');
      window.dispatchEvent(updateEvent);
      
      toast({
        title: "Colección eliminada",
        description: "La colección ha sido eliminada con éxito.",
        variant: "destructive"
      });
      
      // Volvemos a la lista de colecciones
      navigate('/biblioteca/colecciones');
    } catch (error) {
      console.error("Error deleting collection:", error);
      toast({
        title: "Error al eliminar",
        description: "Ha ocurrido un error al eliminar la colección.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };
  
  // Manejar la cancelación de la edición
  const handleCancel = () => {
    setIsEditing(false);
    if (coleccion) {
      setEditedColeccion({...coleccion});
      
      // Reset the books shown in the collection
      const librosDeColeccion = books.filter(libro => 
        coleccion.libros.includes(libro.id)
      );
      setLibrosEnColeccion(librosDeColeccion);
    }
    
    toast({
      description: "Edición cancelada. Los cambios no han sido guardados."
    });
  };
  
  // Display loading state
  if (isLoading) {
    return <LoadingState text="Cargando colección..." fullPage={true} />;
  }
  
  // Display error state
  if (error || !coleccion || !editedColeccion) {
    return (
      <ErrorState
        title="Error al cargar la colección"
        message={error || "No se pudo cargar la colección"}
        onRetry={() => navigate('/biblioteca/colecciones')}
        fullPage={true}
      />
    );
  }
  
  return (
    <div className="animate-fade-in p-6">
      {/* Header con botones de acción */}
      <CollectionDetailHeader
        collectionName={coleccion.nombre}
        isEditing={isEditing}
        saving={saving}
        onGoBack={handleGoBack}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onDelete={handleDelete}
      />
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mt-6">
        {/* Información de la colección */}
        <div className="lg:col-span-1">
          <CollectionInfo
            collection={coleccion}
            editedCollection={editedColeccion}
            isEditing={isEditing}
            onUpdateField={handleUpdateField}
          />
        </div>
        
        {/* Libros en la colección */}
        <div className="lg:col-span-2">
          <BooksInCollection 
            books={librosEnColeccion}
            allBooks={books}
            isEditing={isEditing}
            onUpdateBooks={handleUpdateBooks}
            selectedBookIds={editedColeccion.libros}
          />
        </div>
      </div>
    </div>
  );
};

export default ColeccionDetail;
