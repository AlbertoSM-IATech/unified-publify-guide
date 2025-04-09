
import { Book } from "../../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { librosSimulados } from "../../../utils/librosUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RelationFieldsProps {
  form: UseFormReturn<any>;
  book?: Book;
}

// Simulate fetching from database
const fetchInvestigaciones = () => {
  // This would be replaced with actual API call
  return [
    { id: 1, titulo: "Investigación: Mercado de libros de cocina" },
    { id: 2, titulo: "Investigación: Tendencias en ciencia ficción" },
    { id: 3, titulo: "Investigación: Marketing para autores" },
  ];
};

const fetchColecciones = () => {
  // This would be replaced with actual API call
  return [
    { id: 1, titulo: "Colección: Cocina mediterránea" },
    { id: 2, titulo: "Colección: Aventuras espaciales" },
    { id: 3, titulo: "Colección: Autoayuda para escritores" },
  ];
};

export const RelationFields = ({ form, book }: RelationFieldsProps) => {
  const [investigaciones, setInvestigaciones] = useState<{id: number, titulo: string}[]>([]);
  const [colecciones, setColecciones] = useState<{id: number, titulo: string}[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API loading
    const fetchData = async () => {
      setLoading(true);
      try {
        const investigacionesData = await fetchInvestigaciones();
        const coleccionesData = await fetchColecciones();
        
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

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="grid gap-3">
        <Label htmlFor="investigacion">Investigación Relacionada</Label>
        <FormField
          control={form.control}
          name="investigacionId"
          render={({ field }) => (
            <>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={loading}
              >
                <SelectTrigger id="investigacion" className="hover:border-[#FB923C] transition-colors duration-200">
                  <SelectValue placeholder="Seleccionar investigación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguna</SelectItem>
                  {investigaciones.map((inv) => (
                    <SelectItem key={inv.id} value={inv.id.toString()}>
                      {inv.titulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {book?.investigacionId && field.value !== "none" && (
                <motion.div 
                  className="mt-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    to={`/biblioteca/investigaciones/${book.investigacionId}`}
                    className="flex items-center text-sm text-[#3B82F6] hover:underline hover:text-[#FB923C] transition-colors duration-200"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Ver investigación
                  </Link>
                </motion.div>
              )}
            </>
          )}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="proyecto">Colección Relacionada</Label>
        <FormField
          control={form.control}
          name="proyectoId"
          render={({ field }) => (
            <>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={loading}
              >
                <SelectTrigger id="proyecto" className="hover:border-[#FB923C] transition-colors duration-200">
                  <SelectValue placeholder="Seleccionar colección" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguna</SelectItem>
                  {colecciones.map((col) => (
                    <SelectItem key={col.id} value={col.id.toString()}>
                      {col.titulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {book?.proyectoId && field.value !== "none" && (
                <motion.div 
                  className="mt-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    to={`/biblioteca/colecciones/${book.proyectoId}`}
                    className="flex items-center text-sm text-[#3B82F6] hover:underline hover:text-[#FB923C] transition-colors duration-200"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Ver colección
                  </Link>
                </motion.div>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};
