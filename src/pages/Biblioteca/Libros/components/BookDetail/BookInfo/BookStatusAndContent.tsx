
import { Book } from "../../../types/bookTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/common/StatusBadge";

interface BookStatusAndContentProps {
  book: Book;
  isEditing: boolean;
  onStatusChange: (value: string) => void;
  onContentTypeChange: (value: string) => void;
}

export const BookStatusAndContent = ({ book, isEditing, onStatusChange, onContentTypeChange }: BookStatusAndContentProps) => {
  return (
    <>
      <div className="grid gap-3 py-0 my-[20px]">
        <label className="text-sm font-medium">Estado</label>
        {isEditing ? (
          <Select 
            defaultValue={book.estado} 
            onValueChange={onStatusChange}
          >
            <SelectTrigger className="hover:border-[#FB923C] transition-colors duration-200">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Borrador">Borrador</SelectItem>
              <SelectItem value="En revisión">En revisión</SelectItem>
              <SelectItem value="Publicado">Publicado</SelectItem>
              <SelectItem value="Archivado">Archivado</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <StatusBadge status={book.estado.toLowerCase()} />
        )}
      </div>

      <div className="grid gap-3">
        <label className="text-sm font-medium">Tipo de Contenido</label>
        {isEditing ? (
          <Select 
            defaultValue={book.contenido} 
            onValueChange={onContentTypeChange}
          >
            <SelectTrigger className="hover:border-[#FB923C] transition-colors duration-200">
              <SelectValue placeholder="Seleccionar tipo de contenido" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alto Contenido">Alto Contenido</SelectItem>
              <SelectItem value="Medio Contenido">Medio Contenido</SelectItem>
              <SelectItem value="Bajo Contenido">Bajo Contenido</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <StatusBadge status={book.contenido.toLowerCase()} />
        )}
      </div>
    </>
  );
};
