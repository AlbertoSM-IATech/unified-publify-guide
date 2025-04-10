
import { Book } from "../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

// Datos simulados para investigaciones (deben coincidir con los datos en InvestigacionesList.tsx)
const investigacionesSimuladas = [
  {
    id: 1,
    titulo: "Investigación para El Arte de la Estrategia",
    descripcion: "Notas y fuentes para el libro",
    libroId: 1,
    libroTitulo: "El Arte de la Estrategia",
    fechaActualizacion: "2023-10-05"
  },
  {
    id: 2,
    titulo: "Investigación para Finanzas para Emprendedores",
    descripcion: "Referencias y estudios de caso",
    libroId: 2,
    libroTitulo: "Finanzas para Emprendedores",
    fechaActualizacion: "2023-04-15"
  },
  {
    id: 3,
    titulo: "Investigación para Marketing Digital",
    descripcion: "Tendencias y estadísticas actuales",
    libroId: 3,
    libroTitulo: "Marketing Digital",
    fechaActualizacion: "2023-03-20"
  },
  {
    id: 4,
    titulo: "Investigación para Desarrollo Personal",
    descripcion: "Técnicas y metodologías",
    libroId: 4,
    libroTitulo: "Desarrollo Personal",
    fechaActualizacion: "2023-02-25"
  }
];

// Datos simulados para colecciones (deben coincidir con los datos en ColeccionesList.tsx)
const coleccionesSimuladas = [
  {
    id: 1,
    nombre: "Serie Emprendimiento",
    descripcion: "Libros sobre emprendimiento y negocios",
    cantidadLibros: 3,
    fechaCreacion: "2023-01-15",
    libros: [1, 2, 7]
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

interface RelationFieldsProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const RelationFields = ({ book, isEditing, onUpdateBook }: RelationFieldsProps) => {
  const [selectedInvestigacion, setSelectedInvestigacion] = useState<typeof investigacionesSimuladas[0] | null>(null);
  const [selectedColeccion, setSelectedColeccion] = useState<typeof coleccionesSimuladas[0] | null>(null);

  // Cargar la investigación relacionada al libro cuando se monta el componente
  useEffect(() => {
    const loadRelatedEntities = () => {
      // Cargar investigación relacionada
      if (book.investigacionId) {
        const investigacion = investigacionesSimuladas.find(inv => inv.id === book.investigacionId);
        setSelectedInvestigacion(investigacion || null);
      } else {
        setSelectedInvestigacion(null);
      }
      
      // Cargar colección relacionada
      if (book.proyectoId) {
        const coleccion = coleccionesSimuladas.find(col => col.id === book.proyectoId);
        setSelectedColeccion(coleccion || null);
      } else {
        setSelectedColeccion(null);
      }
    };
    
    loadRelatedEntities();
  }, [book.investigacionId, book.proyectoId]);

  // Manejar cambio de investigación
  const handleInvestigacionChange = (value: string) => {
    const investigacionId = value === "none" ? undefined : Number(value);
    onUpdateBook({ investigacionId });
    
    if (investigacionId) {
      const investigacion = investigacionesSimuladas.find(inv => inv.id === investigacionId);
      setSelectedInvestigacion(investigacion || null);
    } else {
      setSelectedInvestigacion(null);
    }
  };

  // Manejar cambio de colección
  const handleColeccionChange = (value: string) => {
    const proyectoId = value === "none" ? undefined : Number(value);
    onUpdateBook({ proyectoId });
    
    if (proyectoId) {
      const coleccion = coleccionesSimuladas.find(col => col.id === proyectoId);
      setSelectedColeccion(coleccion || null);
    } else {
      setSelectedColeccion(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="grid gap-3">
        <Label htmlFor="investigacion">Investigación Relacionada</Label>
        {isEditing ? (
          <Select 
            onValueChange={handleInvestigacionChange}
            defaultValue={book.investigacionId ? book.investigacionId.toString() : "none"}
          >
            <SelectTrigger id="investigacion" className="hover:border-[#FB923C] transition-colors duration-200">
              <SelectValue placeholder="Seleccionar investigación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Ninguna</SelectItem>
              {investigacionesSimuladas.map(inv => (
                <SelectItem key={inv.id} value={inv.id.toString()}>
                  {inv.titulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="rounded-md border border-input px-3 py-2 bg-muted/50">
            {selectedInvestigacion ? selectedInvestigacion.titulo : "Ninguna investigación seleccionada"}
          </div>
        )}
        
        {selectedInvestigacion && (
          <motion.div 
            className="mt-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              to={`/biblioteca/investigaciones`}
              state={{ selectInvestigacion: selectedInvestigacion.id }}
              className="flex items-center text-sm text-primary hover:underline hover:text-[#FB923C] transition-colors duration-200"
            >
              <ExternalLink size={14} className="mr-1" />
              Ver investigación
            </Link>
          </motion.div>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="proyecto">Colección Relacionada</Label>
        {isEditing ? (
          <Select 
            onValueChange={handleColeccionChange}
            defaultValue={book.proyectoId ? book.proyectoId.toString() : "none"}
          >
            <SelectTrigger id="proyecto" className="hover:border-[#FB923C] transition-colors duration-200">
              <SelectValue placeholder="Seleccionar colección" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Ninguna</SelectItem>
              {coleccionesSimuladas.map(col => (
                <SelectItem key={col.id} value={col.id.toString()}>
                  {col.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <div className="rounded-md border border-input px-3 py-2 bg-muted/50">
            {selectedColeccion ? selectedColeccion.nombre : "Ninguna colección seleccionada"}
          </div>
        )}
        
        {selectedColeccion && (
          <motion.div 
            className="mt-2"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              to={`/biblioteca/colecciones/${selectedColeccion.id}`}
              className="flex items-center text-sm text-primary hover:underline hover:text-[#FB923C] transition-colors duration-200"
            >
              <ExternalLink size={14} className="mr-1" />
              Ver colección
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};
