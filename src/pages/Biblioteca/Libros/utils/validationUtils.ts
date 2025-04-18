
/**
 * Utility functions for form validation
 */

/**
 * Validates an Amazon Standard Identification Number (ASIN)
 * ASIN must be 10 characters, consisting of letters and numbers
 * @param asin The ASIN to validate
 * @returns True if valid, false otherwise
 */
export const isValidASIN = (asin: string): boolean => {
  if (!asin) return true; // Empty is valid (for optional fields)
  
  // ASIN: 10 characters, alphanumeric
  const asinPattern = /^[A-Z0-9]{10}$/;
  return asinPattern.test(asin);
};

/**
 * Validates an International Standard Book Number (ISBN)
 * ISBN-13 must be 13 digits
 * @param isbn The ISBN to validate
 * @returns True if valid, false otherwise
 */
export const isValidISBN = (isbn: string): boolean => {
  if (!isbn) return true; // Empty is valid (for optional fields)
  
  // Remove any hyphens or spaces
  const cleanedISBN = isbn.replace(/[-\s]/g, "");
  
  // ISBN-13: 13 digits
  const isbn13Pattern = /^[0-9]{13}$/;
  return isbn13Pattern.test(cleanedISBN);
};

/**
 * Format an ISBN with proper separators (e.g., 978-3-16-148410-0)
 * @param isbn Raw ISBN string
 * @returns Formatted ISBN string
 */
export const formatISBN = (isbn: string): string => {
  if (!isbn) return "";
  
  // Remove any existing hyphens or spaces
  const cleanedISBN = isbn.replace(/[-\s]/g, "");
  
  // Don't try to format invalid ISBNs
  if (!isValidISBN(cleanedISBN)) {
    return cleanedISBN;
  }
  
  // Format ISBN-13 with hyphens
  // Common format: prefix-group-publisher-title-check
  // This is a simplified version as actual grouping depends on registration agencies
  if (cleanedISBN.length === 13) {
    return `${cleanedISBN.slice(0, 3)}-${cleanedISBN.slice(3, 4)}-${cleanedISBN.slice(4, 8)}-${cleanedISBN.slice(8, 12)}-${cleanedISBN.slice(12)}`;
  }
  
  return cleanedISBN;
};

/**
 * Validates a book format entry (dimensions, ISBN, etc.)
 * @param formatData Book format data
 * @returns Object with validation results
 */
export const validateFormatEntry = (formatData: any) => {
  const errors: Record<string, string> = {};
  
  if (formatData.isbn && !isValidISBN(formatData.isbn)) {
    errors.isbn = "El ISBN debe tener 13 dígitos";
  }
  
  if (formatData.asin && !isValidASIN(formatData.asin)) {
    errors.asin = "El ASIN debe tener 10 caracteres alfanuméricos";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
