
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
    const royaltiesValue = calculateNetRoyalties(format);
    // Replace dot with comma for display
    setNetRoyalties(royaltiesValue.replace('.', ','));
  }, [format, calculateNetRoyalties]);
  
  return (
    <div className="mt-4 p-3 bg-muted rounded-md border shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Regalías netas (estimado):</span>
        <span className="font-bold text-green-600 text-3xl flex items-center">
          {netRoyalties}€
        </span>
      </div>
    </div>
  );
};
