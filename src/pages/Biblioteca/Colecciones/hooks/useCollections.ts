
import { useState, useEffect, useCallback } from "react";
import { Collection } from "../types/collectionTypes";
import { coleccionesSimuladas } from "@/pages/Biblioteca/Libros/utils/mockData/coleccionesData";
import { useSyncedData } from "@/hooks/useSyncedData";
import { toast } from "@/hooks/use-toast";
import { Book } from "@/pages/Biblioteca/Libros/types/bookTypes";

export const useCollections = () => {
  const [colecciones, setColecciones] = useSyncedData<Collection[]>([] as Collection[], "coleccionesData");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load collections - now with safeguards against multiple loads
  const loadCollections = useCallback(async () => {
    if (!isLoading) return; // Prevent multiple loads
    
    try {
      // Check localStorage first for previously saved collections
      const storedCollections = localStorage.getItem('coleccionesData');
      if (storedCollections) {
        console.log("[MOCK] Collections loaded from localStorage once");
        setColecciones(JSON.parse(storedCollections));
      } else {
        console.log("[MOCK] No collections found in localStorage, using mock data");
        setColecciones(coleccionesSimuladas);
        // Save mock data to localStorage for persistence
        localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
      }
    } catch (error) {
      console.error("[MOCK] Error loading collections:", error);
      setLoadError("No se pudieron cargar las colecciones. Usando datos locales.");
      
      // Fallback to mock data
      setColecciones(coleccionesSimuladas);
      localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
    } finally {
      setIsLoading(false); // Set loading to false regardless of outcome
    }
  }, [isLoading, setColecciones]);

  // Load collections on component mount
  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  const createCollection = async (newCollection: { 
    nombre: string; 
    descripcion: string;
    libros?: number[]; 
  }) => {
    // Validar campos requeridos
    if (!newCollection.nombre) {
      toast({
        title: "Campo requerido",
        description: "Por favor introduce un nombre para la colección.",
        variant: "destructive"
      });
      return false;
    }

    try {
      // Create new collection locally
      const newId = Math.max(0, ...colecciones.map(col => col.id)) + 1;
      const newCol: Collection = {
        id: newId,
        nombre: newCollection.nombre,
        descripcion: newCollection.descripcion,
        cantidadLibros: newCollection.libros?.length || 0,
        fechaCreacion: new Date().toISOString().split('T')[0],
        libros: newCollection.libros || [],
        estado: "Activa"
      };
      
      // Update local state first
      const updatedCollections = [...colecciones, newCol];
      setColecciones(updatedCollections);
      
      // Update localStorage for persistence
      localStorage.setItem('coleccionesData', JSON.stringify(updatedCollections));

      // Update books to reference this collection
      if (newCollection.libros && newCollection.libros.length > 0) {
        // Get books from localStorage
        const booksData = localStorage.getItem('librosData');
        if (booksData) {
          const books = JSON.parse(booksData);
          const updatedBooks = books.map((book: Book) => {
            if (newCollection.libros?.includes(book.id)) {
              // Add this collection to the book's collections
              const coleccionesIds = book.coleccionesIds || [];
              if (!coleccionesIds.includes(newId)) {
                return {
                  ...book,
                  coleccionesIds: [...coleccionesIds, newId]
                };
              }
            }
            return book;
          });
          localStorage.setItem('librosData', JSON.stringify(updatedBooks));
          
          // Dispatch event to notify book data has changed
          const updateEvent = new CustomEvent('publify_books_updated');
          window.dispatchEvent(updateEvent);
        }
      }

      toast({
        title: "Colección creada",
        description: `La colección "${newCol.nombre}" ha sido creada con éxito.`
      });
      
      return true;
    } catch (error) {
      console.error("[MOCK] Error creating collection:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la colección. Inténtalo de nuevo.",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleRetryLoading = () => {
    setIsLoading(true); // Set loading to true to trigger loadCollections
    loadCollections();
  };

  return {
    colecciones,
    isLoading,
    loadError,
    createCollection,
    handleRetryLoading
  };
};
