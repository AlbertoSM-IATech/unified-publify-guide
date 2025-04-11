import { BookFormat } from "../types/bookTypes";

// NOTE: This function is now duplicated in bookDetailUtils.ts
// We're keeping it here for backward compatibility, but it's deprecated
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
