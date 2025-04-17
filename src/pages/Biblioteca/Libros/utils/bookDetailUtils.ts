
// This file is maintained for backward compatibility
// It re-exports all utilities from the new modular structure
import { 
  calculateNetRoyalties as calculateNetRoyaltiesModular,
  getFormatAvailability,
  generateAmazonLink,
  formatDate
} from "./bookDetail";

// Also import the function from formatUtils to avoid conflicts
import { calculateNetRoyalties as calculateNetRoyaltiesFormat } from "./formatUtils";

// Export using the modular version as the primary implementation
export const calculateNetRoyalties = calculateNetRoyaltiesFormat;

export {
  getFormatAvailability,
  generateAmazonLink,
  formatDate
};
