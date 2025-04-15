
import { supabase } from './client';
import { toast } from '@/hooks/use-toast';
import { canConnectToSupabase } from './client';

// Generic functions for CRUD operations
export const supabaseCore = {
  // Generic function to get data from any table with optional query parameters
  getData: async <T>(tableName: string, queryParams?: any): Promise<T[]> => {
    try {
      // Check if we can connect to Supabase
      if (!canConnectToSupabase()) {
        console.log(`Using mock data for ${tableName} (Supabase not configured)`);
        throw new Error("Supabase not configured");
      }
      
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
      // Return empty array instead of throwing to prevent UI breaks
      return [];
    }
  },
  
  // Get a single item by ID
  getById: async <T>(tableName: string, id: number | string): Promise<T | null> => {
    try {
      // Check if we can connect to Supabase
      if (!canConnectToSupabase()) {
        console.log(`Using mock data for ${tableName} ID ${id} (Supabase not configured)`);
        throw new Error("Supabase not configured");
      }
      
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
      return null;
    }
  },
  
  // Create a new item
  create: async <T>(tableName: string, data: any): Promise<T | null> => {
    try {
      // Check if we can connect to Supabase
      if (!canConnectToSupabase()) {
        console.log(`Using local storage for ${tableName} (Supabase not configured)`);
        throw new Error("Supabase not configured");
      }
      
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
      return null;
    }
  },
  
  // Update an existing item
  update: async <T>(tableName: string, id: number | string, data: any): Promise<T | null> => {
    try {
      // Check if we can connect to Supabase
      if (!canConnectToSupabase()) {
        console.log(`Using local storage for ${tableName} (Supabase not configured)`);
        throw new Error("Supabase not configured");
      }
      
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
      return null;
    }
  },
  
  // Delete an item
  delete: async (tableName: string, id: number | string): Promise<boolean> => {
    try {
      // Check if we can connect to Supabase
      if (!canConnectToSupabase()) {
        console.log(`Using local storage for ${tableName} (Supabase not configured)`);
        throw new Error("Supabase not configured");
      }
      
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
      return false;
    }
  }
};
