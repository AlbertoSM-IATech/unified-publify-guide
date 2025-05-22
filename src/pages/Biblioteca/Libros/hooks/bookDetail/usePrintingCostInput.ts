
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
    if (isEbook) {
        newPrintingCostInput = formatDecimal(0);
    }
    // console.log(`[usePrintingCostInput ${formatType}] useEffect [initialPrintingCost]: Setting printingCostInput to: "${newPrintingCostInput}" (was: "${printingCostInput}")`);
    
    if (printingCostInput !== newPrintingCostInput) {
        setPrintingCostInput(newPrintingCostInput);
    }

    if (isEditing && !isEbook) {
        validate(newPrintingCostInput);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrintingCost, isEditing, isEbook, formatType]);


  const validate = useCallback((value: string): boolean => {
    if (isEbook) {
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
    if (isEbook) return; 

    const value = e.target.value;
    // console.log(`[usePrintingCostInput ${formatType}] handleChange: value="${value}"`);
    setPrintingCostInput(value); // Siempre refleja la entrada del usuario en el UI

    const isValidFormat = validate(value); // Esto también actualiza el estado de 'error'

    if (value === "") {
      // console.log(`[usePrintingCostInput ${formatType}] handleChange: Empty value, updating format with printingCost: undefined`);
      onUpdateFormat(formatType, { printingCost: undefined });
    } else if (isValidFormat) {
      const numericValue = parseDecimalInput(value);
      if (numericValue !== null) {
        // console.log(`[usePrintingCostInput ${formatType}] handleChange: Valid numericValue=${numericValue}, updating parent.`);
        onUpdateFormat(formatType, { printingCost: numericValue });
      } else {
        // console.log(`[usePrintingCostInput ${formatType}] handleChange: Format OK, but not parseable. Not updating parent.`);
        // No actualizar el modelo.
      }
    } else {
      // console.log(`[usePrintingCostInput ${formatType}] handleChange: Invalid format. Not updating parent.`);
      // No actualizar el modelo.
    }
  };
  
  useEffect(() => {
    if (isEbook) {
      // console.log(`[usePrintingCostInput ${formatType}] useEffect [isEbook]: Format is ebook. Setting printingCost to 0 and input to "0,00".`);
      const ebookPrintingCostFormatted = formatDecimal(0);
      if (printingCostInput !== ebookPrintingCostFormatted) {
        setPrintingCostInput(ebookPrintingCostFormatted);
      }
      onUpdateFormat(formatType, { printingCost: 0 }); // Asegurar que el modelo tiene 0
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEbook, formatType, onUpdateFormat]); // No incluir printingCostInput o setPrintingCostInput para evitar bucles no deseados.

  return { printingCostInput, error, handleChange, setPrintingCostInput };
};
