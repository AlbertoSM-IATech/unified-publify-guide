
import { useState, useEffect, useCallback } from "react";
import { BookFormat } from "../../types/bookTypes";

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
    if (royaltyInput !== newRoyaltyInput) {
        setRoyaltyInput(newRoyaltyInput);
    }
     if (isEditing) {
        validate(newRoyaltyInput);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRoyaltyPercentage, isEditing, formatType]);

  const validate = useCallback((value: string): boolean => {
    let fieldHasError = false;
    // Permite un string vacío, ya que se manejará por separado para enviar 'undefined'
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

    // Limpiar valor: permitir solo dígitos
    value = value.replace(/[^\d]/g, '');
    
    // Trim a max 3 dígitos y asegurar que no sea > 100 si son 3 dígitos.
    if (value.length > 3) {
        value = value.substring(0, 3);
    }
    // Si el usuario está escribiendo "100", value será "100". parseInt(value, 10) es 100.
    // Si escribe "101", value será "101". parseInt(value,10) es 101.
    // Esta lógica de capar a "100" debe estar después de setRoyaltyInput si queremos que el usuario vea "101" y luego el error.
    // O antes, para corregirlo automáticamente. Corregir automáticamente es mejor UX.
    if (value.length === 3 && parseInt(value, 10) > 100) {
        value = "100"; 
    }
    
    // console.log(`[useRoyaltyInput ${formatType}] handleChange: cleaned value="${value}"`);
    setRoyaltyInput(value); // Refleja el valor (posiblemente corregido) en el UI

    const isValid = validate(value); // Esto también actualiza el estado de 'error'

    if (value === "") {
    //   console.log(`[useRoyaltyInput ${formatType}] handleChange: Empty value, updating format with royaltyPercentage: undefined`);
      onUpdateFormat(formatType, { royaltyPercentage: undefined });
    } else if (isValid) {
      // isValid implica que value es un string de dígitos y está en el rango 0-100
      const percentageInt = parseInt(value, 10);
      const numericValue = percentageInt / 100;
    //   console.log(`[useRoyaltyInput ${formatType}] handleChange: Valid numericValue=${numericValue}, updating parent.`);
      onUpdateFormat(formatType, { royaltyPercentage: numericValue });
    } else {
    //   console.log(`[useRoyaltyInput ${formatType}] handleChange: Invalid value or out of 0-100 range. Not updating parent.`);
      // El valor no es válido (podría ser que `validate` lo marcó como error, ej. no es número después de limpiar, o fuera de rango si la validación es más compleja)
      // No se llama a onUpdateFormat. El error se muestra.
    }
  };
  
  return { royaltyInput, error, handleChange, setRoyaltyInput };
};
