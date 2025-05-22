
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
      // Solo actualiza selectedDate/selectedLaunchDate si los valores de book son diferentes
      // para evitar un bucle si la fecha en book ya está sincronizada con selectedDate.
      const bookPublicationDate = book.fechaPublicacion ? new Date(book.fechaPublicacion).getTime() : undefined;
      const currentSelectedDate = selectedDate ? selectedDate.getTime() : undefined;
      if (bookPublicationDate !== currentSelectedDate) {
        setSelectedDate(book.fechaPublicacion ? new Date(book.fechaPublicacion) : undefined);
      }

      const bookLaunchDate = book.fechaLanzamiento ? new Date(book.fechaLanzamiento).getTime() : undefined;
      const currentSelectedLaunchDate = selectedLaunchDate ? selectedLaunchDate.getTime() : undefined;
      if (bookLaunchDate !== currentSelectedLaunchDate) {
        setSelectedLaunchDate(book.fechaLanzamiento ? new Date(book.fechaLanzamiento) : undefined);
      }
    }
  }, [book, formMethods]); // selectedDate y selectedLaunchDate se quitan de aquí para evitar bucles si son la fuente del cambio de `book`

  // useEffect para actualizar el componente padre cuando los campos del formulario (distintos de fechas directas) cambian
  useEffect(() => {
    if (isEditing && onUpdateBook) {
      const watchedFields = [
        'titulo', 'subtitulo', 'autor', 'estado', 'contenido', 'bsr', 
        'landingPageUrl', 'contenidoAPlus', 'contenidoAPlusFiles',
        'investigacionId', 'proyectoId', 'targetAge', 'targetGender', 
        'targetInterests', 'marketPosition', 'competitorBooks', 
        'uniqueValueProposition'
        // No incluir 'descripcion' ni 'descripcionHtml' aquí si se manejan de forma especial
      ];
      
      const subscription = formMethods.watch((formData, { name, type }) => {
        if (name === 'descripcion' || name === 'descripcionHtml') {
          return; // Evitar bucles con el editor de texto enriquecido
        }
        
        const processedFiles = formData.contenidoAPlusFiles?.map(file => ({
          id: file.id || Date.now(),
          name: file.name || "",
          type: file.type || "document"
        })) || [];
        
        const updatedData: Partial<Book> = {
          ...formData,
          // Las fechas se toman de los estados locales selectedDate/selectedLaunchDate
          // ya que no son campos directos de react-hook-form que se listen en watchedFields
          fechaPublicacion: selectedDate ? selectedDate.toISOString() : null,
          fechaLanzamiento: selectedLaunchDate ? selectedLaunchDate.toISOString() : null,
          investigacionId: formData.investigacionId !== "none" ? parseInt(formData.investigacionId as string) : undefined,
          proyectoId: formData.proyectoId !== "none" ? parseInt(formData.proyectoId as string) : undefined,
          bsr: formData.bsr ? Number(formData.bsr) : null,
          contenidoAPlusFiles: processedFiles
        };
        
        onUpdateBook(updatedData);
      });
      
      return () => subscription.unsubscribe();
    }
  // Este efecto necesita depender de selectedDate y selectedLaunchDate para que
  // el callback de watch use las fechas más recientes si un campo de texto cambia.
  }, [formMethods, isEditing, onUpdateBook, selectedDate, selectedLaunchDate]);

  // NUEVO: useEffect para actualizar el componente padre cuando SOLO las fechas cambian
  useEffect(() => {
    if (isEditing && onUpdateBook) {
      // Este efecto se dispara cuando selectedDate o selectedLaunchDate cambian.
      // Obtenemos los valores actuales de todos los campos del formulario.
      const currentFormValues = formMethods.getValues();
      
      const processedFiles = currentFormValues.contenidoAPlusFiles?.map(file => ({
          id: file.id || Date.now(),
          name: file.name || "",
          type: file.type || "document"
      })) || [];

      const updatedData: Partial<Book> = {
        ...currentFormValues,
        fechaPublicacion: selectedDate ? selectedDate.toISOString() : null,
        fechaLanzamiento: selectedLaunchDate ? selectedLaunchDate.toISOString() : null,
        // Asegurarse de que investigacionId y proyectoId se procesen correctamente
        investigacionId: currentFormValues.investigacionId !== "none" ? parseInt(currentFormValues.investigacionId as string) : undefined,
        proyectoId: currentFormValues.proyectoId !== "none" ? parseInt(currentFormValues.proyectoId as string) : undefined,
        bsr: currentFormValues.bsr ? Number(currentFormValues.bsr) : null,
        contenidoAPlusFiles: processedFiles
      };
      // console.log("Hook: Date change detected, calling onUpdateBook with:", updatedData);
      onUpdateBook(updatedData);
    }
  // Depender de formMethods.getValues() implícitamente a través de formMethods
  }, [selectedDate, selectedLaunchDate, isEditing, onUpdateBook, formMethods]);


  const handleDateChange = (field: 'fechaPublicacion' | 'fechaLanzamiento', date: Date | undefined) => {
    if (field === 'fechaPublicacion') {
      setSelectedDate(date);
    } else if (field === 'fechaLanzamiento') {
      setSelectedLaunchDate(date);
    }
    // La actualización al padre se maneja por el nuevo useEffect dedicado a selectedDate/selectedLaunchDate
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

