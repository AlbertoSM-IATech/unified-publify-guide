
// Utility functions for formatting and styling book-related UI elements
import { BookFormat } from "../types/bookTypes";

// Get status color class
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "publicado":
      return "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
    case "borrador":
      return "bg-indigo-100 text-indigo-800 border border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800";
    case "en revisión":
      return "bg-amber-100 text-amber-800 border border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800";
    case "archivado":
      return "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

// Get content color class
export const getContentColor = (content: string): string => {
  switch (content.toLowerCase()) {
    case "alto contenido":
      return "bg-blue-100 text-[#3B82F6] border border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
    case "medio contenido":
      return "bg-orange-100 text-[#FB923C] border border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800";
    case "bajo contenido":
      return "bg-emerald-100 text-[#10B981] border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
  }
};

// Get content hex color for text styling
export const getContentHexColor = (content: string): string => {
  switch (content.toLowerCase()) {
    case "alto contenido":
      return "#3B82F6"; // Blue
    case "medio contenido":
      return "#FB923C"; // Coral/Orange
    case "bajo contenido":
      return "#10B981"; // Green
    default:
      return "#64748b"; // Slate
  }
};

// Calculate net royalties (DEPRECATED: use the version in bookDetailUtils.ts instead)
export const calculateNetRoyalties = (format?: BookFormat): string => {
  if (!format || !format.price || !format.royaltyPercentage) {
    return "0.00";
  }
  
  // Price without VAT
  const price = parseFloat(format.price.toString());
  
  // Royalty calculation
  const royaltyPercentage = parseFloat(format.royaltyPercentage.toString());
  const royalties = price * royaltyPercentage;
  
  // Subtract printing cost if defined
  const netRoyalties = format.printingCost !== undefined ? 
    royalties - format.printingCost : 
    royalties;
  
  return netRoyalties.toFixed(2);
};
