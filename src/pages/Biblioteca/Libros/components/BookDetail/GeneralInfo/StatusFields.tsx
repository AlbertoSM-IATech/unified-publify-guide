
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

interface StatusFieldsProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
  onUpdateBook: (updatedData: Partial<Book>) => void;
}

export const StatusFields = ({ book, isEditing, form, onUpdateBook }: StatusFieldsProps) => {
  // Sincronizar valores del libro con el formulario cuando no está en modo edición
  useEffect(() => {
    if (!isEditing && book) {
      form.setValue("estado", book.estado, { shouldDirty: false, shouldValidate: false });
      form.setValue("contenido", book.contenido, { shouldDirty: false, shouldValidate: false });
    }
  }, [book, form, isEditing]);

  // Manejadores para actualizar los valores y notificar al componente padre
  const handleStatusChange = (value: string) => {
    form.setValue("estado", value);
    if (isEditing) {
      onUpdateBook({ estado: value as Book["estado"] });
    }
  };

  const handleContentChange = (value: string) => {
    form.setValue("contenido", value);
    if (isEditing) {
      onUpdateBook({ contenido: value as Book["contenido"] });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Estado */}
      <FormField
        control={form.control}
        name="estado"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <Label htmlFor="estado">Estado</Label>
            {isEditing ? (
              <Select 
                onValueChange={handleStatusChange}
                value={field.value} // Usar field.value directamente
              >
                <FormControl>
                  <SelectTrigger id="estado" className="hover:border-[#FB923C] transition-colors duration-200">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Borrador">Borrador</SelectItem>
                  <SelectItem value="En revisión">En revisión</SelectItem>
                  <SelectItem value="Publicado">Publicado</SelectItem>
                  <SelectItem value="Archivado">Archivado</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="mt-2 rounded-md border border-input px-3 py-2 bg-muted/10 min-h-[40px] flex items-center">
                {book.estado || "No especificado"}
              </div>
            )}
          </FormItem>
        )}
      />

      {/* Contenido */}
      <FormField
        control={form.control}
        name="contenido"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <Label htmlFor="contenido">Contenido</Label>
            {isEditing ? (
              <Select 
                onValueChange={handleContentChange}
                value={field.value} // Usar field.value directamente
              >
                <FormControl>
                  <SelectTrigger id="contenido" className="hover:border-[#FB923C] transition-colors duration-200">
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Alto Contenido">Alto Contenido</SelectItem>
                  <SelectItem value="Medio Contenido">Medio Contenido</SelectItem>
                  <SelectItem value="Bajo Contenido">Bajo Contenido</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="mt-2 rounded-md border border-input px-3 py-2 bg-muted/10 min-h-[40px] flex items-center">
                {book.contenido || "No especificado"}
              </div>
            )}
          </FormItem>
        )}
      />
    </div>
  );
};
