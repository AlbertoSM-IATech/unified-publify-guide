
import { useState, useEffect, useCallback } from "react";
import { Collection } from "../types/collectionTypes";
import { supabaseService } from "@/services/supabase";
import { coleccionesSimuladas } from "../utils/collectionsUtils";
import { useSyncedData } from "@/hooks/useSyncedData";
import { toast } from "@/hooks/use-toast";

export const useCollections = () => {
  const [colecciones, setColecciones] = useSyncedData<Collection[]>([] as Collection[], "coleccionesData");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Load collections - now as a callback to avoid dependency issues
  const loadCollections = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    
    try {
      // For now, use mock data to avoid potential API call issues
      console.log("Loading collections from mock data");
      setColecciones(coleccionesSimuladas);
      
      // Save mock data to localStorage for persistence
      localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
    } catch (error) {
      console.error("Error loading collections:", error);
      setLoadError("No se pudieron cargar las colecciones. Usando datos locales.");
      
      // Fallback to mock data
      setColecciones(coleccionesSimuladas);
      localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
    } finally {
      setIsLoading(false);
    }
  }, [setColecciones]);

  // Load collections on component mount, now using the callback
  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

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
      // Create new collection locally
      const newId = Math.max(...colecciones.map(col => col.id), 0) + 1;
      const newCol: Collection = {
        id: newId,
        nombre: newCollection.nombre,
        descripcion: newCollection.descripcion,
        cantidadLibros: 0,
        fechaCreacion: new Date().toISOString().split('T')[0],
        libros: []
      };
      
      // Update local state first
      const updatedCollections = [...colecciones, newCol];
      setColecciones(updatedCollections);
      
      // Update localStorage for persistence
      localStorage.setItem('coleccionesData', JSON.stringify(updatedCollections));

      // Try to create in Supabase (but don't wait for it)
      supabaseService.collections.create(newCol)
        .then(createdCollection => {
          if (createdCollection) {
            console.log("Collection created in Supabase:", createdCollection);
          }
        })
        .catch(error => {
          console.error("Error creating collection in Supabase:", error);
        });

      toast({
        title: "Colección creada",
        description: `La colección "${newCol.nombre}" ha sido creada con éxito.`
      });
      
      return true;
    } catch (error) {
      console.error("Error creating collection:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la colección. Inténtalo de nuevo.",
        variant: "destructive"
      });
      return false;
    }
  };

  const handleRetryLoading = () => {
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
