
/**
 * Utility functions for formatting and checking book format data
 */

import { BookFormat } from "../../types/bookTypes";

/**
 * Check if a book format is available based on having a price
 * @param format The book format to check
 * @returns Boolean indicating if the format is available
 */
export const getFormatAvailability = (format?: BookFormat): boolean => {
  return !!format && !!format.price;
};
