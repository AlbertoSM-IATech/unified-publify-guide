import { useState } from "react";
import { BookOpen, FileText, Plus, Search, Filter, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

// Datos simulados para investigaciones
const investigacionesSimuladas = [
  {
    id: 1,
    titulo: "Investigación para El Arte de la Estrategia",
    descripcion: "Notas y fuentes para el libro",
    libroId: 1,
    libroTitulo: "El Arte de la Estrategia",
    fechaActualizacion: "2023-05-10",
    contenido: "Contenido de la investigación..."
  },
  {
    id: 2,
    titulo: "Investigación para Finanzas para Emprendedores",
    descripcion: "Referencias y estudios de caso",
    libroId: 2,
    libroTitulo: "Finanzas para Emprendedores",
    fechaActualizacion: "2023-04-15",
    contenido: "Contenido de la investigación..."
  },
  {
    id: 3,
    titulo: "Investigación para Marketing Digital",
    descripcion: "Tendencias y estadísticas actuales",
    libroId: 3,
    libroTitulo: "Marketing Digital",
    fechaActualizacion: "2023-03-20",
    contenido: "Contenido de la investigación..."
  },
  {
    id: 4,
    titulo: "Investigación para Desarrollo Personal",
    descripcion: "Técnicas y metodologías",
    libroId: 4,
    libroTitulo: "Desarrollo Personal",
    fechaActualizacion: "2023-02-25",
    contenido: "Contenido de la investigación..."
  }
];

export const InvestigacionesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [investigaciones, setInvestigaciones] = useState(investigacionesSimuladas);
  const [selectedInvestigacion, setSelectedInvestigacion] = useState<typeof investigacionesSimuladas[0] | null>(null);

  // Filtrar investigaciones por búsqueda
  const filteredInvestigaciones = investigaciones.filter(investigacion => 
    investigacion.titulo.toLowerCase().includes(searchQuery.toLowerCase()) || 
    investigacion.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) || 
    investigacion.libroTitulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Manejar la selección de una investigación
  const handleSelectInvestigacion = (investigacion: typeof investigacionesSimuladas[0]) => {
    setSelectedInvestigacion(investigacion);
  };

  // Volver a la lista de investigaciones
  const handleVolver = () => {
    setSelectedInvestigacion(null);
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
              <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90">
                Guardar cambios
              </button>
              <button className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted">
                Vista previa
              </button>
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
        <button className="mt-4 flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 md:mt-0">
          <Plus size={18} className="mr-2" />
          Nueva Investigación
        </button>
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
          <button className="inline-flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted">
            <Filter size={16} className="mr-2" />
            Filtros
          </button>
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
                      Libro: {investigacion.libroTitulo}
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
    </div>
  );
};

export default InvestigacionesList;
