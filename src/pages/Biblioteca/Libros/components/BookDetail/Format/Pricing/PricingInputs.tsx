
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { Calculator, HelpCircle } from "lucide-react";
import { formatDecimal, parseDecimalInput } from "../../../../utils/formatUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update local input state when format changes from parent
  useEffect(() => {
    if (format) {
      setPriceInput(format.price ? formatDecimal(format.price) : "");
      setRoyaltyInput(format.royaltyPercentage ? (format.royaltyPercentage * 100).toString() : "");
      setPrintingCostInput(format.printingCost ? formatDecimal(format.printingCost) : "");
    }
  }, [format]);

  // Validate fields
  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    if (field === 'price') {
      if (value && !/^[0-9]*([.,][0-9]{0,2})?$/.test(value)) {
        newErrors.price = "El precio debe tener formato válido (ej. 12,99)";
      } else {
        delete newErrors.price;
      }
    }
    
    if (field === 'royalty') {
      if (value && (parseInt(value) < 0 || parseInt(value) > 100)) {
        newErrors.royalty = "El porcentaje debe estar entre 0 y 100";
      } else {
        delete newErrors.royalty;
      }
    }
    
    if (field === 'printingCost') {
      if (value && !/^[0-9]*([.,][0-9]{0,2})?$/.test(value)) {
        newErrors.printingCost = "El coste debe tener formato válido (ej. 3,50)";
      } else {
        delete newErrors.printingCost;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle price change with normalized format
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceInput(value);
    
    if (validateField('price', value) && onUpdateFormat) {
      const numericValue = parseDecimalInput(value);
      onUpdateFormat(formatType, {
        price: numericValue
      });
    }
  };

  // Handle royalty percentage change
  const handleRoyaltyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Only allow integers from 0 to 100
    if (/^[0-9]{0,3}$/.test(value) || value === "") {
      setRoyaltyInput(value);
      
      if (validateField('royalty', value) && onUpdateFormat && value) {
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
    setPrintingCostInput(value);
    
    if (validateField('printingCost', value) && onUpdateFormat) {
      const numericValue = parseDecimalInput(value);
      onUpdateFormat(formatType, {
        printingCost: numericValue
      });
    }
  };

  // Handle calculate button click
  const handleCalculate = () => {
    if (triggerCalculation) {
      triggerCalculation();
    }
  };

  // Determine if this is an ebook (no printing cost for ebooks)
  const isEbook = formatType === 'ebook';

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="price">Precio sin IVA (€)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-5 w-5 p-0 text-muted-foreground">
                    <HelpCircle size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>El precio de venta al público sin IVA</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isEditing ? (
            <>
              <Input
                id="price"
                value={priceInput}
                onChange={handlePriceChange}
                placeholder="0,00"
                className={`bg-white dark:bg-slate-900 ${errors.price ? "border-red-500" : ""}`}
              />
              {errors.price && (
                <p className="text-xs text-red-500">{errors.price}</p>
              )}
            </>
          ) : (
            <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.price ? formatDecimal(format.price) : "0,00"}€
            </div>
          )}
        </div>
        
        <div className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="royalty">% Regalía</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-5 w-5 p-0 text-muted-foreground">
                    <HelpCircle size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Porcentaje de regalías sobre el precio sin IVA</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isEditing ? (
            <>
              <Input
                id="royalty"
                value={royaltyInput}
                onChange={handleRoyaltyChange}
                placeholder="0"
                className={`bg-white dark:bg-slate-900 ${errors.royalty ? "border-red-500" : ""}`}
              />
              {errors.royalty && (
                <p className="text-xs text-red-500">{errors.royalty}</p>
              )}
            </>
          ) : (
            <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.royaltyPercentage ? (format.royaltyPercentage * 100).toFixed(0) : "0"}%
            </div>
          )}
        </div>
        
        <div className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor="printingCost">Coste producción (€)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className="h-5 w-5 p-0 text-muted-foreground">
                    <HelpCircle size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Coste de impresión o producción por unidad</p>
                  {isEbook && <p>Para eBooks este valor suele ser 0</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isEditing ? (
            <>
              <Input
                id="printingCost"
                value={printingCostInput}
                onChange={handlePrintingCostChange}
                placeholder="0,00"
                className={`bg-white dark:bg-slate-900 ${errors.printingCost ? "border-red-500" : ""}`}
                disabled={isEbook}
              />
              {errors.printingCost && (
                <p className="text-xs text-red-500">{errors.printingCost}</p>
              )}
            </>
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
            disabled={Object.keys(errors).length > 0}
          >
            <Calculator size={16} className="mr-2" />
            Calcular regalía
          </Button>
        </div>
      )}
    </div>
  );
};
