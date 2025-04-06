
import { Book } from "../../types/bookTypes";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
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
                <SelectTrigger id="investigacion" className="hover:border-[#FB923C] transition-colors duration-200">
                  <SelectValue placeholder="Seleccionar investigación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguna</SelectItem>
                  <SelectItem value="1">Investigación #1</SelectItem>
                  <SelectItem value="2">Investigación #2</SelectItem>
                </SelectContent>
              </Select>
              {book?.investigacionId && field.value !== "none" && (
                <motion.div 
                  className="mt-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    to={`/biblioteca/investigaciones/${book.investigacionId}`}
                    className="flex items-center text-sm text-primary hover:underline hover:text-[#FB923C] transition-colors duration-200"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Ver investigación
                  </Link>
                </motion.div>
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
                <SelectTrigger id="proyecto" className="hover:border-[#FB923C] transition-colors duration-200">
                  <SelectValue placeholder="Seleccionar colección" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Ninguna</SelectItem>
                  <SelectItem value="1">Colección #1</SelectItem>
                  <SelectItem value="2">Colección #2</SelectItem>
                </SelectContent>
              </Select>
              {book?.proyectoId && field.value !== "none" && (
                <motion.div 
                  className="mt-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link 
                    to={`/biblioteca/colecciones/${book.proyectoId}`}
                    className="flex items-center text-sm text-primary hover:underline hover:text-[#FB923C] transition-colors duration-200"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Ver colección
                  </Link>
                </motion.div>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};
