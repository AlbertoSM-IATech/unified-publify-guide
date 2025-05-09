
import { Book } from "../../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ExternalLink, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface RelationFieldsProps {
  form: UseFormReturn<any>;
  book?: Book;
}

// Define proper interfaces for related entities
interface Investigacion {
  id: number;
  titulo: string;
  descripcion?: string;
  estado?: string;
  // Add more fields as needed
}
interface Coleccion {
  id: number;
  titulo: string;
  descripcion?: string;
  estado?: string;
  // Add more fields as needed
}

// Simulate fetching from database 
// In a real application, this would be an API call to get actual data
const fetchInvestigaciones = (): Promise<Investigacion[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{
        id: 1,
        titulo: "Mercado de libros de cocina",
        descripcion: "Análisis del mercado editorial de libros de cocina",
        estado: "Activo"
      }, {
        id: 2,
        titulo: "Tendencias en ciencia ficción",
        descripcion: "Estudio de tendencias en el género de ciencia ficción",
        estado: "Activo"
      }, {
        id: 3,
        titulo: "Marketing para autores",
        descripcion: "Investigación sobre estrategias de marketing para escritores independientes",
        estado: "Completado"
      }]);
    }, 300);
  });
};
const fetchColecciones = (): Promise<Coleccion[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{
        id: 1,
        titulo: "Cocina mediterránea",
        descripcion: "Colección de libros de cocina mediterránea",
        estado: "Activa"
      }, {
        id: 2,
        titulo: "Aventuras espaciales",
        descripcion: "Serie de ciencia ficción en el espacio profundo",
        estado: "Activa"
      }, {
        id: 3,
        titulo: "Autoayuda para escritores",
        descripcion: "Colección de guías para escritores independientes",
        estado: "En desarrollo"
      }]);
    }, 300);
  });
};

// Fetch a specific investigation by ID
const fetchInvestigacionById = (id: number): Promise<Investigacion | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const investigaciones = [{
        id: 1,
        titulo: "Mercado de libros de cocina",
        descripcion: "Análisis del mercado editorial de libros de cocina",
        estado: "Activo"
      }, {
        id: 2,
        titulo: "Tendencias en ciencia ficción",
        descripcion: "Estudio de tendencias en el género de ciencia ficción",
        estado: "Activo"
      }, {
        id: 3,
        titulo: "Marketing para autores",
        descripcion: "Investigación sobre estrategias de marketing para escritores independientes",
        estado: "Completado"
      }];
      const investigacion = investigaciones.find(inv => inv.id === id);
      resolve(investigacion || null);
    }, 200);
  });
};

// Fetch a specific collection by ID
const fetchColeccionById = (id: number): Promise<Coleccion | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const colecciones = [{
        id: 1,
        titulo: "Cocina mediterránea",
        descripcion: "Colección de libros de cocina mediterránea",
        estado: "Activa"
      }, {
        id: 2,
        titulo: "Aventuras espaciales",
        descripcion: "Serie de ciencia ficción en el espacio profundo",
        estado: "Activa"
      }, {
        id: 3,
        titulo: "Autoayuda para escritores",
        descripcion: "Colección de guías para escritores independientes",
        estado: "En desarrollo"
      }];
      const coleccion = colecciones.find(col => col.id === id);
      resolve(coleccion || null);
    }, 200);
  });
};

export const RelationFields = ({
  form,
  book
}: RelationFieldsProps) => {
  const [investigaciones, setInvestigaciones] = useState<Investigacion[]>([]);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [loading, setLoading] = useState(true);

  // Add state for selected related items
  const [selectedInvestigacion, setSelectedInvestigacion] = useState<Investigacion | null>(null);
  const [selectedColeccion, setSelectedColeccion] = useState<Coleccion | null>(null);
  const [loadingRelated, setLoadingRelated] = useState({
    investigacion: false,
    coleccion: false
  });
  
  useEffect(() => {
    // Fetch the related data
    const fetchData = async () => {
      setLoading(true);
      try {
        const [investigacionesData, coleccionesData] = await Promise.all([fetchInvestigaciones(), fetchColecciones()]);
        setInvestigaciones(investigacionesData);
        setColecciones(coleccionesData);
      } catch (error) {
        console.error("Error fetching relation data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch related investigation details when book has investigacionId
  useEffect(() => {
    const fetchRelatedInvestigacion = async () => {
      if (book?.investigacionId) {
        setLoadingRelated(prev => ({
          ...prev,
          investigacion: true
        }));
        try {
          const investigacion = await fetchInvestigacionById(book.investigacionId);
          setSelectedInvestigacion(investigacion);
        } catch (error) {
          console.error("Error fetching related investigation:", error);
        } finally {
          setLoadingRelated(prev => ({
            ...prev,
            investigacion: false
          }));
        }
      } else {
        setSelectedInvestigacion(null);
      }
    };
    fetchRelatedInvestigacion();
  }, [book?.investigacionId]);

  // Fetch related collection details when book has proyectoId
  useEffect(() => {
    const fetchRelatedColeccion = async () => {
      if (book?.proyectoId) {
        setLoadingRelated(prev => ({
          ...prev,
          coleccion: true
        }));
        try {
          const coleccion = await fetchColeccionById(book.proyectoId);
          setSelectedColeccion(coleccion);
        } catch (error) {
          console.error("Error fetching related collection:", error);
        } finally {
          setLoadingRelated(prev => ({
            ...prev,
            coleccion: false
          }));
        }
      } else {
        setSelectedColeccion(null);
      }
    };
    fetchRelatedColeccion();
  }, [book?.proyectoId]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Investigación Relacionada */}
      <div className="grid gap-3">
        <Label>Investigación Relacionada</Label>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Cargando investigaciones...</span>
          </div>
        ) : (
          <div className="rounded-md border border-input px-3 py-2 bg-muted/50">
            {selectedInvestigacion ? selectedInvestigacion.titulo : "Ninguna investigación seleccionada"}
          </div>
        )}
        
        {selectedInvestigacion && (
          <motion.div 
            className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-200 dark:border-slate-800"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{selectedInvestigacion.titulo}</h4>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-2">
                {selectedInvestigacion.descripcion}
              </p>
              
              <Link 
                to={`/biblioteca/investigaciones`}
                state={{ selectInvestigacion: selectedInvestigacion.id }}
                className="flex items-center text-sm text-primary hover:underline hover:text-[#FB923C] transition-colors duration-200"
              >
                <ExternalLink size={14} className="mr-1" />
                Ver investigación
              </Link>
            </div>
          </motion.div>
        )}
      </div>

      {/* Colección Relacionada */}
      <div className="grid gap-3">
        <Label>Colección Relacionada</Label>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Cargando colecciones...</span>
          </div>
        ) : (
          <div className="rounded-md border border-input px-3 py-2 bg-muted/50">
            {selectedColeccion ? selectedColeccion.titulo : "Ninguna colección seleccionada"}
          </div>
        )}
        
        {selectedColeccion && (
          <motion.div 
            className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-200 dark:border-slate-800"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{selectedColeccion.titulo}</h4>
                <Badge variant="outline" className="text-xs">{selectedColeccion.estado}</Badge>
              </div>
              
              <p className="text-xs text-muted-foreground line-clamp-2">
                {selectedColeccion.descripcion}
              </p>
              
              <Link 
                to={`/biblioteca/colecciones/${selectedColeccion.id}`}
                className="flex items-center text-sm text-primary hover:underline hover:text-[#FB923C] transition-colors duration-200"
              >
                <ExternalLink size={14} className="mr-1" />
                Ver colección
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
