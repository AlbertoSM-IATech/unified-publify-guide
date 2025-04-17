
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { formatDecimal, parseDecimalInput } from "../../../../utils/formatUtils";

interface PricingInputsProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
  triggerCalculation?: () => void;
}

export const PricingInputs = ({
  formatType,
  format,
  isEditing,
  onUpdateFormat,
  triggerCalculation
}: PricingInputsProps) => {
  // Local state for input fields to handle display formatting
  const [priceInput, setPriceInput] = useState(format.price ? formatDecimal(format.price) : "");
  const [royaltyInput, setRoyaltyInput] = useState(
    format.royaltyPercentage ? (format.royaltyPercentage * 100).toString() : ""
  );
  const [printingCostInput, setPrintingCostInput] = useState(
    format.printingCost ? formatDecimal(format.printingCost) : ""
  );

  // Update local input state when format changes from parent
  useEffect(() => {
    if (format) {
      setPriceInput(format.price ? formatDecimal(format.price) : "");
      setRoyaltyInput(format.royaltyPercentage ? (format.royaltyPercentage * 100).toString() : "");
      setPrintingCostInput(format.printingCost ? formatDecimal(format.printingCost) : "");
    }
  }, [format]);

  // Handle price change with normalized format
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow numbers, one decimal separator, and no more than 2 decimal places
    if (/^[0-9]*([.,][0-9]{0,2})?$/.test(value) || value === "") {
      setPriceInput(value);
      
      if (onUpdateFormat) {
        const numericValue = parseDecimalInput(value);
        onUpdateFormat(formatType, {
          price: numericValue
        });
      }
    }
  };

  // Handle royalty percentage change
  const handleRoyaltyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow integers from 0 to 100
    if (/^[0-9]{0,3}$/.test(value) || value === "") {
      setRoyaltyInput(value);
      
      if (onUpdateFormat && value) {
        // Convert to decimal (e.g., 60 -> 0.6)
        const percentage = parseInt(value, 10) / 100;
        
        onUpdateFormat(formatType, {
          royaltyPercentage: isNaN(percentage) ? 0 : percentage
        });
      }
    }
  };

  // Handle printing cost change
  const handlePrintingCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow numbers, one decimal separator, and no more than 2 decimal places
    if (/^[0-9]*([.,][0-9]{0,2})?$/.test(value) || value === "") {
      setPrintingCostInput(value);
      
      if (onUpdateFormat) {
        const numericValue = parseDecimalInput(value);
        onUpdateFormat(formatType, {
          printingCost: numericValue
        });
      }
    }
  };

  // Handle calculate button click
  const handleCalculate = () => {
    if (triggerCalculation) {
      triggerCalculation();
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label htmlFor="price">Precio sin IVA (€)</Label>
          {isEditing ? (
            <Input
              id="price"
              value={priceInput}
              onChange={handlePriceChange}
              placeholder="0,00"
              className="bg-white dark:bg-slate-900"
            />
          ) : (
            <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.price ? formatDecimal(format.price) : "0,00"}€
            </div>
          )}
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="royalty">% Regalía</Label>
          {isEditing ? (
            <Input
              id="royalty"
              value={royaltyInput}
              onChange={handleRoyaltyChange}
              placeholder="0"
              className="bg-white dark:bg-slate-900"
            />
          ) : (
            <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.royaltyPercentage ? (format.royaltyPercentage * 100).toFixed(0) : "0"}%
            </div>
          )}
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="printingCost">Coste impresión (€)</Label>
          {isEditing ? (
            <Input
              id="printingCost"
              value={printingCostInput}
              onChange={handlePrintingCostChange}
              placeholder="0,00"
              className="bg-white dark:bg-slate-900"
            />
          ) : (
            <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.printingCost ? formatDecimal(format.printingCost) : "0,00"}€
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end mt-2">
          <Button 
            type="button" 
            onClick={handleCalculate}
            className="bg-[#FB923C] hover:bg-[#FB923C]/90"
          >
            <Calculator size={16} className="mr-2" />
            Calcular regalía
          </Button>
        </div>
      )}
    </div>
  );
};
