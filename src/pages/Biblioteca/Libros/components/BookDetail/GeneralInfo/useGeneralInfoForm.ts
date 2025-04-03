
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Book } from "../../../types/bookTypes";

export const useGeneralInfoForm = (
  book: Book,
  isEditing: boolean,
  onUpdateBook?: (updatedData: Partial<Book>) => void
) => {
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
    if (isEditing && onUpdateBook) {
      const subscription = form.watch((formData) => {
        const updatedData: Partial<Book> = {
          ...formData,
          fechaPublicacion: selectedDate ? selectedDate.toISOString() : null,
          investigacionId: formData.investigacionId !== "none" ? parseInt(formData.investigacionId) : undefined,
          proyectoId: formData.proyectoId !== "none" ? parseInt(formData.proyectoId) : undefined
        };
        onUpdateBook(updatedData);
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

  return {
    form,
    selectedDate,
    handleDateChange
  };
};
