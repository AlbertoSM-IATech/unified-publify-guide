
import { useState, useEffect, useCallback } from "react";
import { BookFormat } from "../../../types/bookTypes";

interface UseRoyaltyInputProps {
  initialRoyaltyPercentage?: number;
  isEditing: boolean;
  formatType: string;
  onUpdateFormat: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const useRoyaltyInput = ({ initialRoyaltyPercentage, isEditing, formatType, onUpdateFormat }: UseRoyaltyInputProps) => {
  const [royaltyInput, setRoyaltyInput] = useState(
    typeof initialRoyaltyPercentage === 'number' ? (initialRoyaltyPercentage * 100).toString() : ""
  );
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    // console.log(`[useRoyaltyInput ${formatType}] useEffect [initialRoyaltyPercentage]: initialRoyaltyPercentage prop changed to: ${initialRoyaltyPercentage}`);
    const newRoyaltyInput = typeof initialRoyaltyPercentage === 'number' ? (initialRoyaltyPercentage * 100).toString() : "";
    // console.log(`[useRoyaltyInput ${formatType}] useEffect [initialRoyaltyPercentage]: Setting royaltyInput to: "${newRoyaltyInput}" (was: "${royaltyInput}")`);
    setRoyaltyInput(newRoyaltyInput);
     if (isEditing) {
        validate(newRoyaltyInput);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRoyaltyPercentage, isEditing, formatType]);

  const validate = useCallback((value: string): boolean => {
    let fieldHasError = false;
    if (value && (parseInt(value, 10) < 0 || parseInt(value, 10) > 100 || !/^\d+$/.test(value))) {
      setError("El porcentaje debe ser un número entero entre 0 y 100");
      fieldHasError = true;
    } else {
      setError(undefined);
    }
    return !fieldHasError;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // console.log(`[useRoyaltyInput ${formatType}] handleChange: raw value="${value}"`);

    // Allow only digits
    if (!/^\d*$/.test(value)) {
        return; 
    }
    
    // Trim to max 3 digits and ensure it's not above 100 if it becomes 3 digits.
    if (value.length > 3) {
        value = value.substring(0, 3);
    }
    if (value.length === 3 && parseInt(value, 10) > 100) {
        value = "100"; // Cap at 100 if user types e.g., "101" or "999"
    }


    setRoyaltyInput(value);
    const isValid = validate(value);

    if (value === "") {
    //   console.log(`[useRoyaltyInput ${formatType}] handleChange: Empty value, updating format with royaltyPercentage: undefined`);
      onUpdateFormat(formatType, { royaltyPercentage: undefined });
    } else if (isValid) {
      if (/^\d+$/.test(value)) { // Ensure it's a string of digits before parsing
        const percentageInt = parseInt(value, 10);
        // console.log(`[useRoyaltyInput ${formatType}] handleChange: Valid percentage ${percentageInt}%`);
        if (percentageInt >= 0 && percentageInt <= 100) {
          const numericValue = percentageInt / 100;
        //   console.log(`[useRoyaltyInput ${formatType}] handleChange: numericValue=${numericValue}, updating parent.`);
          onUpdateFormat(formatType, { royaltyPercentage: numericValue });
        } else {
        //   console.log(`[useRoyaltyInput ${formatType}] handleChange: Percentage "${value}" out of 0-100 range, not updating parent state.`);
          onUpdateFormat(formatType, { royaltyPercentage: undefined });
        }
      } else {
        // console.log(`[useRoyaltyInput ${formatType}] handleChange: Invalid (non-integer) royalty value "${value}", not updating parent state.`);
        onUpdateFormat(formatType, { royaltyPercentage: undefined });
      }
    } else {
         onUpdateFormat(formatType, { royaltyPercentage: undefined });
    }
  };
  
  return { royaltyInput, error, handleChange, setRoyaltyInput };
};
