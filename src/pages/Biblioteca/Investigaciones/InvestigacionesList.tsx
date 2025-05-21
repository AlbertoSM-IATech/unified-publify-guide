import { useState, useEffect } from "react";
import { BookOpen, FileText, Plus, Search, Filter, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { Link, useLocation } from "react-router-dom";
import { investigacionesSimuladas } from "../Libros/utils/librosUtils";
import { Button } from "@/components/common/Button"; // Import common Button
import { CreateInvestigationDialog, NewInvestigationData } from "./components/CreateInvestigationDialog";
import { useBookData } from "@/hooks/useBookData";
import { toast } from "@/hooks/use-toast";

// Definir el tipo para un objeto de investigación basado en la estructura de investigacionesSimuladas
type Investigacion = typeof investigacionesSimuladas[0];

export const InvestigacionesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [investigaciones, setInvestigaciones] = useState<Investigacion[]>(investigacionesSimuladas);
  const [selectedInvestigacion, setSelectedInvestigacion] = useState<Investigacion | null>(null);
  const location = useLocation();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { books: availableBooks, isLoading: isLoadingBooks } = useBookData();

  // Manejar selección de investigación desde otra página
  useEffect(() => {
    if (location.state?.selectInvestigacion) {
      const investigacionId = location.state.selectInvestigacion;
      const investigacion = investigaciones.find(inv => inv.id === investigacionId);
      if (investigacion) {
        setSelectedInvestigacion(investigacion);
      }
      // Limpiar el estado de la ubicación para evitar re-selección en navegación
      window.history.replaceState({}, document.title) 
    }
  }, [location.state, investigaciones]);

  // Filtrar investigaciones por búsqueda
  const filteredInvestigaciones = investigaciones.filter(investigacion => 
    investigacion.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (investigacion.descripcion && investigacion.descripcion.toLowerCase().includes(searchQuery.toLowerCase())) || 
    investigacion.libroTitulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Manejar la selección de una investigación
  const handleSelectInvestigacion = (investigacion: Investigacion) => {
    setSelectedInvestigacion(investigacion);
  };

  // Volver a la lista de investigaciones
  const handleVolver = () => {
    setSelectedInvestigacion(null);
  };

  const handleCreateInvestigacion = (data: NewInvestigationData) => {
    if (!data.libroId) {
      toast({
        title: "Error",
        description: "Debe seleccionar un libro asociado.",
        variant: "destructive",
      });
      return;
    }
    const selectedBook = availableBooks.find(b => b.id === data.libroId);
    if (!selectedBook) {
      toast({
        title: "Error",
        description: "El libro seleccionado no es válido.",
        variant: "destructive",
      });
      return;
    }

    const newId = investigaciones.length > 0 ? Math.max(...investigaciones.map(inv => inv.id)) + 1 : 1;
    const newInvestigation: Investigacion = {
      id: newId,
      titulo: data.titulo,
      descripcion: data.descripcion,
      libroId: selectedBook.id,
      libroTitulo: selectedBook.titulo,
      fechaActualizacion: new Date().toISOString().split('T')[0],
    };
    setInvestigaciones(prev => [...prev, newInvestigation]);
    setIsCreateDialogOpen(false);
    toast({
      title: "Investigación Creada",
      description: `"${data.titulo}" ha sido creada exitosamente.`,
    });
  };

  // Si hay una investigación seleccionada, mostrar el editor
  if (selectedInvestigacion) {
    return (
      <div className="animate-fade-in h-full">
        <div className="mb-4 flex items-center">
          <button onClick={handleVolver} className="mr-4 flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft size={16} className="mr-1" /> Volver
          </button>
          <h2 className="text-xl font-medium">{selectedInvestigacion.titulo}</h2>
        </div>

        <div className="flex rounded-lg border border-border bg-card p-2 text-xs text-muted-foreground">
          <div className="flex items-center">
            <BookOpen size={14} className="mr-1" />
            <span className="mr-2">Libro: {selectedInvestigacion.libroTitulo}</span>
            <span>
              Última actualización: {new Date(selectedInvestigacion.fechaActualizacion).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-4 h-[calc(100vh-200px)] rounded-lg border border-border bg-card p-6">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <FileText size={48} className="mb-4 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">Editor de Investigación</h3>
            <p className="mb-4 max-w-md text-muted-foreground">
              Aquí irá integrado AppFlowy u otro editor de documentos.
              Esta área será un editor de texto enriquecido donde podrás 
              crear y editar tu investigación con formato.
            </p>
            <div className="flex space-x-4">
              <Button variant="default">Guardar cambios</Button>
              <Button variant="outline">Vista previa</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">Investigaciones</h1>
          <p className="mt-1 text-muted-foreground">
            Tus notas de investigación para cada libro
          </p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="mt-4 md:mt-0"
        >
          <Plus size={18} className="mr-2" />
          Nueva Investigación
        </Button>
      </div>

      <div className="mb-6 flex flex-col space-y-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="relative flex-1 md:max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={16} className="text-muted-foreground" />
          </div>
          <input 
            type="text" 
            className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
            placeholder="Buscar por título o libro..." 
            value={searchQuery} 
            onChange={e => setSearchQuery(e.target.value)} 
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="items-center">
            <Filter size={16} className="mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      <ResponsiveGrid 
        columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
        gap="lg"
        className="mt-6"
      >
        {filteredInvestigaciones.map(investigacion => (
          <motion.div
            key={investigacion.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
            onClick={() => handleSelectInvestigacion(investigacion)}
            className="h-full"
          >
            <div className="card-hover group cursor-pointer rounded-lg border bg-card shadow-sm h-full flex overflow-hidden">
              <div className="bg-primary/10 flex items-center justify-center p-6 w-1/4">
                <FileText size={48} className="text-primary" />
              </div>
              
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-lg">{investigacion.titulo}</h3>
                    <div className="rounded-md px-2 py-1 text-xs bg-secondary/10 text-secondary-foreground">
                      <Link to={`/biblioteca/libros/${investigacion.libroId}`} className="hover:underline">
                        {investigacion.libroTitulo}
                      </Link>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {investigacion.descripcion}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>
                    Actualizada: {new Date(investigacion.fechaActualizacion).toLocaleDateString()}
                  </span>
                  <span className="font-medium text-primary group-hover:underline">
                    Abrir investigación
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </ResponsiveGrid>

      <CreateInvestigationDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateInvestigacion}
        books={availableBooks}
        isLoadingBooks={isLoadingBooks}
      />
    </div>
  );
};

export default InvestigacionesList;
