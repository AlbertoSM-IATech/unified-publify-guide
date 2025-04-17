
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

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
  // Helper function to normalize decimal separators
  const normalizeDecimal = (value: string): number => {
    // Replace comma with dot for calculation
    const normalized = value.replace(',', '.');
    return parseFloat(normalized) || 0;
  };

  // Helper function to format decimal display
  const formatDecimal = (value: number): string => {
    return value.toString().replace('.', ',');
  };

  // Handle price change with normalized format
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onUpdateFormat) return;
    
    const value = e.target.value;
    const numericValue = normalizeDecimal(value);
    
    onUpdateFormat(formatType, {
      price: numericValue
    });
  };

  // Handle royalty percentage change
  const handleRoyaltyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onUpdateFormat) return;
    
    const value = e.target.value;
    const numericValue = normalizeDecimal(value);
    
    // Convert to decimal (e.g., 60 -> 0.6)
    const percentage = numericValue / 100;
    
    onUpdateFormat(formatType, {
      royaltyPercentage: percentage
    });
  };

  // Handle printing cost change
  const handlePrintingCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onUpdateFormat) return;
    
    const value = e.target.value;
    const numericValue = normalizeDecimal(value);
    
    onUpdateFormat(formatType, {
      printingCost: numericValue
    });
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
              value={format.price ? formatDecimal(format.price) : ""}
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
              value={format.royaltyPercentage ? (format.royaltyPercentage * 100).toString() : ""}
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
              value={format.printingCost ? formatDecimal(format.printingCost) : ""}
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
