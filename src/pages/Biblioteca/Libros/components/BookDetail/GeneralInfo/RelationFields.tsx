
import { Book } from "../../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ExternalLink } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RelationFieldsProps {
  form: UseFormReturn<any>;
  book?: Book;
}

export const RelationFields = ({ form, book }: RelationFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="grid gap-3">
        <Label htmlFor="investigacion">Investigación Relacionada</Label>
        <FormField
          control={form.control}
          name="investigacionId"
          render={({ field }) => (
            <>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger id="investigacion">
                  <SelectValue placeholder="Seleccionar investigación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguna</SelectItem>
                  <SelectItem value="1">Investigación #1</SelectItem>
                  <SelectItem value="2">Investigación #2</SelectItem>
                </SelectContent>
              </Select>
              {book?.investigacionId && field.value !== "none" && (
                <div className="mt-2">
                  <Link 
                    to={`/biblioteca/investigaciones/${book.investigacionId}`}
                    className="flex items-center text-sm text-primary hover:underline"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Ver investigación
                  </Link>
                </div>
              )}
            </>
          )}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="proyecto">Colección Relacionada</Label>
        <FormField
          control={form.control}
          name="proyectoId"
          render={({ field }) => (
            <>
              <Select 
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <SelectTrigger id="proyecto">
                  <SelectValue placeholder="Seleccionar colección" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguna</SelectItem>
                  <SelectItem value="1">Colección #1</SelectItem>
                  <SelectItem value="2">Colección #2</SelectItem>
                </SelectContent>
              </Select>
              {book?.proyectoId && field.value !== "none" && (
                <div className="mt-2">
                  <Link 
                    to={`/biblioteca/colecciones/${book.proyectoId}`}
                    className="flex items-center text-sm text-primary hover:underline"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Ver colección
                  </Link>
                </div>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};
