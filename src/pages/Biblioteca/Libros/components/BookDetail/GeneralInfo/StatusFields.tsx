
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormControl } from "@/components/ui/form"; // FormControl e Item para consistencia
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
// toast ya no se usa aquí
// import { toast } from "@/hooks/use-toast";

interface StatusFieldsProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>; // Mantener form por si se usa para control directo
  onUpdateBook: (updatedData: Partial<Book>) => void; // Añadir onUpdateBook
}

export const StatusFields = ({ book, isEditing, form, onUpdateBook }: StatusFieldsProps) => {
  // Sincronizar form.setValue con book data cuando no se está editando
  useEffect(() => {
    if (!isEditing && book) {
      // Asegurarse de que los nombres de campo coincidan con los del formulario/Book type
      form.setValue("estado", book.estado, { shouldDirty: false, shouldValidate: false });
      form.setValue("contenido", book.contenido, { shouldDirty: false, shouldValidate: false });
    }
  }, [book, form, isEditing]);

  // Ya no se necesita dispatchBookUpdate
  // const dispatchBookUpdate = () => { ... }

  const handleStatusChange = (value: string) => {
    form.setValue("estado", value); // Actualiza el valor en react-hook-form
    if (isEditing) {
      onUpdateBook({ estado: value as Book["estado"] }); // Notifica el cambio al hook principal
    }
  };

  const handleContentChange = (value: string) => {
    form.setValue("contenido", value); // Actualiza el valor en react-hook-form
    if (isEditing) {
      onUpdateBook({ contenido: value as Book["contenido"] }); // Notifica el cambio al hook principal
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Estado */}
      <FormField
        control={form.control}
        name="estado"
        render={({ field }) => (
          <FormItem className="grid gap-3"> {/* Usar FormItem para estructura semántica */}
            <Label htmlFor="estado">Estado</Label>
            {isEditing ? (
              <Select 
                onValueChange={handleStatusChange} // Usar nuestra función de manejo
                value={field.value || book.estado} // Usar field.value, fallback a book.estado si es necesario
                defaultValue={book.estado}
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
          <FormItem className="grid gap-3"> {/* Usar FormItem */}
            <Label htmlFor="contenido">Contenido</Label>
            {isEditing ? (
              <Select 
                onValueChange={handleContentChange} // Usar nuestra función de manejo
                value={field.value || book.contenido} // Usar field.value, fallback a book.contenido
                defaultValue={book.contenido}
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

