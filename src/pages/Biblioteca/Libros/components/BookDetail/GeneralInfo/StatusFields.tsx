
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
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

export const StatusFields = ({ book, isEditing, form }: StatusFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Estado */}
      <div className="grid gap-3">
        <Label htmlFor="estado">Estado</Label>
        {isEditing ? (
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
                  <SelectItem value="Borrador">Borrador</SelectItem>
                  <SelectItem value="En revisión">En revisión</SelectItem>
                  <SelectItem value="Publicado">Publicado</SelectItem>
                  <SelectItem value="Archivado">Archivado</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        ) : (
          <div>{book.estado}</div>
        )}
      </div>

      {/* Contenido */}
      <div className="grid gap-3">
        <Label htmlFor="contenido">Contenido</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="contenido"
            render={({ field }) => (
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger id="contenido" className="hover:border-[#FB923C] transition-colors duration-200">
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Alto Contenido">Alto Contenido</SelectItem>
                  <SelectItem value="Medio Contenido">Medio Contenido</SelectItem>
                  <SelectItem value="Bajo Contenido">Bajo Contenido</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        ) : (
          <div>{book.contenido}</div>
        )}
      </div>
    </div>
  );
};
