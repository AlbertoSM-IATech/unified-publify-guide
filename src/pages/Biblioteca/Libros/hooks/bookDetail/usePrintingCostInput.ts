
import { useState, useEffect, useCallback } from "react";
import { BookFormat } from "../../types/bookTypes";
import { formatDecimal, parseDecimalInput } from "../../utils/formatUtils";

interface UsePrintingCostInputProps {
  initialPrintingCost?: number;
  isEditing: boolean;
  isEbook: boolean;
  formatType: string;
  onUpdateFormat: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const usePrintingCostInput = ({ initialPrintingCost, isEditing, isEbook, formatType, onUpdateFormat }: UsePrintingCostInputProps) => {
  const [printingCostInput, setPrintingCostInput] = useState(
    typeof initialPrintingCost === 'number' ? formatDecimal(initialPrintingCost) : ""
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    // console.log(`[usePrintingCostInput ${formatType}] useEffect [initialPrintingCost]: initialPrintingCost prop changed to: ${initialPrintingCost}`);
    let newPrintingCostInput = typeof initialPrintingCost === 'number' ? formatDecimal(initialPrintingCost) : "";
    if (isEbook) { // For ebooks, printing cost is always 0 and input should reflect that
        newPrintingCostInput = formatDecimal(0);
    }
    // console.log(`[usePrintingCostInput ${formatType}] useEffect [initialPrintingCost]: Setting printingCostInput to: "${newPrintingCostInput}" (was: "${printingCostInput}")`);
    setPrintingCostInput(newPrintingCostInput);
     if (isEditing && !isEbook) { // Only validate if editing and not an ebook
        validate(newPrintingCostInput);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrintingCost, isEditing, isEbook, formatType]);


  const validate = useCallback((value: string): boolean => {
    if (isEbook) { // No validation needed for ebooks as it's fixed or disabled
        setError(undefined);
        return true;
    }
    let fieldHasError = false;
    if (value && !/^[0-9]*([.,][0-9]{0,2})?$/.test(value)) {
      setError("El coste debe tener formato válido (ej. 3,50)");
      fieldHasError = true;
    } else {
      setError(undefined);
    }
    return !fieldHasError;
  }, [isEbook]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEbook) return; // Should not change for ebooks

    const value = e.target.value;
    // console.log(`[usePrintingCostInput ${formatType}] handleChange: value="${value}"`);
    setPrintingCostInput(value);

    const isValid = validate(value);

    if (value === "") {
    //   console.log(`[usePrintingCostInput ${formatType}] handleChange: Empty value, updating format with printingCost: undefined`);
      onUpdateFormat(formatType, { printingCost: undefined });
    } else if (isValid) {
      const numericValue = parseDecimalInput(value);
    //   console.log(`[usePrintingCostInput ${formatType}] handleChange: Non-empty value, numericValue=${numericValue}`);
      if (numericValue !== null) {
        // console.log(`[usePrintingCostInput ${formatType}] handleChange: Valid numericValue, updating format with printingCost: ${numericValue}`);
        onUpdateFormat(formatType, { printingCost: numericValue });
      } else {
        // console.log(`[usePrintingCostInput ${formatType}] handleChange: Invalid non-empty value ("${value}"), not updating parent state (or setting to undefined).`);
        onUpdateFormat(formatType, { printingCost: undefined });
      }
    } else {
        onUpdateFormat(formatType, { printingCost: undefined });
    }
  };
  
  // Ensure printing cost is set to 0 for ebooks when onUpdateFormat is called
  useEffect(() => {
    if (isEbook) {
      // console.log(`[usePrintingCostInput ${formatType}] useEffect [isEbook]: Format is ebook. Setting printingCost to 0 and input to "0,00".`);
      setPrintingCostInput(formatDecimal(0));
      onUpdateFormat(formatType, { printingCost: 0 });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEbook, formatType, onUpdateFormat, setPrintingCostInput]);


  return { printingCostInput, error, handleChange, setPrintingCostInput };
};
