
/**
 * Utility functions for date handling and formatting related to books
 */

/**
 * Format a date string to a human-readable format
 * @param date The date string to format
 * @returns Formatted date string in the Spanish locale
 */
export const formatDate = (date: string | null): string => {
  if (!date) return "No disponible";
  
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};
