
/**
 * Utility functions for generating and managing links related to books
 */

/**
 * Generate an Amazon product link from an ASIN
 * @param asin The Amazon Standard Identification Number
 * @returns URL to the Amazon product page, or an empty string if no ASIN provided
 */
export const generateAmazonLink = (asin?: string): string => {
  if (!asin) return "";
  
  return `https://amazon.com/dp/${asin}`;
};
