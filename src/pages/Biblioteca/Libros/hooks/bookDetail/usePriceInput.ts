
import { useState, useEffect, useCallback } from "react";
import { BookFormat } from "../../../types/bookTypes";
import { formatDecimal, parseDecimalInput } from "../../../utils/formatUtils";

interface UsePriceInputProps {
  initialPrice?: number;
  isEditing: boolean;
  formatType: string;
  onUpdateFormat: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const usePriceInput = ({ initialPrice, isEditing, formatType, onUpdateFormat }: UsePriceInputProps) => {
  const [priceInput, setPriceInput] = useState(
    typeof initialPrice === 'number' ? formatDecimal(initialPrice) : ""
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    // console.log(`[usePriceInput ${formatType}] useEffect [initialPrice]: initialPrice prop changed to: ${initialPrice}`);
    const newPriceInput = typeof initialPrice === 'number' ? formatDecimal(initialPrice) : "";
    // console.log(`[usePriceInput ${formatType}] useEffect [initialPrice]: Setting priceInput to: "${newPriceInput}" (was: "${priceInput}")`);
    setPriceInput(newPriceInput);
    if (isEditing) { // Only validate if editing to avoid showing errors initially on non-edited fields
        validate(newPriceInput);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrice, isEditing, formatType]); // Added formatType and isEditing as per hook's scope


  const validate = useCallback((value: string): boolean => {
    let fieldHasError = false;
    if (value && !/^[0-9]*([.,][0-9]{0,2})?$/.test(value)) {
      setError("El precio debe tener formato válido (ej. 12,99)");
      fieldHasError = true;
    } else {
      setError(undefined);
    }
    return !fieldHasError;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // console.log(`[usePriceInput ${formatType}] handleChange: value="${value}"`);
    setPriceInput(value);

    const isValid = validate(value);

    if (value === "") {
    //   console.log(`[usePriceInput ${formatType}] handleChange: Empty value, updating format with price: undefined`);
      onUpdateFormat(formatType, { price: undefined });
    } else if (isValid) {
      const numericValue = parseDecimalInput(value);
    //   console.log(`[usePriceInput ${formatType}] handleChange: Non-empty value, numericValue=${numericValue}`);
      if (numericValue !== null) {
        // console.log(`[usePriceInput ${formatType}] handleChange: Valid numericValue, updating format with price: ${numericValue}`);
        onUpdateFormat(formatType, { price: numericValue });
      } else {
        // console.log(`[usePriceInput ${formatType}] handleChange: Invalid non-empty value ("${value}"), not updating parent state (or setting to undefined).`);
        // Potentially set to undefined if parseDecimalInput returns null for an invalid but non-empty string.
        onUpdateFormat(formatType, { price: undefined });
      }
    } else {
        // If not valid and not empty, call onUpdateFormat with undefined to signify an invalid entry that shouldn't be saved as a number
        onUpdateFormat(formatType, { price: undefined });
    }
  };

  return { priceInput, error, handleChange, setPriceInput };
};
