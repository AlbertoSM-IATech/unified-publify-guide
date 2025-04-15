
import { Collection } from "@/pages/Biblioteca/Colecciones/types/collectionTypes";
import { supabaseCore } from "./core";
import { supabase } from "./client";
import { canConnectToSupabase } from "./client";

export const collectionsService = {
  getAll: async () => {
    return supabaseCore.getData('colecciones');
  },
  
  getById: async (id: number) => {
    return supabaseCore.getById('colecciones', id);
  },
  
  create: async (collection: any) => {
    return supabaseCore.create('colecciones', collection);
  },
  
  update: async (id: number, data: any) => {
    return supabaseCore.update('colecciones', id, data);
  },
  
  delete: async (id: number) => {
    return supabaseCore.delete('colecciones', id);
  },
  
  // Add or remove a book from a collection
  addBook: async (collectionId: number, bookId: number) => {
    return supabaseCore.create('coleccion_libros', { 
      coleccion_id: collectionId, 
      libro_id: bookId 
    });
  },
  
  removeBook: async (collectionId: number, bookId: number) => {
    const { error } = await supabase
      .from('coleccion_libros')
      .delete()
      .match({ 
        coleccion_id: collectionId, 
        libro_id: bookId 
      });
      
    if (error) {
      console.error('Error removing book from collection:', error);
      return false;
    }
    
    return true;
  }
};
