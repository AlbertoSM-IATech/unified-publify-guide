
import { useState, useEffect } from "react";
import { Collection } from "../types/collectionTypes";
import { supabaseService } from "@/services/supabase"; // This import will work with our new structure
import { coleccionesSimuladas } from "../utils/collectionsUtils";
import { useSyncedData } from "@/hooks/useSyncedData";
import { toast } from "@/hooks/use-toast";

export const useCollections = () => {
  const [colecciones, setColecciones] = useSyncedData<Collection[]>([] as Collection[], "coleccionesData");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load collections
  useEffect(() => {
    loadCollections();
  }, [setColecciones]);

  const loadCollections = async () => {
    setIsLoading(true);
    setLoadError(null);
    
    try {
      // Try to fetch from Supabase
      const supabaseCollections = await supabaseService.collections.getAll();
      
      // If we get collections from Supabase, use them
      if (supabaseCollections && supabaseCollections.length > 0) {
        console.log("Collections loaded from Supabase:", supabaseCollections);
        setColecciones(supabaseCollections as Collection[]);
      } else {
        console.log("No collections found in Supabase, using mock data");
        // Check localStorage first
        const storedCollections = localStorage.getItem('coleccionesData');
        if (storedCollections) {
          setColecciones(JSON.parse(storedCollections) as Collection[]);
        } else {
          setColecciones(coleccionesSimuladas);
          // Save mock data to localStorage for persistence
          localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
        }
      }
    } catch (error) {
      console.error("Error loading collections:", error);
      setLoadError("No se pudieron cargar las colecciones. Usando datos locales.");
      
      // Fallback to localStorage and then to mock data
      const storedCollections = localStorage.getItem('coleccionesData');
      if (storedCollections) {
        setColecciones(JSON.parse(storedCollections) as Collection[]);
      } else {
        setColecciones(coleccionesSimuladas);
        localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const createCollection = async (newCollection: { nombre: string; descripcion: string }) => {
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
      // Create new collection
      const newId = Math.max(...colecciones.map(col => col.id), 0) + 1;
      const newCol: Collection = {
        id: newId,
        nombre: newCollection.nombre,
        descripcion: newCollection.descripcion,
        cantidadLibros: 0,
        fechaCreacion: new Date().toISOString().split('T')[0],
        libros: []
      };

      // Try to create in Supabase
      const createdCollection = await supabaseService.collections.create(newCol);
      
      let collectionToAdd = newCol;
      if (createdCollection) {
        console.log("Collection created in Supabase:", createdCollection);
        collectionToAdd = createdCollection as Collection;
      }
      
      // Update local state
      const updatedCollections = [...colecciones, collectionToAdd];
      setColecciones(updatedCollections);
      
      // Update localStorage for persistence
      localStorage.setItem('coleccionesData', JSON.stringify(updatedCollections));

      toast({
        title: "Colección creada",
        description: `La colección "${newCol.nombre}" ha sido creada con éxito.`
      });
      
      return true;
    } catch (error) {
      console.error("Error creating collection:", error);
      // Create locally if Supabase fails
      const newId = Math.max(...colecciones.map(col => col.id), 0) + 1;
      const newCol: Collection = {
        id: newId,
        nombre: newCollection.nombre,
        descripcion: newCollection.descripcion,
        cantidadLibros: 0,
        fechaCreacion: new Date().toISOString().split('T')[0],
        libros: []
      };
      
      // Update local state
      const updatedCollections = [...colecciones, newCol];
      setColecciones(updatedCollections);
      
      // Update localStorage for persistence
      localStorage.setItem('coleccionesData', JSON.stringify(updatedCollections));

      toast({
        title: "Colección creada (modo local)",
        description: `La colección "${newCol.nombre}" ha sido creada localmente.`
      });
      
      return true;
    }
  };

  const handleRetryLoading = () => {
    setLoadError(null);
    setIsLoading(true);
    // Use setTimeout to avoid infinite loop if error persists
    setTimeout(() => {
      // Set collections directly from mock data
      setColecciones(coleccionesSimuladas);
      // Save mock data to localStorage for persistence
      localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
      setIsLoading(false);
    }, 500);
  };

  return {
    colecciones,
    isLoading,
    loadError,
    createCollection,
    handleRetryLoading
  };
};
