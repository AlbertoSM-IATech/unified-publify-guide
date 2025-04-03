
/**
 * Utility functions for formatting data in the application
 */

/**
 * Formats a date to a localized string
 * @param date The date to format
 * @param locale The locale to use for formatting (defaults to browser locale)
 * @returns A formatted date string
 */
export const formatDate = (date: Date | string | null, locale = 'es-ES'): string => {
  if (!date) return 'Fecha no disponible';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return dateObj.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formats a number as currency
 * @param amount The amount to format
 * @param currency The currency code (defaults to EUR)
 * @param locale The locale to use for formatting (defaults to Spanish)
 * @returns A formatted currency string
 */
export const formatCurrency = (amount: number, currency = 'EUR', locale = 'es-ES'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Truncates text to a specified length and adds ellipsis if needed
 * @param text The text to truncate
 * @param maxLength The maximum length of the text
 * @returns The truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};
