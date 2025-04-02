
import { BookFormat } from "../types/bookTypes";

// Calculate net royalties
export const calculateNetRoyalties = (format?: BookFormat): string => {
  if (!format || !format.price || !format.royaltyPercentage) return "0.00";
  const priceWithoutVat = format.price / 1.21; // Assuming 21% VAT
  return (priceWithoutVat * format.royaltyPercentage - (format.printingCost || 0)).toFixed(2);
};
