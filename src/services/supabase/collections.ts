
import { Collection } from "@/pages/Biblioteca/Colecciones/types/collectionTypes";
import { supabaseCore } from "./core";
import { coleccionesSimuladas } from "@/pages/Biblioteca/Libros/utils/mockData/coleccionesData";
import { toast } from "@/hooks/use-toast";

export const collectionsService = {
  getAll: async (): Promise<Collection[]> => {
    console.log("[MOCK] Getting all collections from localStorage");
    
    // Return from localStorage if available
    const storedCollections = localStorage.getItem('coleccionesData');
    if (storedCollections) {
      return JSON.parse(storedCollections);
    }
    
    // Mock data as a fallback
    console.log("[MOCK] No collections in localStorage, using mock data");
    localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
    return coleccionesSimuladas;
  },
  
  getById: async (id: number): Promise<Collection | null> => {
    console.log(`[MOCK] Getting collection with ID ${id} from localStorage`);
    
    // Return from localStorage if available
    const storedCollections = localStorage.getItem('coleccionesData');
    if (storedCollections) {
      const collections = JSON.parse(storedCollections) as Collection[];
      return collections.find(collection => collection.id === id) || null;
    }
    
    // Mock data as a fallback
    console.log("[MOCK] No collections in localStorage, using mock data");
    localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
    return coleccionesSimuladas.find(collection => collection.id === id) || null;
  },
  
  create: async (collection: Omit<Collection, 'id'>): Promise<Collection | null> => {
    console.log("[MOCK] Creating new collection in localStorage");
    
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
      title: "Colección creada",
      description: "La colección ha sido creada exitosamente",
    });
    
    return newCollection;
  },
  
  update: async (id: number, data: any): Promise<Collection | null> => {
    console.log(`[MOCK] Updating collection with ID ${id} in localStorage`);
    
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
          title: "Colección actualizada",
          description: "La colección ha sido actualizada exitosamente",
        });
        
        return updatedCollection;
      }
    }
    return null;
  },
  
  delete: async (id: number): Promise<boolean> => {
    console.log(`[MOCK] Deleting collection with ID ${id} from localStorage`);
    
    // Use localStorage
    const storedCollections = localStorage.getItem('coleccionesData');
    if (storedCollections) {
      const collections = JSON.parse(storedCollections) as Collection[];
      const filteredCollections = collections.filter(collection => collection.id !== id);
      
      // Save to localStorage
      localStorage.setItem('coleccionesData', JSON.stringify(filteredCollections));
      
      // Notify with toast
      toast({
        title: "Colección eliminada",
        description: "La colección ha sido eliminada exitosamente",
      });
      
      return true;
    }
    return false;
  },
  
  addBook: async (collectionId: number, bookId: number): Promise<boolean> => {
    console.log(`[MOCK] Adding book ${bookId} to collection ${collectionId} in localStorage`);
    
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
            description: "El libro ha sido añadido a la colección exitosamente",
          });
          
          return true;
        }
      }
    }
    return false;
  },
  
  removeBook: async (collectionId: number, bookId: number): Promise<boolean> => {
    console.log(`[MOCK] Removing book ${bookId} from collection ${collectionId} in localStorage`);
    
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
          description: "El libro ha sido removido de la colección exitosamente",
        });
        
        return true;
      }
    }
    return false;
  }
};
