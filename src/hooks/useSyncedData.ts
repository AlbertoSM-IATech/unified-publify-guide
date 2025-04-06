
import { useState, useEffect } from 'react';

/**
 * Custom hook for syncing data across components
 * @param initialData The initial data
 * @param syncKey A unique identifier for this data sync
 * @returns The data and a function to update it
 */
export function useSyncedData<T>(initialData: T, syncKey: string): [T, (newData: T) => void] {
  const [data, setData] = useState<T>(initialData);
  
  // On mount, check if there's stored data to sync with
  useEffect(() => {
    const storedData = localStorage.getItem(`publify_sync_${syncKey}`);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } catch (error) {
        console.error('Error parsing synced data:', error);
      }
    }
  }, [syncKey]);
  
  const updateData = (newData: T) => {
    setData(newData);
    // Store in localStorage for other components to access
    localStorage.setItem(`publify_sync_${syncKey}`, JSON.stringify(newData));
    
    // Also dispatch a custom event to notify other components
    const syncEvent = new CustomEvent('publify_data_sync', { 
      detail: { key: syncKey, data: newData } 
    });
    window.dispatchEvent(syncEvent);
  };
  
  // Listen for sync events from other components
  useEffect(() => {
    const handleSyncEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.key === syncKey) {
        setData(customEvent.detail.data);
      }
    };
    
    window.addEventListener('publify_data_sync', handleSyncEvent);
    
    return () => {
      window.removeEventListener('publify_data_sync', handleSyncEvent);
    };
  }, [syncKey]);
  
  return [data, updateData];
}
