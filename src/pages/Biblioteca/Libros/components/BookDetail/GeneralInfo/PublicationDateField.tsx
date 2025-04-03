
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface PublicationDateFieldProps {
  book: Book;
  isEditing: boolean;
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const PublicationDateField = ({
  book,
  isEditing,
  selectedDate,
  onDateChange
}: PublicationDateFieldProps) => {
  return (
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
              onSelect={onDateChange}
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
  );
};
