
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
  
  const [selectedLaunchDate, setSelectedLaunchDate] = useState<Date | undefined>(
    book.fechaLanzamiento ? new Date(book.fechaLanzamiento) : undefined
  );

  const form = useForm({
    defaultValues: {
      titulo: book.titulo,
      subtitulo: book.subtitulo || "",
      descripcion: book.descripcion || "",
      descripcionHtml: book.descripcionHtml || "",
      autor: book.autor,
      estado: book.estado,
      contenido: book.contenido,
      bsr: book.bsr || null,
      landingPageUrl: book.landingPageUrl || "",
      contenidoAPlus: book.contenidoAPlus || "",
      contenidoAPlusFiles: book.contenidoAPlusFiles || [],
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
        descripcionHtml: book.descripcionHtml || "",
        autor: book.autor,
        estado: book.estado,
        contenido: book.contenido,
        bsr: book.bsr || null,
        landingPageUrl: book.landingPageUrl || "",
        contenidoAPlus: book.contenidoAPlus || "",
        contenidoAPlusFiles: book.contenidoAPlusFiles || [],
        investigacionId: book.investigacionId?.toString() || "none",
        proyectoId: book.proyectoId?.toString() || "none"
      });
      setSelectedDate(book.fechaPublicacion ? new Date(book.fechaPublicacion) : undefined);
      setSelectedLaunchDate(book.fechaLanzamiento ? new Date(book.fechaLanzamiento) : undefined);
    }
  }, [book, form]);

  // Update parent component when form data changes
  useEffect(() => {
    if (isEditing && onUpdateBook) {
      const subscription = form.watch((formData) => {
        // Ensure contenidoAPlusFiles has the required properties (non-optional)
        const processedFiles = formData.contenidoAPlusFiles?.map(file => ({
          id: file.id || Date.now(), // Ensure id is not optional
          name: file.name || "", // Ensure name is not optional
          type: file.type || "document" // Ensure type is not optional with a default
        })) || [];
        
        const updatedData: Partial<Book> = {
          ...formData,
          fechaPublicacion: selectedDate ? selectedDate.toISOString() : null,
          fechaLanzamiento: selectedLaunchDate ? selectedLaunchDate.toISOString() : null,
          investigacionId: formData.investigacionId !== "none" ? parseInt(formData.investigacionId) : undefined,
          proyectoId: formData.proyectoId !== "none" ? parseInt(formData.proyectoId) : undefined,
          bsr: formData.bsr ? Number(formData.bsr) : null,
          contenidoAPlusFiles: processedFiles
        };
        onUpdateBook(updatedData);
      });
      
      return () => subscription.unsubscribe();
    }
  }, [form, isEditing, onUpdateBook, selectedDate, selectedLaunchDate]);

  // Handle date change
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    if (onUpdateBook && date) {
      onUpdateBook({ fechaPublicacion: date.toISOString() });
    }
  };
  
  // Handle launch date change
  const handleLaunchDateChange = (date: Date | undefined) => {
    setSelectedLaunchDate(date);
    if (onUpdateBook && date) {
      onUpdateBook({ fechaLanzamiento: date.toISOString() });
    }
  };

  return {
    form,
    selectedDate,
    selectedLaunchDate,
    handleDateChange,
    handleLaunchDateChange
  };
};
