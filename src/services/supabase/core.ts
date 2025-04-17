
// Mock implementation that doesn't attempt to connect to Supabase
export const supabaseCore = {
  // Generic function to get data from localStorage
  getData: async <T>(tableName: string, _queryParams?: any): Promise<T[]> => {
    try {
      console.log(`[MOCK] Fetching data from ${tableName} from localStorage`);
      
      // Get data from localStorage based on table name
      const localKey = `publify_sync_${tableName}Data`;
      const storedData = localStorage.getItem(localKey);
      
      if (storedData) {
        return JSON.parse(storedData) as T[];
      }
      
      console.log(`No data found in localStorage for ${tableName}, returning empty array`);
      return [];
    } catch (error) {
      console.error(`[MOCK] Error in getData(${tableName}):`, error);
      return [];
    }
  },
  
  // Get a single item by ID from localStorage
  getById: async <T>(tableName: string, id: number | string): Promise<T | null> => {
    try {
      console.log(`[MOCK] Fetching ${tableName} with ID ${id} from localStorage`);
      
      // Get data from localStorage based on table name
      const localKey = `publify_sync_${tableName}Data`;
      const storedData = localStorage.getItem(localKey);
      
      if (storedData) {
        const items = JSON.parse(storedData) as any[];
        return items.find(item => item.id === id) as T || null;
      }
      
      console.log(`No data found in localStorage for ${tableName}`);
      return null;
    } catch (error) {
      console.error(`[MOCK] Error in getById(${tableName}, ${id}):`, error);
      return null;
    }
  },
  
  // Create a new item in localStorage
  create: async <T>(tableName: string, data: any): Promise<T | null> => {
    try {
      console.log(`[MOCK] Creating new record in ${tableName}`, data);
      
      // Get existing data
      const localKey = `publify_sync_${tableName}Data`;
      const storedData = localStorage.getItem(localKey);
      const items = storedData ? JSON.parse(storedData) : [];
      
      // Generate a new ID
      const newId = Math.max(0, ...items.map((item: any) => item.id)) + 1;
      const newItem = { ...data, id: newId };
      
      // Add new item
      items.push(newItem);
      
      // Save back to localStorage
      localStorage.setItem(localKey, JSON.stringify(items));
      
      // Also dispatch a sync event
      const syncEvent = new CustomEvent('publify_data_sync', { 
        detail: { key: `${tableName}Data`, data: items } 
      });
      window.dispatchEvent(syncEvent);
      
      console.log(`[MOCK] Created new ${tableName} record with ID ${newId}`);
      return newItem as T;
    } catch (error) {
      console.error(`[MOCK] Error in create(${tableName}):`, error);
      return null;
    }
  },
  
  // Update an existing item in localStorage
  update: async <T>(tableName: string, id: number | string, data: any): Promise<T | null> => {
    try {
      console.log(`[MOCK] Updating record ${id} in ${tableName}`, data);
      
      // Get existing data
      const localKey = `publify_sync_${tableName}Data`;
      const storedData = localStorage.getItem(localKey);
      
      if (!storedData) {
        console.log(`No data found in localStorage for ${tableName}`);
        return null;
      }
      
      const items = JSON.parse(storedData);
      const index = items.findIndex((item: any) => item.id === id);
      
      if (index === -1) {
        console.log(`Item with ID ${id} not found in ${tableName}`);
        return null;
      }
      
      // Update the item
      const updatedItem = { ...items[index], ...data };
      items[index] = updatedItem;
      
      // Save back to localStorage
      localStorage.setItem(localKey, JSON.stringify(items));
      
      // Also dispatch a sync event
      const syncEvent = new CustomEvent('publify_data_sync', { 
        detail: { key: `${tableName}Data`, data: items } 
      });
      window.dispatchEvent(syncEvent);
      
      console.log(`[MOCK] Updated ${tableName} record with ID ${id}`);
      return updatedItem as T;
    } catch (error) {
      console.error(`[MOCK] Error in update(${tableName}, ${id}):`, error);
      return null;
    }
  },
  
  // Delete an item from localStorage
  delete: async (tableName: string, id: number | string): Promise<boolean> => {
    try {
      console.log(`[MOCK] Deleting record ${id} from ${tableName}`);
      
      // Get existing data
      const localKey = `publify_sync_${tableName}Data`;
      const storedData = localStorage.getItem(localKey);
      
      if (!storedData) {
        console.log(`No data found in localStorage for ${tableName}`);
        return false;
      }
      
      const items = JSON.parse(storedData);
      const filteredItems = items.filter((item: any) => item.id !== id);
      
      // Save back to localStorage
      localStorage.setItem(localKey, JSON.stringify(filteredItems));
      
      // Also dispatch a sync event
      const syncEvent = new CustomEvent('publify_data_sync', { 
        detail: { key: `${tableName}Data`, data: filteredItems } 
      });
      window.dispatchEvent(syncEvent);
      
      console.log(`[MOCK] Deleted ${tableName} record with ID ${id}`);
      return true;
    } catch (error) {
      console.error(`[MOCK] Error in delete(${tableName}, ${id}):`, error);
      return false;
    }
  }
};
