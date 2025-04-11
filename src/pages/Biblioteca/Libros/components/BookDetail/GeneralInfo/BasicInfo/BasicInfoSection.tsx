
import { Book } from "../../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormField, FormControl } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoSectionProps {
  book: Book;
  isEditing: boolean;
  form: UseFormReturn<any>;
}

export const BasicInfoSection = ({ book, isEditing, form }: BasicInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h3 className="text-lg font-semibold">Información Básica</h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
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
    </div>
  );
};
