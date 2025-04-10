
import { BookFormat } from "../types/bookTypes";

export const calculateNetRoyalties = (format?: BookFormat): string => {
  if (!format || !format.price || !format.royaltyPercentage) {
    return "0.00";
  }
  
  const price = parseFloat(format.price.toString());
  const percentage = parseFloat(format.royaltyPercentage.toString()) / 100;
  const result = price * percentage;
  
  return result.toFixed(2);
};
