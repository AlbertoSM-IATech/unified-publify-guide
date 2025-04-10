
import { Book } from "../../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { coleccionesSimuladas } from "../../../utils/librosUtils";

interface CollectionRelationProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const CollectionRelation = ({ 
  book, 
  isEditing, 
  onUpdateBook 
}: CollectionRelationProps) => {
  const [selectedColeccion, setSelectedColeccion] = useState<typeof coleccionesSimuladas[0] | null>(null);

  // Load related collection when component mounts or book changes
  useEffect(() => {
    if (book.proyectoId) {
      const coleccion = coleccionesSimuladas.find(col => col.id === book.proyectoId);
      setSelectedColeccion(coleccion || null);
    } else {
      setSelectedColeccion(null);
    }
  }, [book.proyectoId]);

  // Handle collection change
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
          className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-md border border-slate-200 dark:border-slate-800"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">{selectedColeccion.nombre}</h4>
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
  );
};
