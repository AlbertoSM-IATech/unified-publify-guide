
import { useEffect, useState } from "react";
import { BookFormat } from "../../../../types/bookTypes";
import { Euro } from "lucide-react";

interface PricingResultsProps {
  format: BookFormat;
  calculateNetRoyalties: (format?: BookFormat) => string;
}

export const PricingResults = ({
  format,
  calculateNetRoyalties
}: PricingResultsProps) => {
  const [netRoyalties, setNetRoyalties] = useState("0,00");

  // Update net royalties when format data changes
  useEffect(() => {
    // Calculate royalties using the correct formula
    const price = format.price || 0;
    const royaltyPercentage = format.royaltyPercentage || 0;
    const printingCost = format.printingCost || 0;
    
    // Formula: (Price * RoyaltyPercentage) - PrintingCost
    const royaltyAmount = price * royaltyPercentage;
    const netRoyalty = royaltyAmount - printingCost;
    
    // Format with 2 decimal places and replace dot with comma for display
    const formattedRoyalty = Math.max(0, netRoyalty).toFixed(2).replace('.', ',');
    setNetRoyalties(formattedRoyalty);
  }, [format, format.price, format.royaltyPercentage, format.printingCost]);
  
  return (
    <div className="mt-4 p-3 bg-muted rounded-md border shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Regalías netas (estimado):</span>
        <span className="font-bold text-green-600 text-3xl flex items-center">
          {netRoyalties}€
        </span>
      </div>
      
      {/* Add formula explanation */}
      <div className="mt-2 text-xs text-muted-foreground">
        <p>Fórmula: (Precio × % regalía) − Coste impresión</p>
        {format.price && format.royaltyPercentage && (
          <p className="mt-1">
            ({format.price?.toFixed(2)}€ × {(format.royaltyPercentage * 100).toFixed(0)}%) 
            {format.printingCost ? ` − ${format.printingCost.toFixed(2)}€` : ''}
          </p>
        )}
      </div>
    </div>
  );
};
