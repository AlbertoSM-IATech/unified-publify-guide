
import { BookFormat } from "../types/bookTypes";

// Calculate net royalties with improved accuracy
export const calculateNetRoyalties = (format?: BookFormat): string => {
  if (!format) return "0.00";
  
  // Check if all required fields are present
  if (format.price === undefined || 
      format.royaltyPercentage === undefined) {
    return "0.00";
  }
  
  // Calculate net royalties with VAT adjustment
  const priceWithoutVat = format.price / 1.21; // 21% VAT
  const printingCost = format.printingCost || 0;
  const netRoyalty = (priceWithoutVat * format.royaltyPercentage) - printingCost;
  
  // Return the result with 2 decimal places
  return Math.max(0, netRoyalty).toFixed(2);
};
