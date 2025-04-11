
import { useState } from "react";
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
  const handleInputChange = (field: keyof BookFormat, value: string | number) => {
    if (onUpdateFormat) {
      const updateData: Partial<BookFormat> = {};
      updateData[field as keyof BookFormat] = field === 'price' || field === 'royaltyPercentage' || field === 'printingCost' 
        ? parseFloat(value.toString()) 
        : value;
      onUpdateFormat(formatType, updateData);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Precio */}
      <div className="grid gap-3">
        <Label htmlFor={`${formatType}-price`}>Precio</Label>
        {isEditing ? (
          <Input 
            id={`${formatType}-price`} 
            type="number" 
            step="0.01" 
            defaultValue={format.price} 
            placeholder="Ej. 19.99" 
            onChange={e => handleInputChange('price', parseFloat(e.target.value))} 
          />
        ) : (
          <div>{format.price ? `${format.price.toFixed(2)}€` : "No definido"}</div>
        )}
      </div>
      
      {/* Porcentaje de Regalías */}
      <div className="grid gap-3">
        <Label htmlFor={`${formatType}-royalty`}>Porcentaje de Regalías</Label>
        {isEditing ? (
          <div className="flex items-center">
            <Input 
              id={`${formatType}-royalty`} 
              type="number" 
              step="0.01" 
              min="0" 
              max="1" 
              defaultValue={format.royaltyPercentage} 
              placeholder="Ej. 0.70" 
              onChange={e => handleInputChange('royaltyPercentage', parseFloat(e.target.value))} 
            />
          </div>
        ) : (
          <div>{format.royaltyPercentage ? `${(format.royaltyPercentage * 100).toFixed(0)}%` : "No definido"}</div>
        )}
      </div>
      
      {/* Coste de impresión (solo para libros físicos) */}
      {formatType !== "ebook" && (
        <div className="grid gap-3">
          <Label htmlFor={`${formatType}-printing-cost`}>Coste de Impresión</Label>
          {isEditing ? (
            <Input 
              id={`${formatType}-printing-cost`} 
              type="number" 
              step="0.01" 
              defaultValue={format.printingCost} 
              placeholder="Ej. 3.50" 
              onChange={e => handleInputChange('printingCost', parseFloat(e.target.value))} 
            />
          ) : (
            <div>{format.printingCost !== undefined ? `${format.printingCost.toFixed(2)}€` : "No definido"}</div>
          )}
        </div>
      )}
    </div>
  );
};
