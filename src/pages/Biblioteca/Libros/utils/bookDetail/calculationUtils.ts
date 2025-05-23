
/**
 * Utility functions for performing calculations related to book royalties and finances
 */

import { BookFormat } from "../../types/bookTypes";

/**
 * Calculate the net royalties for a book format
 * @param format The book format with pricing information
 * @returns The calculated net royalties as a string with 2 decimal places, or "0.00" if no valid format
 */
export const calculateNetRoyalties = (format?: BookFormat): string => {
  if (!format || !format.price) {
    return "0.00";
  }

  // Get values with fallbacks
  const price = format.price || 0;
  const royaltyPercentage = format.royaltyPercentage || 0;
  const printingCost = format.printingCost || 0;

  // Calculate royalty amount: price × royalty percentage
  const royaltyAmount = price * royaltyPercentage;
  
  // Calculate net royalty: royalty amount - printing cost
  const netRoyalty = royaltyAmount - printingCost;
  
  // Ensure we don't return negative values
  const finalRoyalty = Math.max(0, netRoyalty);

  // Format to 2 decimal places
  return finalRoyalty.toFixed(2);
};

/**
 * Calculate the gross revenue for a book format
 * @param format The book format with pricing information
 * @param salesCount Optional sales count (defaults to 1)
 * @returns The calculated gross revenue or 0 if no valid format
 */
export const calculateGrossRevenue = (format?: BookFormat, salesCount: number = 1): number => {
  if (!format || !format.price) {
    return 0;
  }

  return format.price * salesCount;
};

/**
 * Calculate profit margin as a percentage
 * @param format The book format with pricing and cost information
 * @returns Profit margin as a percentage or 0 if invalid data
 */
export const calculateProfitMargin = (format?: BookFormat): number => {
  if (!format || !format.price || !format.royaltyPercentage) {
    return 0;
  }

  const royaltyAmount = format.price * format.royaltyPercentage;
  const cost = format.printingCost || 0;
  
  if (format.price === 0) return 0;
  
  const margin = ((royaltyAmount - cost) / format.price) * 100;
  return Math.max(0, margin); // Ensure we don't return negative margins
};
