
/**
 * Format and styling utilities for book-related display
 */

/**
 * Get color class based on book status
 */
export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Publicado":
      return "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400";
    case "Borrador":
      return "bg-amber-100 text-amber-800 dark:bg-amber-800/30 dark:text-amber-400";
    case "En revisión":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400";
    case "Archivado":
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-400";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-400";
  }
};

/**
 * Get color class based on content type
 */
export const getContentColor = (content: string): string => {
  switch (content) {
    case "Ficción":
      return "bg-purple-100 text-purple-800 dark:bg-purple-800/30 dark:text-purple-400";
    case "No ficción":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-400";
    case "Académico":
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-400";
    case "Infantil":
      return "bg-pink-100 text-pink-800 dark:bg-pink-800/30 dark:text-pink-400";
    default:
      return "bg-slate-100 text-slate-800 dark:bg-slate-800/30 dark:text-slate-400";
  }
};

/**
 * Get hex color for content type (useful for styling)
 */
export const getContentHexColor = (content: string): string => {
  switch (content) {
    case "Ficción":
      return "#9333EA";
    case "No ficción":
      return "#3B82F6";
    case "Académico":
      return "#64748B";
    case "Infantil":
      return "#EC4899";
    default:
      return "#64748B";
  }
};

/**
 * Format decimal values for display with comma as separator
 * Accepts both string and number inputs
 */
export const formatDecimal = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null) {
    return "0,00";
  }
  
  // If it's a string with a comma already, just return it
  if (typeof value === 'string' && value.includes(',')) {
    // Check if it ends with 2 decimals, if not, add them
    const parts = value.split(',');
    if (parts[1]?.length === 1) {
      return `${parts[0]},${parts[1]}0`;
    }
    if (!parts[1]) {
      return `${parts[0]},00`;
    }
    return value;
  }
  
  // Convert to number to ensure proper formatting
  const numValue = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
  return numValue.toFixed(2).replace('.', ',');
};

/**
 * Parse input value to number, handling both comma and dot as decimal separators
 */
export const parseDecimalInput = (value: string): number => {
  // Replace comma with dot for calculation
  const normalized = value.replace(',', '.');
  return parseFloat(normalized) || 0;
};
