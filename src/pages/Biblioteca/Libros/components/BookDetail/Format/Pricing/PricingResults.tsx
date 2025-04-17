import { useEffect, useState } from "react";
import { BookFormat } from "../../../../types/bookTypes";
import { motion } from "framer-motion";

interface PricingResultsProps {
  format: BookFormat;
  calculateNetRoyalties: (format?: BookFormat) => string;
  calculationKey?: boolean; // Used to force recalculation
}

export const PricingResults = ({
  format,
  calculateNetRoyalties,
  calculationKey
}: PricingResultsProps) => {
  const [netRoyalties, setNetRoyalties] = useState("0,00");
  const [calculation, setCalculation] = useState<string>("");

  // Helper function to format decimal for display
  const formatDisplayDecimal = (value: number | string): string => {
    // If it's already a string with a comma, return it
    if (typeof value === 'string' && value.includes(',')) {
      return value;
    }
    
    // Otherwise format it with comma as decimal separator
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return numValue.toFixed(2).replace('.', ',');
  };

  // Update net royalties when format data changes or calculation is triggered
  useEffect(() => {
    // Calculate royalties using the correct formula
    const price = format.price || 0;
    const royaltyPercentage = format.royaltyPercentage || 0;
    const printingCost = format.printingCost || 0;
    
    // Formula: (Price * RoyaltyPercentage) - PrintingCost
    const royaltyAmount = price * royaltyPercentage;
    const netRoyalty = Math.max(0, royaltyAmount - printingCost);
    
    // Generate the calculation text
    setCalculation(`(${formatDisplayDecimal(price)}€ × ${(royaltyPercentage * 100).toFixed(0)}%) − ${formatDisplayDecimal(printingCost)}€ = ${formatDisplayDecimal(netRoyalty)}€`);
    
    // Format with 2 decimal places and replace dot with comma for display
    const formattedRoyalty = netRoyalty.toFixed(2).replace('.', ',');
    setNetRoyalties(formattedRoyalty);
  }, [format, format.price, format.royaltyPercentage, format.printingCost, calculationKey]);
  
  return (
    <motion.div 
      className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/30 rounded-md border border-slate-200 dark:border-slate-700 shadow-sm"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Regalías netas (estimado):</span>
        <span className="font-bold text-green-600 text-3xl flex items-center">
          {netRoyalties}€
        </span>
      </div>
      
      {/* Enhanced formula explanation */}
      <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
        <p>Fórmula: (Precio × % regalía) − Coste impresión</p>
        {format.price && format.royaltyPercentage && (
          <p className="mt-1 font-mono bg-slate-100 dark:bg-slate-700/50 p-1.5 rounded text-slate-700 dark:text-slate-300">
            {calculation}
          </p>
        )}
      </div>
    </motion.div>
  );
};
