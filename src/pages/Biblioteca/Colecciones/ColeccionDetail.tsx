
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { coleccionesSimuladas } from "./utils/collectionsUtils";
import { librosSimulados } from "../Libros/utils/librosUtils";
import { Collection } from "./types/collectionTypes";
import { CollectionDetailHeader } from "./components/detail/CollectionDetailHeader";
import { CollectionInfo } from "./components/detail/CollectionInfo";
import { BooksInCollection } from "./components/detail/BooksInCollection";

const ColeccionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Estado para la colección actual
  const [coleccion, setColeccion] = useState<Collection | null>(null);
  const [editedColeccion, setEditedColeccion] = useState<Collection | null>(null);
  const [librosEnColeccion, setLibrosEnColeccion] = useState<any[]>([]);
  
  // Buscar la colección cuando se carga el componente
  useEffect(() => {
    const coleccionId = parseInt(id || "0");
    const coleccionEncontrada = coleccionesSimuladas.find(col => col.id === coleccionId);
    
    if (coleccionEncontrada) {
      setColeccion(coleccionEncontrada);
      setEditedColeccion({...coleccionEncontrada});
      
      // Encontrar los libros que pertenecen a esta colección
      const librosDeColeccion = librosSimulados.filter(libro => 
        coleccionEncontrada.libros.includes(libro.id)
      );
      setLibrosEnColeccion(librosDeColeccion);
    }
  }, [id]);
  
  // Manejar la navegación hacia atrás
  const handleGoBack = () => {
    navigate(-1);
  };
  
  // Manejar el modo de edición
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Manejar la actualización de campos en el formulario
  const handleUpdateField = (field: keyof Collection, value: string) => {
    if (editedColeccion) {
      setEditedColeccion({
        ...editedColeccion,
        [field]: value
      });
    }
  };
  
  // Manejar guardar cambios
  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (coleccion && editedColeccion) {
        // Actualizamos los datos en el array simulado
        const coleccionIndex = coleccionesSimuladas.findIndex(col => col.id === coleccion.id);
        if (coleccionIndex !== -1) {
          coleccionesSimuladas[coleccionIndex] = {
            ...editedColeccion,
            cantidadLibros: editedColeccion.libros.length
          };
        }
        
        // Actualizamos los estados locales
        setColeccion(editedColeccion);
        
        toast({
          title: "Cambios guardados",
          description: "La colección ha sido actualizada con éxito."
        });
      }
      
      setIsEditing(false);
    } catch (error) {
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
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (coleccion) {
        // Eliminamos la colección del array simulado
        const coleccionIndex = coleccionesSimuladas.findIndex(col => col.id === coleccion.id);
        if (coleccionIndex !== -1) {
          coleccionesSimuladas.splice(coleccionIndex, 1);
        }
      }
      
      toast({
        title: "Colección eliminada",
        description: "La colección ha sido eliminada con éxito.",
        variant: "destructive"
      });
      
      // Volvemos a la lista de colecciones
      navigate('/biblioteca/colecciones');
    } catch (error) {
      toast({
        title: "Error al eliminar",
        description: "Ha ocurrido un error al eliminar la colección.",
        variant: "destructive"
      });
    }
  };
  
  // Manejar la cancelación de la edición
  const handleCancel = () => {
    setIsEditing(false);
    if (coleccion) {
      setEditedColeccion({...coleccion});
    }
    
    toast({
      description: "Edición cancelada. Los cambios no han sido guardados."
    });
  };
  
  // Si la colección no existe
  if (!coleccion || !editedColeccion) {
    return <div className="p-6">Colección no encontrada</div>;
  }
  
  return (
    <div className="animate-fade-in">
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
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
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
          <BooksInCollection books={librosEnColeccion} />
        </div>
      </div>
    </div>
  );
};

export default ColeccionDetail;
