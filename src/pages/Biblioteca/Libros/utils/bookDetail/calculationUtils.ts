
/**
 * Utility functions for financial calculations related to books
 */

import { BookFormat } from "../../types/bookTypes";

/**
 * Calculate the net royalties for a book format
 * @param format The book format containing price, royalty percentage, and optional printing cost
 * @returns Formatted string representing the net royalties with two decimal places
 */
export const calculateNetRoyalties = (format?: BookFormat): string => {
  if (!format || !format.price || !format.royaltyPercentage) {
    return "0.00";
  }

  // Precio sin IVA - no aplicamos más transformaciones ya que asumimos que el precio que tenemos ya está sin IVA
  const price = parseFloat(format.price.toString());
  
  // Regalías brutas (precio × porcentaje)
  const royaltyPercentage = parseFloat(format.royaltyPercentage.toString());
  const royalties = price * royaltyPercentage;
  
  // Restar costo de impresión si existe
  const printingCost = format.printingCost !== undefined ? parseFloat(format.printingCost.toString()) : 0;
  const netRoyalties = royalties - printingCost;
  
  // Devolver con dos decimales
  return netRoyalties.toFixed(2);
};
