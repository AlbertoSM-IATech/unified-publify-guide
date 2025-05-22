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
  form: any; // Type for react-hook-form instance from useGeneralInfoForm
  onUpdateBook: (updatedData: Partial<Book>) => void;
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
        book={book} // Pasamos el objeto book completo
        isEditing={isEditing} 
        selectedDate={form.selectedDate} // Fecha de publicación del hook del formulario
        selectedLaunchDate={form.selectedLaunchDate} // Fecha de lanzamiento del hook del formulario
        onDateChange={(date) => form.handleDateChange('fechaPublicacion', date)} // Manejador para fecha de publicación
        onLaunchDateChange={(date) => form.handleDateChange('fechaLanzamiento', date)} // Manejador para fecha de lanzamiento
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
                  field.onChange(e); 
                  handleDescriptionChange(e.target.value); 
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
        onUpdateBook={onUpdateBook}
      />
    </div>
  );
};
