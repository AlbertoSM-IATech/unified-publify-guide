import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
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
  const [priceInput, setPriceInput] = useState(
    typeof format.price === 'number' ? formatDecimal(format.price) : ""
  );
  const [royaltyInput, setRoyaltyInput] = useState(
    typeof format.royaltyPercentage === 'number' ? (format.royaltyPercentage * 100).toString() : ""
  );
  const [printingCostInput, setPrintingCostInput] = useState(
    typeof format.printingCost === 'number' ? formatDecimal(format.printingCost) : ""
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update local input state when format changes from parent
  useEffect(() => {
    if (format) {
      console.log(`[PricingInputs ${formatType}] useEffect [format]: format prop changed. Price: ${format.price}, Royalty: ${format.royaltyPercentage}, PrintingCost: ${format.printingCost}`);
      
      const newPriceInput = typeof format.price === 'number' ? formatDecimal(format.price) : "";
      console.log(`[PricingInputs ${formatType}] useEffect [format]: Setting priceInput to: "${newPriceInput}" (was: "${priceInput}")`);
      setPriceInput(newPriceInput);

      const newRoyaltyInput = typeof format.royaltyPercentage === 'number' ? (format.royaltyPercentage * 100).toString() : "";
      console.log(`[PricingInputs ${formatType}] useEffect [format]: Setting royaltyInput to: "${newRoyaltyInput}" (was: "${royaltyInput}")`);
      setRoyaltyInput(newRoyaltyInput);
      
      const newPrintingCostInput = typeof format.printingCost === 'number' ? formatDecimal(format.printingCost) : "";
      console.log(`[PricingInputs ${formatType}] useEffect [format]: Setting printingCostInput to: "${newPrintingCostInput}" (was: "${printingCostInput}")`);
      setPrintingCostInput(newPrintingCostInput);

    } else {
      console.log(`[PricingInputs ${formatType}] useEffect [format]: format prop is null/undefined.`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format]); // format es el objeto que los contiene, si format.price cambia, format cambia.

  // Validate fields
  const validateField = (field: string, value: string): boolean => {
    const newErrors = { ...errors };
    let fieldHasError = false;

    if (field === 'price') {
      if (value && !/^[0-9]*([.,][0-9]{0,2})?$/.test(value)) {
        newErrors.price = "El precio debe tener formato válido (ej. 12,99)";
        fieldHasError = true;
      } else {
        delete newErrors.price;
      }
    }
    if (field === 'royalty') {
      if (value && (parseInt(value) < 0 || parseInt(value) > 100 || !/^\d+$/.test(value))) {
        newErrors.royalty = "El porcentaje debe ser un número entero entre 0 y 100";
        fieldHasError = true;
      } else {
        delete newErrors.royalty;
      }
    }
    if (field === 'printingCost') {
      if (value && !/^[0-9]*([.,][0-9]{0,2})?$/.test(value)) {
        newErrors.printingCost = "El coste debe tener formato válido (ej. 3,50)";
        fieldHasError = true;
      } else {
        delete newErrors.printingCost;
      }
    }
    setErrors(newErrors);
    return !fieldHasError; // True si el campo NO tiene error
  };

  // Handle price change with normalized format
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(`[PricingInputs ${formatType}] handlePriceChange: value="${value}"`);
    setPriceInput(value);

    validateField('price', value); // Actualiza errores si es necesario

    if (onUpdateFormat) {
      if (value === "") {
        console.log(`[PricingInputs ${formatType}] handlePriceChange: Empty value, updating format with price: undefined`);
        onUpdateFormat(formatType, { price: undefined });
      } else {
        const numericValue = parseDecimalInput(value);
        console.log(`[PricingInputs ${formatType}] handlePriceChange: Non-empty value, numericValue=${numericValue}`);
        if (numericValue !== null) {
          console.log(`[PricingInputs ${formatType}] handlePriceChange: Valid numericValue, updating format with price: ${numericValue}`);
          onUpdateFormat(formatType, { price: numericValue });
        } else {
          console.log(`[PricingInputs ${formatType}] handlePriceChange: Invalid non-empty value ("${value}"), not updating parent state.`);
        }
      }
    }
  };

  // Handle royalty percentage change
  const handleRoyaltyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(`[PricingInputs ${formatType}] handleRoyaltyChange: value="${value}"`);

    // Pre-validation for royalty input to allow only digits or empty and within range conceptually before setting state
    if (/^\d*$/.test(value)) {
        if (value === "" || (parseInt(value, 10) >= 0 && parseInt(value, 10) <= 100) || value.length <= 3) {
             setRoyaltyInput(value);
        } else if (value.length > 3 && parseInt(value.substring(0,3), 10) <=100 ) {
            // If user types more than 3 digits but the first 3 are valid (e.g. "1001" -> "100")
            const trimmedValue = value.substring(0,3);
            if(parseInt(trimmedValue,10) <=100){
                setRoyaltyInput(trimmedValue);
            } else {
                 // User typed something like 999, don't update if it exceeds 100.
                 // Let validation handle the message.
            }
        } else {
            // This case might be if they typed something like "0000" or pasted "5000"
            // Let validateField catch it if it's out of 0-100 range for message, but don't update input if it's clearly wrong.
        }
    }


    validateField('royalty', value); // Actualiza errores

    if (onUpdateFormat) {
      if (value === "") {
        console.log(`[PricingInputs ${formatType}] handleRoyaltyChange: Empty value, updating format with royaltyPercentage: undefined`);
        onUpdateFormat(formatType, { royaltyPercentage: undefined });
      } else {
        // Check if it's a valid integer string, then parse
        if (/^\d+$/.test(value)) {
          const percentageInt = parseInt(value, 10);
          if (percentageInt >= 0 && percentageInt <= 100) {
            const numericValue = percentageInt / 100;
            console.log(`[PricingInputs ${formatType}] handleRoyaltyChange: Valid percentage ${percentageInt}%, numericValue=${numericValue}`);
            onUpdateFormat(formatType, { royaltyPercentage: numericValue });
          } else {
            console.log(`[PricingInputs ${formatType}] handleRoyaltyChange: Percentage "${value}" out of 0-100 range, not updating parent state.`);
          }
        } else {
          console.log(`[PricingInputs ${formatType}] handleRoyaltyChange: Invalid (non-integer) royalty value "${value}", not updating parent state.`);
        }
      }
    }
  };

  // Handle printing cost change
  const handlePrintingCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(`[PricingInputs ${formatType}] handlePrintingCostChange: value="${value}"`);
    setPrintingCostInput(value);

    validateField('printingCost', value); // Actualiza errores

    if (onUpdateFormat) {
      if (value === "") {
        console.log(`[PricingInputs ${formatType}] handlePrintingCostChange: Empty value, updating format with printingCost: undefined`);
        onUpdateFormat(formatType, { printingCost: undefined });
      } else {
        const numericValue = parseDecimalInput(value);
        console.log(`[PricingInputs ${formatType}] handlePrintingCostChange: Non-empty value, numericValue=${numericValue}`);
        if (numericValue !== null) {
          console.log(`[PricingInputs ${formatType}] handlePrintingCostChange: Valid numericValue, updating format with printingCost: ${numericValue}`);
          onUpdateFormat(formatType, { printingCost: numericValue });
        } else {
          console.log(`[PricingInputs ${formatType}] handlePrintingCostChange: Invalid non-empty value ("${value}"), not updating parent state.`);
        }
      }
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
  return <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor={`${formatType}-price`}>Precio sin IVA (€)</Label>
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
          {isEditing ? <>
              <Input id={`${formatType}-price`} name="price" value={priceInput} onChange={handlePriceChange} placeholder="0,00" className={`bg-white dark:bg-slate-900 ${errors.price ? "border-red-500" : ""}`} />
              {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
            </> : <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.price ? formatDecimal(format.price) : "0,00"}€
            </div>}
        </div>
        
        <div className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor={`${formatType}-royalty`}>% Regalía</Label>
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
          {isEditing ? <>
              <Input id={`${formatType}-royalty`} name="royalty" value={royaltyInput} onChange={handleRoyaltyChange} placeholder="0" className={`bg-white dark:bg-slate-900 ${errors.royalty ? "border-red-500" : ""}`} maxLength={3} />
              {errors.royalty && <p className="text-xs text-red-500">{errors.royalty}</p>}
            </> : <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.royaltyPercentage ? (format.royaltyPercentage * 100).toFixed(0) : "0"}%
            </div>}
        </div>
        
        <div className="grid gap-2">
          <div className="flex items-center gap-1">
            <Label htmlFor={`${formatType}-printingCost`}>Coste producción (€)</Label>
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
          {isEditing ? <>
              <Input id={`${formatType}-printingCost`} name="printingCost" value={printingCostInput} onChange={handlePrintingCostChange} placeholder="0,00" className={`bg-white dark:bg-slate-900 ${errors.printingCost ? "border-red-500" : ""}`} disabled={isEbook} />
              {errors.printingCost && <p className="text-xs text-red-500">{errors.printingCost}</p>}
            </> : <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.printingCost ? formatDecimal(format.printingCost) : "0,00"}€
            </div>}
        </div>
      </div>

      {isEditing && triggerCalculation && <div className="flex justify-end mt-2">
          {/* The calculate button was removed in a previous step. Re-add if needed. */}
          {/* For now, ensure triggerCalculation is optional and the div doesn't render if not applicable. */}
        </div>}
    </div>;
};
