
import { useState, useEffect } from "react";
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
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface GeneralInfoSectionProps {
  book: Book;
  isEditing: boolean;
  onUpdateBook?: (updatedData: Partial<Book>) => void;
}

export const GeneralInfoSection = ({ 
  book, 
  isEditing,
  onUpdateBook 
}: GeneralInfoSectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    book.fechaPublicacion ? new Date(book.fechaPublicacion) : undefined
  );

  const form = useForm({
    defaultValues: {
      titulo: book.titulo,
      subtitulo: book.subtitulo || "",
      descripcion: book.descripcion || "",
      autor: book.autor,
      estado: book.estado,
      contenido: book.contenido,
      investigacionId: book.investigacionId?.toString() || "none",
      proyectoId: book.proyectoId?.toString() || "none"
    }
  });

  // Update form when book data changes
  useEffect(() => {
    if (book) {
      form.reset({
        titulo: book.titulo,
        subtitulo: book.subtitulo || "",
        descripcion: book.descripcion || "",
        autor: book.autor,
        estado: book.estado,
        contenido: book.contenido,
        investigacionId: book.investigacionId?.toString() || "none",
        proyectoId: book.proyectoId?.toString() || "none"
      });
      setSelectedDate(book.fechaPublicacion ? new Date(book.fechaPublicacion) : undefined);
    }
  }, [book, form]);

  // Update parent component when form data changes
  useEffect(() => {
    if (isEditing) {
      const subscription = form.watch((formData) => {
        if (onUpdateBook) {
          const updatedData: Partial<Book> = {
            ...formData,
            fechaPublicacion: selectedDate ? selectedDate.toISOString() : null,
            investigacionId: formData.investigacionId !== "none" ? parseInt(formData.investigacionId) : undefined,
            proyectoId: formData.proyectoId !== "none" ? parseInt(formData.proyectoId) : undefined
          };
          onUpdateBook(updatedData);
        }
      });
      
      return () => subscription.unsubscribe();
    }
  }, [form, isEditing, onUpdateBook, selectedDate]);

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (onUpdateBook && date) {
      onUpdateBook({ fechaPublicacion: date.toISOString() });
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <div className="grid gap-6">
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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Estado */}
              <div className="grid gap-3">
                <Label htmlFor="estado">Estado</Label>
                {isEditing ? (
                  <FormField
                    control={form.control}
                    name="estado"
                    render={({ field }) => (
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                    )}
                  />
                ) : (
                  <div>{book.estado}</div>
                )}
              </div>

              {/* Contenido */}
              <div className="grid gap-3">
                <Label htmlFor="contenido">Contenido</Label>
                {isEditing ? (
                  <FormField
                    control={form.control}
                    name="contenido"
                    render={({ field }) => (
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id="contenido">
                          <SelectValue placeholder="Seleccionar nivel de contenido" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Alto Contenido">Alto Contenido</SelectItem>
                          <SelectItem value="Medio Contenido">Medio Contenido</SelectItem>
                          <SelectItem value="Bajo Contenido">Bajo Contenido</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
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
                      onSelect={handleDateChange}
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

            {/* Relaciones con Investigación y Colección */}
            {isEditing && (
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
            )}
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};
