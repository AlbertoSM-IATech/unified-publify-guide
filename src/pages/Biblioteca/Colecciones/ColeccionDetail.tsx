
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, BookOpen, Calendar, Edit, Save, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { librosSimulados } from "../Libros/utils/librosUtils";

// Datos simulados para colecciones
const coleccionesSimuladas = [
  {
    id: 1,
    nombre: "Serie Emprendimiento",
    descripcion: "Libros sobre emprendimiento y negocios",
    cantidadLibros: 3,
    fechaCreacion: "2023-01-15",
    libros: [1, 2, 3]
  },
  {
    id: 2,
    nombre: "Desarrollo Personal",
    descripcion: "Libros de crecimiento y superación",
    cantidadLibros: 2,
    fechaCreacion: "2023-02-20",
    libros: [4, 5]
  },
  {
    id: 3,
    nombre: "Marketing y Ventas",
    descripcion: "Todo sobre marketing digital y técnicas de venta",
    cantidadLibros: 1,
    fechaCreacion: "2023-03-10",
    libros: [3]
  },
  {
    id: 4,
    nombre: "Liderazgo",
    descripcion: "Estrategias y consejos de liderazgo",
    cantidadLibros: 1,
    fechaCreacion: "2023-04-05",
    libros: [6]
  }
];

const ColeccionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Estado para la colección actual
  const [coleccion, setColeccion] = useState<any>(null);
  const [editedColeccion, setEditedColeccion] = useState<any>(null);
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
  
  // Manejar guardar cambios
  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
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
      
      // Eliminamos la colección del array simulado
      const coleccionIndex = coleccionesSimuladas.findIndex(col => col.id === coleccion.id);
      if (coleccionIndex !== -1) {
        coleccionesSimuladas.splice(coleccionIndex, 1);
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
    setEditedColeccion({...coleccion});
    
    toast({
      description: "Edición cancelada. Los cambios no han sido guardados."
    });
  };
  
  // Si la colección no existe
  if (!coleccion) {
    return <div className="p-6">Colección no encontrada</div>;
  }
  
  return (
    <div className="animate-fade-in">
      {/* Header con botones de acción */}
      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2"
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className="font-heading text-xl font-bold md:text-2xl">
            {isEditing ? 'Editar Colección' : coleccion.nombre}
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
                disabled={saving}
              >
                <X className="mr-2 h-4 w-4" />
                Cancelar
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
                disabled={saving}
              >
                <Save className="mr-2 h-4 w-4" />
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleEdit}
              >
                <Edit className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleDelete}
              >
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Información de la colección */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-medium">Nombre de la colección</h3>
                  {isEditing ? (
                    <Input
                      value={editedColeccion.nombre}
                      onChange={(e) => setEditedColeccion({...editedColeccion, nombre: e.target.value})}
                      placeholder="Nombre de la colección"
                    />
                  ) : (
                    <p className="text-lg font-semibold">{coleccion.nombre}</p>
                  )}
                </div>
                
                <div>
                  <h3 className="mb-2 font-medium">Descripción</h3>
                  {isEditing ? (
                    <Textarea
                      value={editedColeccion.descripcion}
                      onChange={(e) => setEditedColeccion({...editedColeccion, descripcion: e.target.value})}
                      placeholder="Descripción de la colección"
                      rows={4}
                    />
                  ) : (
                    <p className="text-muted-foreground">{coleccion.descripcion}</p>
                  )}
                </div>
                
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Creada el {new Date(coleccion.fechaCreacion).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Libros en la colección */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Libros en esta colección ({librosEnColeccion.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {librosEnColeccion.length === 0 ? (
                <div className="flex h-32 items-center justify-center text-muted-foreground">
                  No hay libros en esta colección
                </div>
              ) : (
                <div className="space-y-4">
                  {librosEnColeccion.map(libro => (
                    <div key={libro.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center mr-4">
                          {libro.imageUrl ? (
                            <img 
                              src={libro.imageUrl} 
                              alt={libro.titulo} 
                              className="h-full w-full rounded-md object-cover" 
                            />
                          ) : (
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{libro.titulo}</h4>
                          <p className="text-sm text-muted-foreground">{libro.autor}</p>
                        </div>
                      </div>
                      <div>
                        <Link 
                          to={`/biblioteca/libros/${libro.id}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ColeccionDetail;
