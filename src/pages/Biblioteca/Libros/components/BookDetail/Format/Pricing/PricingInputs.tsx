
import { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../../types/bookTypes";

interface PricingInputsProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const PricingInputs = ({
  formatType,
  format,
  isEditing,
  onUpdateFormat
}: PricingInputsProps) => {
  // Function to normalize decimal input with comma or dot
  const normalizeDecimal = (value: string): number => {
    // Replace comma with dot for calculation
    const normalized = value.replace(',', '.');
    return parseFloat(normalized);
  };

  const handleInputChange = (field: keyof BookFormat, value: string | number) => {
    if (onUpdateFormat) {
      const updateData: Partial<BookFormat> = {};
      
      if (field === 'price' || field === 'royaltyPercentage' || field === 'printingCost') {
        // For decimal inputs, normalize the value
        if (typeof value === 'string') {
          // Handle potential empty strings or invalid inputs
          if (value === '' || isNaN(normalizeDecimal(value))) {
            updateData[field as keyof BookFormat] = 0;
          } else {
            updateData[field as keyof BookFormat] = normalizeDecimal(value);
          }
        } else {
          updateData[field as keyof BookFormat] = value;
        }
      } else {
        updateData[field as keyof BookFormat] = value;
      }
      
      onUpdateFormat(formatType, updateData);
    }
  };

  // Format display value for inputs (replace dot with comma for Spanish format)
  const formatDisplayValue = (value: number | undefined): string => {
    if (value === undefined) return "";
    return value.toString().replace('.', ',');
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Precio */}
      <div className="grid gap-3">
        <Label htmlFor={`${formatType}-price`}>Precio</Label>
        {isEditing ? (
          <Input 
            id={`${formatType}-price`} 
            type="text" 
            defaultValue={formatDisplayValue(format.price)} 
            placeholder="Ej. 19,99" 
            onChange={e => handleInputChange('price', e.target.value)}
          />
        ) : (
          <div className="border rounded-md p-2 bg-card shadow-sm text-sm">
            {format.price ? `${format.price.toFixed(2).replace('.', ',')}€` : "No definido"}
          </div>
        )}
      </div>
      
      {/* Porcentaje de Regalías */}
      <div className="grid gap-3">
        <Label htmlFor={`${formatType}-royalty`}>Porcentaje de Regalías</Label>
        {isEditing ? (
          <div className="flex items-center">
            <Input 
              id={`${formatType}-royalty`} 
              type="text" 
              defaultValue={format.royaltyPercentage ? format.royaltyPercentage : ""} 
              placeholder="Ej. 0,70" 
              onChange={e => handleInputChange('royaltyPercentage', e.target.value)}
            />
          </div>
        ) : (
          <div className="border rounded-md p-2 bg-card shadow-sm text-sm">
            {format.royaltyPercentage ? `${(format.royaltyPercentage * 100).toFixed(0)}%` : "No definido"}
          </div>
        )}
      </div>
      
      {/* Coste de impresión (solo para libros físicos) */}
      {formatType !== "ebook" && (
        <div className="grid gap-3">
          <Label htmlFor={`${formatType}-printing-cost`}>Coste de Impresión</Label>
          {isEditing ? (
            <Input 
              id={`${formatType}-printing-cost`} 
              type="text"
              defaultValue={formatDisplayValue(format.printingCost)} 
              placeholder="Ej. 3,50" 
              onChange={e => handleInputChange('printingCost', e.target.value)}
            />
          ) : (
            <div className="border rounded-md p-2 bg-card shadow-sm text-sm">
              {format.printingCost !== undefined ? `${format.printingCost.toFixed(2).replace('.', ',')}€` : "No definido"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
