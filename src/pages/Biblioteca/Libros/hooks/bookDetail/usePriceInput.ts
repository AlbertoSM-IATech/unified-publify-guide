
import { useState, useEffect, useCallback } from "react";
import { BookFormat } from "../../types/bookTypes";
import { formatDecimal, parseDecimalInput } from "../../utils/formatUtils";

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
    
    // Solo actualizar si el valor de la prop realmente es diferente de lo que ya está en el input
    // Esto evita que se sobreescriba la entrada del usuario si el valor de la prop se actualizó a lo mismo que acaba de parsear el input
    if (priceInput !== newPriceInput) {
        setPriceInput(newPriceInput);
    }

    if (isEditing) { 
        validate(newPriceInput);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrice, isEditing, formatType]);


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
    setPriceInput(value); // Siempre refleja la entrada del usuario en el UI

    const isValidFormat = validate(value); // Esto también actualiza el estado de 'error'

    if (value === "") {
      // console.log(`[usePriceInput ${formatType}] handleChange: Empty value, updating format with price: undefined`);
      onUpdateFormat(formatType, { price: undefined });
    } else if (isValidFormat) {
      const numericValue = parseDecimalInput(value);
      if (numericValue !== null) {
        // console.log(`[usePriceInput ${formatType}] handleChange: Valid numericValue=${numericValue}, updating parent.`);
        onUpdateFormat(formatType, { price: numericValue });
      } else {
        // console.log(`[usePriceInput ${formatType}] handleChange: Format OK, but not parseable to full number (e.g., just ','). Not updating parent.`);
        // No se llama a onUpdateFormat aquí, para permitir al usuario continuar escribiendo.
        // El error de validación (si es aplicable, aunque para "," no debería haber) se mostraría.
      }
    } else {
      // console.log(`[usePriceInput ${formatType}] handleChange: Invalid format. Not updating parent.`);
      // El formato no es válido (ej. "abc").
      // validate() ya actualizó el estado de 'error'.
      // No se llama a onUpdateFormat, para evitar que el estado principal
      // con 'undefined' haga que el useEffect borre la entrada inválida del usuario.
    }
  };

  return { priceInput, error, handleChange, setPriceInput };
};
