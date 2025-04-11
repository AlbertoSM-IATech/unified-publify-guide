
import { useEffect, useState } from "react";
import { BookFormat } from "../../../../types/bookTypes";

interface PricingResultsProps {
  format: BookFormat;
  calculateNetRoyalties: (format?: BookFormat) => string;
}

export const PricingResults = ({
  format,
  calculateNetRoyalties
}: PricingResultsProps) => {
  const [netRoyalties, setNetRoyalties] = useState("0.00");

  // Update net royalties when format data changes
  useEffect(() => {
    setNetRoyalties(calculateNetRoyalties(format));
  }, [format, calculateNetRoyalties]);

  return (
    <div className="mt-4 p-3 bg-muted rounded-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Regalías netas (estimado):</span>
        <span className="text-xl font-bold text-green-600">{netRoyalties}€</span>
      </div>
    </div>
  );
};
