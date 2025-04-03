
/**
 * Utility functions for data manipulation in the application
 */

/**
 * Sorts an array of objects by a property
 * @param array The array to sort
 * @param property The property to sort by
 * @param direction The sort direction (asc or desc)
 * @returns The sorted array
 */
export function sortObjectsByProperty<T>(
  array: T[],
  property: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];
    
    // Handle string comparison
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return direction === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    
    // Handle date comparison
    if (valueA instanceof Date && valueB instanceof Date) {
      return direction === 'asc'
        ? valueA.getTime() - valueB.getTime()
        : valueB.getTime() - valueA.getTime();
    }
    
    // Handle number comparison
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    // Fall back to stringify comparison
    const strA = String(valueA);
    const strB = String(valueB);
    
    return direction === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
  });
}

/**
 * Filters an array of objects by a search query across multiple properties
 * @param array The array to filter
 * @param searchQuery The search query
 * @param properties The properties to search in
 * @returns The filtered array
 */
export function filterObjectsBySearchQuery<T>(
  array: T[],
  searchQuery: string,
  properties: (keyof T)[]
): T[] {
  if (!searchQuery.trim()) return array;
  
  const normalizedQuery = searchQuery.toLowerCase().trim();
  
  return array.filter(item => {
    return properties.some(property => {
      const value = item[property];
      if (value === null || value === undefined) return false;
      
      return String(value).toLowerCase().includes(normalizedQuery);
    });
  });
}

/**
 * Groups an array of objects by a property
 * @param array The array to group
 * @param property The property to group by
 * @returns An object with keys as the grouped property values and values as arrays of items
 */
export function groupObjectsByProperty<T>(
  array: T[],
  property: keyof T
): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const key = String(item[property]);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}
