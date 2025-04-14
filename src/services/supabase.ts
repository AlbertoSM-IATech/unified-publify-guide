
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';
import { Book } from '@/pages/Biblioteca/Libros/types/bookTypes';

// This URL and key are placeholders that will be replaced with actual values when connected
// to Supabase through the Lovable Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-supabase-anon-key';

// Create the Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// Enhanced Supabase service with better error handling and data synchronization
export const supabaseService = {
  // Generic function to get data from any table with optional query parameters
  getData: async <T>(tableName: string, queryParams?: any): Promise<T[]> => {
    try {
      console.log(`Fetching data from ${tableName}`, queryParams);
      let query = supabase.from(tableName).select('*');
      
      // Add additional query parameters if provided
      if (queryParams?.filter) {
        Object.entries(queryParams.filter).forEach(([column, value]) => {
          query = query.filter(column, 'eq', value);
        });
      }
      
      if (queryParams?.orderBy) {
        query = query.order(queryParams.orderBy.column, { 
          ascending: queryParams.orderBy.ascending 
        });
      }
      
      if (queryParams?.limit) {
        query = query.limit(queryParams.limit);
      }
      
      const { data, error } = await query;
      
      if (error) {
        throw new Error(`Error fetching from ${tableName}: ${error.message}`);
      }
      
      return data as T[];
    } catch (error) {
      console.error(`Error in getData(${tableName}):`, error);
      toast({
        title: "Error al cargar datos",
        description: `No se pudieron cargar los datos de ${tableName}`,
        variant: "destructive",
      });
      // Return empty array instead of throwing to prevent UI breaks
      return [];
    }
  },
  
  // Get a single item by ID
  getById: async <T>(tableName: string, id: number | string): Promise<T | null> => {
    try {
      console.log(`Fetching ${tableName} with ID ${id}`);
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        // If not found, don't throw an error, just return null
        if (error.code === 'PGRST116') {
          return null;
        }
        throw new Error(`Error fetching ${tableName} by ID: ${error.message}`);
      }
      
      return data as T;
    } catch (error) {
      console.error(`Error in getById(${tableName}, ${id}):`, error);
      toast({
        title: "Error al cargar datos",
        description: `No se pudo cargar el elemento con ID ${id}`,
        variant: "destructive",
      });
      return null;
    }
  },
  
  // Create a new item
  create: async <T>(tableName: string, data: any): Promise<T | null> => {
    try {
      console.log(`Creating new record in ${tableName}`, data);
      const { data: createdData, error } = await supabase
        .from(tableName)
        .insert(data)
        .select()
        .single();
        
      if (error) {
        throw new Error(`Error creating record in ${tableName}: ${error.message}`);
      }
      
      toast({
        title: "Creado con éxito",
        description: `Se ha creado un nuevo registro en ${tableName}`,
      });
      
      return createdData as T;
    } catch (error) {
      console.error(`Error in create(${tableName}):`, error);
      toast({
        title: "Error al crear",
        description: `No se pudo crear el registro en ${tableName}`,
        variant: "destructive",
      });
      return null;
    }
  },
  
  // Update an existing item
  update: async <T>(tableName: string, id: number | string, data: any): Promise<T | null> => {
    try {
      console.log(`Updating record ${id} in ${tableName}`, data);
      const { data: updatedData, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        throw new Error(`Error updating record in ${tableName}: ${error.message}`);
      }
      
      toast({
        title: "Actualizado con éxito",
        description: `Se ha actualizado el registro en ${tableName}`,
      });
      
      return updatedData as T;
    } catch (error) {
      console.error(`Error in update(${tableName}, ${id}):`, error);
      toast({
        title: "Error al actualizar",
        description: `No se pudo actualizar el registro en ${tableName}`,
        variant: "destructive",
      });
      return null;
    }
  },
  
  // Delete an item
  delete: async (tableName: string, id: number | string): Promise<boolean> => {
    try {
      console.log(`Deleting record ${id} from ${tableName}`);
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
        
      if (error) {
        throw new Error(`Error deleting record from ${tableName}: ${error.message}`);
      }
      
      toast({
        title: "Eliminado con éxito",
        description: `Se ha eliminado el registro de ${tableName}`,
      });
      
      return true;
    } catch (error) {
      console.error(`Error in delete(${tableName}, ${id}):`, error);
      toast({
        title: "Error al eliminar",
        description: `No se pudo eliminar el registro de ${tableName}`,
        variant: "destructive",
      });
      return false;
    }
  },
  
  // Specific methods for books
  books: {
    getAll: async (): Promise<Book[]> => {
      return supabaseService.getData<Book>('libros');
    },
    
    getById: async (id: number): Promise<Book | null> => {
      return supabaseService.getById<Book>('libros', id);
    },
    
    create: async (book: Omit<Book, 'id'>): Promise<Book | null> => {
      return supabaseService.create<Book>('libros', book);
    },
    
    update: async (id: number, bookData: Partial<Book>): Promise<Book | null> => {
      return supabaseService.update<Book>('libros', id, bookData);
    },
    
    delete: async (id: number): Promise<boolean> => {
      return supabaseService.delete('libros', id);
    }
  },
  
  // Methods for user profile data
  profile: {
    get: async (userId: string) => {
      return supabaseService.getById('profiles', userId);
    },
    
    update: async (userId: string, data: any) => {
      return supabaseService.update('profiles', userId, data);
    },
    
    updateAvatar: async (userId: string, avatarUrl: string) => {
      return supabaseService.update('profiles', userId, { avatar_url: avatarUrl });
    }
  },
  
  // Methods for collections
  collections: {
    getAll: async () => {
      return supabaseService.getData('colecciones');
    },
    
    getById: async (id: number) => {
      return supabaseService.getById('colecciones', id);
    },
    
    create: async (collection: any) => {
      return supabaseService.create('colecciones', collection);
    },
    
    update: async (id: number, data: any) => {
      return supabaseService.update('colecciones', id, data);
    },
    
    delete: async (id: number) => {
      return supabaseService.delete('colecciones', id);
    },
    
    // Add or remove a book from a collection
    addBook: async (collectionId: number, bookId: number) => {
      return supabaseService.create('coleccion_libros', { 
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
  }
};
