
import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PublicationDateFieldProps {
  book: Book;
  isEditing: boolean;
  selectedDate: Date | undefined;
  selectedLaunchDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  onLaunchDateChange: (date: Date | undefined) => void;
}

export const PublicationDateField = ({ 
  book, 
  isEditing, 
  selectedDate,
  selectedLaunchDate,
  onDateChange,
  onLaunchDateChange
}: PublicationDateFieldProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Fecha de publicación */}
      <div className="grid gap-3">
        <Label htmlFor="fecha-publicacion">Fecha de publicación</Label>
        {isEditing ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="fecha-publicacion"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "dd MMMM yyyy", { locale: es }) : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onDateChange}
                initialFocus
                className="pointer-events-auto"
                locale={es}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <div>
            {book.fechaPublicacion 
              ? format(new Date(book.fechaPublicacion), "dd MMMM yyyy", { locale: es })
              : "No definida"}
          </div>
        )}
      </div>

      {/* Nueva Fecha de lanzamiento */}
      <div className="grid gap-3">
        <Label htmlFor="fecha-lanzamiento">Fecha de lanzamiento</Label>
        {isEditing ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="fecha-lanzamiento"
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal hover:border-[#FB923C]",
                  !selectedLaunchDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedLaunchDate ? format(selectedLaunchDate, "dd MMMM yyyy", { locale: es }) : "Seleccionar fecha de lanzamiento"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedLaunchDate}
                onSelect={onLaunchDateChange}
                initialFocus
                className="pointer-events-auto"
                locale={es}
              />
            </PopoverContent>
          </Popover>
        ) : (
          <div>
            {book.fechaLanzamiento 
              ? format(new Date(book.fechaLanzamiento), "dd MMMM yyyy", { locale: es })
              : "No definida"}
          </div>
        )}
      </div>
    </div>
  );
};

