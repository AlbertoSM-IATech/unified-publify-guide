
import { Book } from "../../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormField, FormControl, FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoSectionProps {
  book: Book;
  isEditing: boolean;
  form: any; // Using 'any' here to handle the extended form object from useGeneralInfoForm
}

export const BasicInfoSection = ({
  book,
  isEditing,
  form
}: BasicInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h3 className="text-lg font-extrabold text-blue-500">Información Básica</h3>
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
              <FormItem>
                <FormControl>
                  <Input id="titulo" placeholder="Título del libro" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <div className="text-xl font-semibold border rounded-md p-2 bg-card shadow-sm">
            {book.titulo}
          </div>
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
              <FormItem>
                <FormControl>
                  <Input id="subtitulo" placeholder="Subtítulo del libro" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <div className="border rounded-md p-2 bg-card shadow-sm">
            {book.subtitulo || "No definido"}
          </div>
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
              <FormItem>
                <FormControl>
                  <Input id="autor" placeholder="Nombre del autor" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <div className="border rounded-md p-2 bg-card shadow-sm">
            {book.autor}
          </div>
        )}
      </div>
    </div>
  );
};
