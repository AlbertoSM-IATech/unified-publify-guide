
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
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface StatusFieldsProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
}

export const StatusFields = ({ book, isEditing, form }: StatusFieldsProps) => {
  // Ensure form values stay in sync with book data
  useEffect(() => {
    if (!isEditing && book) {
      form.setValue("estado", book.estado);
      form.setValue("contenido", book.contenido);
    }
  }, [book, form, isEditing]);

  const dispatchBookUpdate = () => {
    console.log("[StatusFields] Dispatching book update event");
    
    // Update book data in localStorage
    const storedBooksJson = localStorage.getItem('librosData');
    if (storedBooksJson) {
      try {
        const storedBooks = JSON.parse(storedBooksJson);
        const updatedBooks = storedBooks.map((storedBook: any) => {
          if (storedBook.id === book.id) {
            return {
              ...storedBook,
              estado: form.getValues("estado"),
              contenido: form.getValues("contenido")
            };
          }
          return storedBook;
        });
        
        // Save the updated books back to localStorage
        localStorage.setItem('librosData', JSON.stringify(updatedBooks));
        
        // Create a custom event to notify other components of book data change
        const updateEvent = new CustomEvent('publify_books_updated');
        window.dispatchEvent(updateEvent);
        
        toast({
          title: "Estado actualizado",
          description: "La información del libro ha sido actualizada"
        });
      } catch (error) {
        console.error('Error updating book data:', error);
      }
    }
  };

  const handleStatusChange = (value: string) => {
    form.setValue("estado", value);
    if (isEditing) {
      dispatchBookUpdate();
    }
  };

  const handleContentChange = (value: string) => {
    form.setValue("contenido", value);
    if (isEditing) {
      dispatchBookUpdate();
    }
  };

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
                onValueChange={(value) => handleStatusChange(value)}
                defaultValue={field.value}
                value={field.value}
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
                onValueChange={(value) => handleContentChange(value)}
                defaultValue={field.value}
                value={field.value}
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
