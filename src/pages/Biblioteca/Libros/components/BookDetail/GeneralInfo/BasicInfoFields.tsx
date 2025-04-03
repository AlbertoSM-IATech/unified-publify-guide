
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormControl } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoFieldsProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
}

export const BasicInfoFields = ({ book, isEditing, form }: BasicInfoFieldsProps) => {
  return (
    <>
      {/* Título */}
      <div className="grid gap-3">
        <Label htmlFor="titulo">Título</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="titulo"
            render={({ field }) => (
              <Input 
                id="titulo" 
                placeholder="Título del libro"
                {...field}
              />
            )}
          />
        ) : (
          <div className="text-xl font-semibold">{book.titulo}</div>
        )}
      </div>

      {/* Subtítulo */}
      <div className="grid gap-3">
        <Label htmlFor="subtitulo">Subtítulo</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="subtitulo"
            render={({ field }) => (
              <Input 
                id="subtitulo" 
                placeholder="Subtítulo del libro"
                {...field}
              />
            )}
          />
        ) : (
          <div>{book.subtitulo || "No definido"}</div>
        )}
      </div>

      {/* Descripción */}
      <div className="grid gap-3">
        <Label htmlFor="descripcion">Descripción</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <Textarea 
                id="descripcion" 
                placeholder="Descripción del libro"
                rows={5}
                {...field}
              />
            )}
          />
        ) : (
          <div className="text-sm text-muted-foreground">{book.descripcion}</div>
        )}
      </div>

      {/* Autor */}
      <div className="grid gap-3">
        <Label htmlFor="autor">Autor</Label>
        {isEditing ? (
          <FormField
            control={form.control}
            name="autor"
            render={({ field }) => (
              <Input 
                id="autor" 
                placeholder="Nombre del autor"
                {...field}
              />
            )}
          />
        ) : (
          <div>{book.autor}</div>
        )}
      </div>
    </>
  );
};
