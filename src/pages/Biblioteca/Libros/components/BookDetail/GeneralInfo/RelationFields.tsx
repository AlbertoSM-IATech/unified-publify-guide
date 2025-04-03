
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

interface RelationFieldsProps {
  form: UseFormReturn<any>;
}

export const RelationFields = ({ form }: RelationFieldsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="grid gap-3">
        <Label htmlFor="investigacion">Investigación Relacionada</Label>
        <FormField
          control={form.control}
          name="investigacionId"
          render={({ field }) => (
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
          )}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="proyecto">Colección Relacionada</Label>
        <FormField
          control={form.control}
          name="proyectoId"
          render={({ field }) => (
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
          )}
        />
      </div>
    </div>
  );
};
