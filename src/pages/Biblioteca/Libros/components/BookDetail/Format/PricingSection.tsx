import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../types/bookTypes";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
interface PricingSectionProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  calculateNetRoyalties: (format?: BookFormat) => string;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
}
export const PricingSection = ({
  formatType,
  format,
  isEditing,
  calculateNetRoyalties,
  onUpdateFormat
}: PricingSectionProps) => {
  const [netRoyalties, setNetRoyalties] = useState("0.00");

  // Update net royalties when format data changes
  useEffect(() => {
    setNetRoyalties(calculateNetRoyalties(format));
  }, [format, calculateNetRoyalties]);
  const handleInputChange = (field: keyof BookFormat, value: string | number) => {
    if (onUpdateFormat) {
      const updateData: Partial<BookFormat> = {};
      updateData[field as keyof BookFormat] = field === 'price' || field === 'royaltyPercentage' || field === 'printingCost' ? parseFloat(value.toString()) : value;
      onUpdateFormat(formatType, updateData);
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center">
        <h3 className="text-lg font-semibold">Información de Precios</h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Precio */}
        <div className="grid gap-3">
          <Label htmlFor={`${formatType}-price`}>Precio</Label>
          {isEditing ? <Input id={`${formatType}-price`} type="number" step="0.01" defaultValue={format.price} placeholder="Ej. 19.99" onChange={e => handleInputChange('price', parseFloat(e.target.value))} /> : <div>{format.price ? `${format.price.toFixed(2)}€` : "No definido"}</div>}
        </div>
        
        {/* Porcentaje de Regalías */}
        <div className="grid gap-3">
          <Label htmlFor={`${formatType}-royalty`}>Porcentaje de Regalías</Label>
          {isEditing ? <div className="flex items-center">
              <Input id={`${formatType}-royalty`} type="number" step="0.01" min="0" max="1" defaultValue={format.royaltyPercentage} placeholder="Ej. 0.70" onChange={e => handleInputChange('royaltyPercentage', parseFloat(e.target.value))} />
              
            </div> : <div>{format.royaltyPercentage ? `${(format.royaltyPercentage * 100).toFixed(0)}%` : "No definido"}</div>}
        </div>
        
        {/* Coste de impresión (solo para libros físicos) */}
        {formatType !== "ebook" && <div className="grid gap-3">
            <Label htmlFor={`${formatType}-printing-cost`}>Coste de Impresión</Label>
            {isEditing ? <Input id={`${formatType}-printing-cost`} type="number" step="0.01" defaultValue={format.printingCost} placeholder="Ej. 3.50" onChange={e => handleInputChange('printingCost', parseFloat(e.target.value))} /> : <div>{format.printingCost !== undefined ? `${format.printingCost.toFixed(2)}€` : "No definido"}</div>}
          </div>}
      </div>
      
      {/* Mostrar regalías netas calculadas */}
      <div className="mt-4 p-3 bg-muted rounded-md">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Regalías netas (estimado):</span>
          <span className="text-xl font-bold text-green-600">{netRoyalties}€</span>
        </div>
      </div>
    </div>;
};