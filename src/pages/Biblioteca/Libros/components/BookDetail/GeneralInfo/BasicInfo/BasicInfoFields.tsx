
import { Book } from "../../../../types/bookTypes";
import { FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { DescriptionSection } from "./DescriptionSection";
import { PublicationDateField } from "../PublicationDateField";

interface BasicInfoFieldsProps {
  book: Book;
  isEditing: boolean;
  form: any; // Type for react-hook-form instance
  onUpdateBook: (updatedData: Partial<Book>) => void; // Añadido para pasar a DescriptionSection
}

export const BasicInfoFields = ({ book, isEditing, form, onUpdateBook }: BasicInfoFieldsProps) => {
  const handleSimpleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // No es necesario llamar a onUpdateBook aquí si el useEffect en useGeneralInfoForm lo maneja
    // form.setValue(name, value, { shouldValidate: true, shouldDirty: true });
  };
  
  const handleDescriptionChange = (newDescription: string) => {
    form.setValue("descripcion", newDescription, { 
      shouldValidate: false, 
      shouldDirty: true,
      shouldTouch: true
    });
    // Actualizamos el formData general del libro.
    // El useEffect en useGeneralInfoForm ignora 'descripcion', así que lo hacemos aquí.
    if (onUpdateBook) {
      onUpdateBook({ descripcion: newDescription });
    }
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="titulo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título Principal</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={!isEditing}
                onChange={(e) => {
                  field.onChange(e);
                  handleSimpleInputChange(e);
                }}
                placeholder="Ej: El Gran Libro de Cocina"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="subtitulo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subtítulo (Opcional)</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={!isEditing}
                onChange={(e) => {
                  field.onChange(e);
                  handleSimpleInputChange(e);
                }}
                placeholder="Ej: Recetas para toda la familia"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="autor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Autor</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled={!isEditing}
                onChange={(e) => {
                  field.onChange(e);
                  handleSimpleInputChange(e);
                }}
                placeholder="Ej: Juan Pérez"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <PublicationDateField 
        form={form} 
        isEditing={isEditing} 
        currentDate={form.selectedDate} 
        onDateChange={(date) => form.handleDateChange('fechaPublicacion', date)}
        label="Fecha de Publicación"
        fieldKey="fechaPublicacion"
      />

      <FormField
        control={form.control}
        name="descripcion"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descripción Corta (Texto Plano)</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                disabled={!isEditing}
                onChange={(e) => {
                  field.onChange(e); // Actualiza el campo en react-hook-form
                  handleDescriptionChange(e.target.value); // Llama a nuestra función para actualizar el formData
                }}
                placeholder="Una breve descripción del libro..."
                rows={4}
                className="bg-muted/30"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <DescriptionSection
        book={book}
        isEditing={isEditing}
        form={form}
        onUpdateBook={onUpdateBook} // Pasamos onUpdateBook
      />
    </div>
  );
};
