
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Book } from "../../types/bookTypes";

interface GeneralInfoSectionProps {
  book: Book;
  isEditing: boolean;
}

export const GeneralInfoSection = ({ book, isEditing }: GeneralInfoSectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    book.fechaPublicacion ? new Date(book.fechaPublicacion) : undefined
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid gap-6">
          {/* Título */}
          <div className="grid gap-3">
            <Label htmlFor="titulo">Título</Label>
            {isEditing ? (
              <Input 
                id="titulo" 
                defaultValue={book.titulo} 
                placeholder="Título del libro" 
              />
            ) : (
              <div className="text-xl font-semibold">{book.titulo}</div>
            )}
          </div>

          {/* Subtítulo */}
          <div className="grid gap-3">
            <Label htmlFor="subtitulo">Subtítulo</Label>
            {isEditing ? (
              <Input 
                id="subtitulo" 
                defaultValue={book.subtitulo} 
                placeholder="Subtítulo del libro" 
              />
            ) : (
              <div>{book.subtitulo || "No definido"}</div>
            )}
          </div>

          {/* Descripción */}
          <div className="grid gap-3">
            <Label htmlFor="descripcion">Descripción</Label>
            {isEditing ? (
              <Textarea 
                id="descripcion" 
                defaultValue={book.descripcion} 
                placeholder="Descripción del libro"
                rows={5}
              />
            ) : (
              <div className="text-sm text-muted-foreground">{book.descripcion}</div>
            )}
          </div>

          {/* Autor */}
          <div className="grid gap-3">
            <Label htmlFor="autor">Autor</Label>
            {isEditing ? (
              <Input 
                id="autor" 
                defaultValue={book.autor} 
                placeholder="Nombre del autor" 
              />
            ) : (
              <div>{book.autor}</div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Estado */}
            <div className="grid gap-3">
              <Label htmlFor="estado">Estado</Label>
              {isEditing ? (
                <Select defaultValue={book.estado}>
                  <SelectTrigger id="estado">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Publicado">Publicado</SelectItem>
                    <SelectItem value="Borrador">Borrador</SelectItem>
                    <SelectItem value="En revisión">En revisión</SelectItem>
                    <SelectItem value="Archivado">Archivado</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div>{book.estado}</div>
              )}
            </div>

            {/* Contenido */}
            <div className="grid gap-3">
              <Label htmlFor="contenido">Contenido</Label>
              {isEditing ? (
                <Select defaultValue={book.contenido}>
                  <SelectTrigger id="contenido">
                    <SelectValue placeholder="Seleccionar nivel de contenido" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alto Contenido">Alto Contenido</SelectItem>
                    <SelectItem value="Medio Contenido">Medio Contenido</SelectItem>
                    <SelectItem value="Bajo Contenido">Bajo Contenido</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div>{book.contenido}</div>
              )}
            </div>
          </div>

          {/* Fecha de publicación */}
          <div className="grid gap-3">
            <Label htmlFor="fechaPublicacion">Fecha de Publicación</Label>
            {isEditing ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP", { locale: es })
                    ) : (
                      <span>Seleccionar fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <div>
                {book.fechaPublicacion
                  ? format(new Date(book.fechaPublicacion), "PPP", { locale: es })
                  : "No definida"}
              </div>
            )}
          </div>

          {/* Relaciones con Investigación y Proyecto */}
          {isEditing && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="grid gap-3">
                <Label htmlFor="investigacion">Investigación Relacionada</Label>
                <Select defaultValue={book.investigacionId?.toString() || ""}>
                  <SelectTrigger id="investigacion">
                    <SelectValue placeholder="Seleccionar investigación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Ninguna</SelectItem>
                    <SelectItem value="1">Investigación #1</SelectItem>
                    <SelectItem value="2">Investigación #2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="proyecto">Proyecto Relacionado</Label>
                <Select defaultValue={book.proyectoId?.toString() || ""}>
                  <SelectTrigger id="proyecto">
                    <SelectValue placeholder="Seleccionar proyecto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Ninguno</SelectItem>
                    <SelectItem value="1">Proyecto #1</SelectItem>
                    <SelectItem value="2">Proyecto #2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
