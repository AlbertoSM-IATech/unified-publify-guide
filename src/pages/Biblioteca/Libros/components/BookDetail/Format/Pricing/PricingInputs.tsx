import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { formatDecimal } from "../../../../utils/formatUtils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePriceInput } from "../../../../hooks/bookDetail/usePriceInput";
import { useRoyaltyInput } from "../../../../hooks/bookDetail/useRoyaltyInput";
import { usePrintingCostInput } from "../../../../hooks/bookDetail/usePrintingCostInput";

interface PricingInputsProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  onUpdateFormat: (formatType: string, updatedData: Partial<BookFormat>) => void; // Mandatory, as hooks depend on it
  triggerCalculation?: () => void;
}

export const PricingInputs = ({
  formatType,
  format,
  isEditing,
  onUpdateFormat,
  triggerCalculation // Optional, no direct changes here
}: PricingInputsProps) => {
  // console.log(`[PricingInputs ${formatType}] Rendering. isEditing: ${isEditing}. Format Price: ${format.price}`);

  const { 
    priceInput, 
    error: priceError, 
    handleChange: handlePriceChange,
    setPriceInput // Used to reset/sync from parent if needed, though useEffect in hook handles initial
  } = usePriceInput({
    initialPrice: format.price,
    isEditing,
    formatType,
    onUpdateFormat
  });

  const { 
    royaltyInput, 
    error: royaltyError, 
    handleChange: handleRoyaltyChange,
    setRoyaltyInput
  } = useRoyaltyInput({
    initialRoyaltyPercentage: format.royaltyPercentage,
    isEditing,
    formatType,
    onUpdateFormat
  });
  
  const isEbook = formatType === 'ebook';
  const { 
    printingCostInput, 
    error: printingCostError, 
    handleChange: handlePrintingCostChange,
    setPrintingCostInput
  } = usePrintingCostInput({
    initialPrintingCost: format.printingCost,
    isEditing,
    isEbook,
    formatType,
    onUpdateFormat
  });

  // This useEffect ensures that if the parent `format` object instance changes
  // (e.g., due to an external update or reset), the hooks get the new initial values.
  // The hooks themselves also have internal useEffects to react to `initialValue` prop changes.
  useEffect(() => {
    // console.log(`[PricingInputs ${formatType}] useEffect [format] triggered. Price: ${format.price}, Royalty: ${format.royaltyPercentage}, PrintingCost: ${format.printingCost}`);
    // The hooks' internal useEffects listening to initialPrice, initialRoyaltyPercentage, initialPrintingCost
    // will handle updating their respective local input states.
    // Explicitly calling setPriceInput, etc., here could be redundant if hooks manage this well.
    // However, if `format` object itself is replaced (new reference), this ensures hooks are re-initialized
    // with potentially new initial values if their own dependencies are correctly set up.
    // For safety, one might re-trigger the logic within the hooks if needed,
    // but ideally, the props `initialPrice`, etc., changing should be enough.

    // Let's verify if the hooks' internal useEffects are sufficient.
    // If format.price changes, usePriceInput's useEffect for initialPrice should update priceInput.
    // The same applies to royalty and printingCost.
    // The following lines might be removed if hooks correctly sync with their initialValue props.
     if (format) {
        const newPriceDisplay = typeof format.price === 'number' ? formatDecimal(format.price) : "";
        if (priceInput !== newPriceDisplay && !isEditing) { // Only update if not editing or if value differs to avoid loops
            // console.log(`[PricingInputs ${formatType}] Syncing priceInput from format prop to: "${newPriceDisplay}"`);
            setPriceInput(newPriceDisplay);
        }

        const newRoyaltyDisplay = typeof format.royaltyPercentage === 'number' ? (format.royaltyPercentage * 100).toString() : "";
        if (royaltyInput !== newRoyaltyDisplay && !isEditing) {
            // console.log(`[PricingInputs ${formatType}] Syncing royaltyInput from format prop to: "${newRoyaltyDisplay}"`);
            setRoyaltyInput(newRoyaltyDisplay);
        }
        
        let newPrintingCostDisplay = typeof format.printingCost === 'number' ? formatDecimal(format.printingCost) : "";
        if (isEbook) newPrintingCostDisplay = formatDecimal(0); // Ebook cost is always 0
        if (printingCostInput !== newPrintingCostDisplay && !isEditing) {
            // console.log(`[PricingInputs ${formatType}] Syncing printingCostInput from format prop to: "${newPrintingCostDisplay}"`);
            setPrintingCostInput(newPrintingCostDisplay);
        }
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [format, formatType, isEditing, priceInput, royaltyInput, printingCostInput]); // Add granular format fields if format object reference doesn't change but its content does


  // Handle calculate button click (remains unchanged)
  const handleCalculate = () => {
    if (triggerCalculation) {
      triggerCalculation();
    }
  };

  return <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {/* Price Input */}
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
              <Input 
                id={`${formatType}-price`} 
                name="price" 
                value={priceInput} 
                onChange={handlePriceChange} 
                placeholder="0,00" 
                className={`bg-white dark:bg-slate-900 ${priceError ? "border-red-500" : ""}`} 
              />
              {priceError && <p className="text-xs text-red-500">{priceError}</p>}
            </> : <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.price ? formatDecimal(format.price) : "0,00"}€
            </div>}
        </div>
        
        {/* Royalty Input */}
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
              <Input 
                id={`${formatType}-royalty`} 
                name="royalty" 
                value={royaltyInput} 
                onChange={handleRoyaltyChange} 
                placeholder="0" 
                className={`bg-white dark:bg-slate-900 ${royaltyError ? "border-red-500" : ""}`} 
                maxLength={3} 
              />
              {royaltyError && <p className="text-xs text-red-500">{royaltyError}</p>}
            </> : <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.royaltyPercentage ? (format.royaltyPercentage * 100).toFixed(0) : "0"}%
            </div>}
        </div>
        
        {/* Printing Cost Input */}
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
              <Input 
                id={`${formatType}-printingCost`} 
                name="printingCost" 
                value={printingCostInput} 
                onChange={handlePrintingCostChange} 
                placeholder="0,00" 
                className={`bg-white dark:bg-slate-900 ${printingCostError ? "border-red-500" : ""}`} 
                disabled={isEbook} 
              />
              {printingCostError && <p className="text-xs text-red-500">{printingCostError}</p>}
            </> : <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {/* For display, if it's an ebook and printingCost is undefined/null, show 0,00. Otherwise, use actual value. */}
              {(isEbook && typeof format.printingCost !== 'number') ? formatDecimal(0) : (format.printingCost ? formatDecimal(format.printingCost) : "0,00")}€
            </div>}
        </div>
      </div>

      {/* Calculate button - no changes here */}
      {isEditing && triggerCalculation && <div className="flex justify-end mt-2">
          {/* The calculate button was removed in a previous step. Re-add if needed. */}
          {/* For now, ensure triggerCalculation is optional and the div doesn't render if not applicable. */}
        </div>}
    </div>;
};
