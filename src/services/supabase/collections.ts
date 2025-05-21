
import { Collection } from "@/pages/Biblioteca/Colecciones/types/collectionTypes";
import { supabaseCore } from "./core";
import { coleccionesSimuladas } from "@/pages/Biblioteca/Libros/utils/mockData/coleccionesData";
import { toast } from "@/hooks/use-toast";

export const collectionsService = {
  getAll: async (): Promise<Collection[]> => {
    console.log("[MOCK] Getting all series from localStorage");
    
    // Return from localStorage if available
    const storedCollections = localStorage.getItem('coleccionesData');
    if (storedCollections) {
      return JSON.parse(storedCollections);
    }
    
    // Mock data as a fallback
    console.log("[MOCK] No series in localStorage, using mock data");
    localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
    return coleccionesSimuladas;
  },
  
  getById: async (id: number): Promise<Collection | null> => {
    console.log(`[MOCK] Getting serie with ID ${id} from localStorage`);
    
    // Return from localStorage if available
    const storedCollections = localStorage.getItem('coleccionesData');
    if (storedCollections) {
      const collections = JSON.parse(storedCollections) as Collection[];
      return collections.find(collection => collection.id === id) || null;
    }
    
    // Mock data as a fallback
    console.log("[MOCK] No series in localStorage, using mock data");
    localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
    return coleccionesSimuladas.find(collection => collection.id === id) || null;
  },
  
  create: async (collection: Omit<Collection, 'id'>): Promise<Collection | null> => {
    console.log("[MOCK] Creating new serie in localStorage");
    
    // Use localStorage
    const storedCollections = localStorage.getItem('coleccionesData');
    let collections: Collection[] = [];
    
    if (storedCollections) {
      collections = JSON.parse(storedCollections);
    } else {
      collections = [...coleccionesSimuladas];
    }
    
    // Generate a new ID
    const newId = Math.max(0, ...collections.map(c => c.id)) + 1;
    const newCollection = { ...collection, id: newId } as Collection;
    
    // Add to collections array
    collections.push(newCollection);
    
    // Save to localStorage
    localStorage.setItem('coleccionesData', JSON.stringify(collections));
    
    // Notify with toast
    toast({
      title: "Serie creada",
      description: "La serie ha sido creada exitosamente",
    });
    
    return newCollection;
  },
  
  update: async (id: number, data: any): Promise<Collection | null> => {
    console.log(`[MOCK] Updating serie with ID ${id} in localStorage`);
    
    // Use localStorage
    const storedCollections = localStorage.getItem('coleccionesData');
    if (storedCollections) {
      const collections = JSON.parse(storedCollections) as Collection[];
      const index = collections.findIndex(collection => collection.id === id);
      
      if (index !== -1) {
        // Update the collection
        const updatedCollection = { ...collections[index], ...data };
        collections[index] = updatedCollection;
        
        // Save to localStorage
        localStorage.setItem('coleccionesData', JSON.stringify(collections));
        
        // Notify with toast
        toast({
          title: "Serie actualizada",
          description: "La serie ha sido actualizada exitosamente",
        });
        
        return updatedCollection;
      }
    }
    return null;
  },
  
  delete: async (id: number): Promise<boolean> => {
    console.log(`[MOCK] Deleting serie with ID ${id} from localStorage`);
    
    // Use localStorage
    const storedCollections = localStorage.getItem('coleccionesData');
    if (storedCollections) {
      const collections = JSON.parse(storedCollections) as Collection[];
      const filteredCollections = collections.filter(collection => collection.id !== id);
      
      // Save to localStorage
      localStorage.setItem('coleccionesData', JSON.stringify(filteredCollections));
      
      // Notify with toast
      toast({
        title: "Serie eliminada",
        description: "La serie ha sido eliminada exitosamente",
      });
      
      return true;
    }
    return false;
  },
  
  addBook: async (collectionId: number, bookId: number): Promise<boolean> => {
    console.log(`[MOCK] Adding book ${bookId} to serie ${collectionId} in localStorage`);
    
    // Use localStorage
    const storedCollections = localStorage.getItem('coleccionesData');
    if (storedCollections) {
      const collections = JSON.parse(storedCollections) as Collection[];
      const collectionIndex = collections.findIndex(c => c.id === collectionId);
      
      if (collectionIndex !== -1) {
        // Add book to collection if it doesn't exist
        if (!collections[collectionIndex].libros.includes(bookId)) {
          collections[collectionIndex].libros.push(bookId);
          collections[collectionIndex].cantidadLibros = collections[collectionIndex].libros.length;
          
          // Save to localStorage
          localStorage.setItem('coleccionesData', JSON.stringify(collections));
          
          // Notify with toast
          toast({
            title: "Libro agregado",
            description: "El libro ha sido añadido a la serie exitosamente",
          });
          
          return true;
        }
      }
    }
    return false;
  },
  
  removeBook: async (collectionId: number, bookId: number): Promise<boolean> => {
    console.log(`[MOCK] Removing book ${bookId} from serie ${collectionId} in localStorage`);
    
    // Use localStorage
    const storedCollections = localStorage.getItem('coleccionesData');
    if (storedCollections) {
      const collections = JSON.parse(storedCollections) as Collection[];
      const collectionIndex = collections.findIndex(c => c.id === collectionId);
      
      if (collectionIndex !== -1) {
        // Remove book from collection
        collections[collectionIndex].libros = collections[collectionIndex].libros.filter(id => id !== bookId);
        collections[collectionIndex].cantidadLibros = collections[collectionIndex].libros.length;
        
        // Save to localStorage
        localStorage.setItem('coleccionesData', JSON.stringify(collections));
        
        // Notify with toast
        toast({
          title: "Libro removido",
          description: "El libro ha sido removido de la serie exitosamente",
        });
        
        return true;
      }
    }
    return false;
  }
};

