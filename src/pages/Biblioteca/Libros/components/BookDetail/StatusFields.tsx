
import { Book } from "../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StatusFieldsProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
}

// Updated colors as specified
const statusColors = {
  "Publicado": "#10B981",  // Green
  "Borrador": "#6366F1",   // Indigo
  "En revisión": "#F59E0B", // Amber
  "Archivado": "#EF4444"   // Red
};

const contentColors = {
  "Alto Contenido": "#3B82F6",  // Blue
  "Medio Contenido": "#FB923C", // Coral Orange  
  "Bajo Contenido": "#10B981"   // Green
};

export const StatusFields = ({ book, isEditing, form }: StatusFieldsProps) => {
  // Get color based on status or content
  const getStatusColor = (status: string) => statusColors[status as keyof typeof statusColors] || "#6B7280";
  const getContentColor = (content: string) => contentColors[content as keyof typeof contentColors] || "#6B7280";

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Estado */}
      <div className="grid gap-3">
        <Label htmlFor="estado">Estado</Label>
        {isEditing ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="estado" className="hover:border-[#FB923C] transition-colors duration-200">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Publicado">Publicado</SelectItem>
                    <SelectItem value="Borrador">Borrador</SelectItem>
                    <SelectItem value="En revisión">En revisión</SelectItem>
                    <SelectItem value="Archivado">Archivado</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </motion.div>
        ) : (
          <div className="flex items-center">
            <div 
              className="h-3 w-3 rounded-full mr-2" 
              style={{ backgroundColor: getStatusColor(book.estado) }} 
            />
            <span>{book.estado}</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="grid gap-3">
        <Label htmlFor="contenido">Contenido</Label>
        {isEditing ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FormField
              control={form.control}
              name="contenido"
              render={({ field }) => (
                <Select 
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="contenido" className="hover:border-[#FB923C] transition-colors duration-200">
                    <SelectValue placeholder="Seleccionar nivel de contenido" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alto Contenido">Alto Contenido</SelectItem>
                    <SelectItem value="Medio Contenido">Medio Contenido</SelectItem>
                    <SelectItem value="Bajo Contenido">Bajo Contenido</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </motion.div>
        ) : (
          <div className="flex items-center">
            <div 
              className="h-3 w-3 rounded-full mr-2" 
              style={{ backgroundColor: getContentColor(book.contenido) }} 
            />
            <span>{book.contenido}</span>
          </div>
        )}
      </div>
    </div>
  );
};
