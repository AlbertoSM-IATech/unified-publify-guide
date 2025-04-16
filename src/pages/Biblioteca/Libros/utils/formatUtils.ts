
// Utility functions for formatting and display styling
import { BookFormat } from "../types/bookTypes";
import { calculateNetRoyalties as calculateRoyaltiesFromDetailUtils } from "./bookDetail/calculationUtils";

/**
 * Get the CSS class for a book status badge background and text color
 * @param status The book status string
 * @returns CSS class string for the status badge
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case "publicado":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "en revisión":
    case "en revision":
      return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    case "borrador":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "archivado":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

/**
 * Get the CSS class for a content type badge background and text color
 * @param content The content type string
 * @returns CSS class string for the content badge
 */
export const getContentColor = (content: string): string => {
  switch (content.toLowerCase()) {
    case "ficción":
    case "ficcion":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case "no ficción":
    case "no ficcion":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "poesía":
    case "poesia":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300";
    case "infantil":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
};

/**
 * Get hex color code for a content type (useful for charts, etc.)
 * @param content The content type string
 * @returns Hex color code
 */
export const getContentHexColor = (content: string): string => {
  switch (content.toLowerCase()) {
    case "ficción":
    case "ficcion":
      return "#9333EA"; // Purple
    case "no ficción":
    case "no ficcion":
      return "#3B82F6"; // Blue
    case "poesía":
    case "poesia":
      return "#EC4899"; // Pink
    case "infantil":
      return "#FBBF24"; // Yellow
    default:
      return "#6B7280"; // Gray
  }
};

/**
 * Calculate net royalties for a book format
 * Uses the comprehensive calculation from bookDetailUtils.ts
 * 
 * @param format The book format with pricing information
 * @returns The calculated net royalties as a string with 2 decimal places
 */
export const calculateNetRoyalties = (format?: BookFormat): string => {
  // Use the more comprehensive calculation from bookDetailUtils
  return calculateRoyaltiesFromDetailUtils(format);
};
