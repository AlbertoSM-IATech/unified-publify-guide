
import { useEffect, useState } from "react";
import { BookFormat } from "../../../../types/bookTypes";
import { motion } from "framer-motion";

interface PricingResultsProps {
  format: BookFormat;
  calculateNetRoyalties: (format?: BookFormat) => string;
}

export const PricingResults = ({
  format,
  calculateNetRoyalties
}: PricingResultsProps) => {
  const [netRoyalties, setNetRoyalties] = useState("0,00");
  const [calculation, setCalculation] = useState<string>("");

  // Update net royalties when format data changes
  useEffect(() => {
    // Calculate royalties using the correct formula
    const price = format.price || 0;
    const royaltyPercentage = format.royaltyPercentage || 0;
    const printingCost = format.printingCost || 0;
    
    // Formula: (Price * RoyaltyPercentage) - PrintingCost
    const royaltyAmount = price * royaltyPercentage;
    const netRoyalty = Math.max(0, royaltyAmount - printingCost);
    
    // Generate the calculation text
    setCalculation(`(${price.toFixed(2)}€ × ${(royaltyPercentage * 100).toFixed(0)}%) − ${printingCost.toFixed(2)}€ = ${netRoyalty.toFixed(2)}€`);
    
    // Format with 2 decimal places and replace dot with comma for display
    const formattedRoyalty = netRoyalty.toFixed(2).replace('.', ',');
    setNetRoyalties(formattedRoyalty);
  }, [format, format.price, format.royaltyPercentage, format.printingCost]);
  
  return (
    <motion.div 
      className="mt-4 p-3 bg-muted rounded-md border shadow-sm"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Regalías netas (estimado):</span>
        <span className="font-bold text-green-600 text-3xl flex items-center">
          {netRoyalties}€
        </span>
      </div>
      
      {/* Enhanced formula explanation */}
      <div className="mt-2 text-xs text-muted-foreground">
        <p>Fórmula: (Precio × % regalía) − Coste impresión</p>
        {format.price && format.royaltyPercentage && (
          <p className="mt-1 font-mono bg-muted/50 p-1 rounded">
            {calculation}
          </p>
        )}
      </div>
    </motion.div>
  );
};
