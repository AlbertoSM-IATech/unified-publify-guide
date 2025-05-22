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

  const formMethods = useForm({
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
      proyectoId: book.proyectoId?.toString() || "none",
      
      // Audience fields
      targetAge: book.targetAge || "",
      targetGender: book.targetGender || "",
      targetInterests: book.targetInterests || "",
      marketPosition: book.marketPosition || "",
      competitorBooks: book.competitorBooks || "",
      uniqueValueProposition: book.uniqueValueProposition || "",
    }
  });

  // Update form when book data changes
  useEffect(() => {
    if (book) {
      formMethods.reset({
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
        proyectoId: book.proyectoId?.toString() || "none",
        
        // Audience fields
        targetAge: book.targetAge || "",
        targetGender: book.targetGender || "",
        targetInterests: book.targetInterests || "",
        marketPosition: book.marketPosition || "",
        competitorBooks: book.competitorBooks || "",
        uniqueValueProposition: book.uniqueValueProposition || "",
      });
      setSelectedDate(book.fechaPublicacion ? new Date(book.fechaPublicacion) : undefined);
      setSelectedLaunchDate(book.fechaLanzamiento ? new Date(book.fechaLanzamiento) : undefined);
    }
  }, [book, formMethods]);

  // Update parent component when form data changes, with debouncing to prevent infinite loops
  useEffect(() => {
    if (isEditing && onUpdateBook) {
      // Create a filtered watch that ignores descripcion and descripcionHtml fields to prevent recursive updates
      const watchedFields = [
        'titulo', 'subtitulo', 'autor', 'estado', 'contenido', 'bsr', 
        'landingPageUrl', 'contenidoAPlus', 'contenidoAPlusFiles',
        'investigacionId', 'proyectoId', 'targetAge', 'targetGender', 
        'targetInterests', 'marketPosition', 'competitorBooks', 
        'uniqueValueProposition'
      ];
      
      // Create a more selective subscription to avoid the circular updates with descripcion fields
      const subscription = formMethods.watch((formData, { name, type }) => {
        // Skip if the change is coming from descripcion or descripcionHtml to prevent circular updates
        if (name === 'descripcion' || name === 'descripcionHtml') {
          return;
        }
        
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
  }, [formMethods, isEditing, onUpdateBook, selectedDate, selectedLaunchDate]);

  // Handle date change
  const handleDateChange = (field: 'fechaPublicacion' | 'fechaLanzamiento', date: Date | undefined) => {
    if (field === 'fechaPublicacion') {
      setSelectedDate(date);
    } else if (field === 'fechaLanzamiento') {
      setSelectedLaunchDate(date);
    }
  };

  return {
    form: {
      ...formMethods,
      selectedDate,
      selectedLaunchDate,
      handleDateChange
    }
  };
};
