
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../types/bookTypes";

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
  const netRoyalties = calculateNetRoyalties(format);

  const handleInputChange = (field: keyof BookFormat, value: number) => {
    if (onUpdateFormat) {
      const updateData: Partial<BookFormat> = {};
      // Use type assertion to fix the type error
      updateData[field] = value as any;
      onUpdateFormat(formatType, updateData);
    }
  };

  return (
    <Card className="border border-border">
      <CardContent className="p-4">
        <h3 className="mb-4 text-lg font-medium">Información de Precios</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor={`${formatType}-price`}>Precio de venta</Label>
            {isEditing ? (
              <Input 
                id={`${formatType}-price`} 
                type="number"
                step="0.01"
                defaultValue={format.price} 
                placeholder="Ej. 24.99"
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
              />
            ) : (
              <div>{format.price ? `${format.price}€` : "No definido"}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${formatType}-royalty`}>% de regalías</Label>
            {isEditing ? (
              <Input 
                id={`${formatType}-royalty`} 
                type="number"
                step="0.01"
                defaultValue={format.royaltyPercentage ? format.royaltyPercentage * 100 : ""} 
                placeholder="Ej. 60"
                onChange={(e) => handleInputChange('royaltyPercentage', parseFloat(e.target.value) / 100)}
              />
            ) : (
              <div>{format.royaltyPercentage ? `${format.royaltyPercentage * 100}%` : "No definido"}</div>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${formatType}-printing`}>Costo de impresión</Label>
            {isEditing ? (
              <Input 
                id={`${formatType}-printing`} 
                type="number"
                step="0.01"
                defaultValue={format.printingCost} 
                placeholder="Ej. 5.50"
                onChange={(e) => handleInputChange('printingCost', parseFloat(e.target.value))}
              />
            ) : (
              <div>{format.printingCost !== undefined ? `${format.printingCost}€` : "No definido"}</div>
            )}
          </div>
        </div>
        <div className="mt-4 rounded-md bg-muted p-3">
          <div className="flex justify-between">
            <span className="font-medium">Regalías netas:</span>
            <span className="font-semibold text-xl font-secondary text-green-600">{netRoyalties}€</span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            Fórmula: Precio venta sin IVA x % de regalías - precio de impresión
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
