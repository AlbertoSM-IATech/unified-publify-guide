import { Separator } from "@/components/ui/separator";
import { PricingInputs } from "./PricingInputs";
import { PricingResults } from "./PricingResults";
import { BookFormat } from "../../../../types/bookTypes";
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
  return <div className="space-y-6">
      <div className="flex items-center">
        <h3 className="text-lg font-semibold text-blue-500">Información de Precios</h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
      <PricingInputs formatType={formatType} format={format} isEditing={isEditing} onUpdateFormat={onUpdateFormat} />
      
      <PricingResults format={format} calculateNetRoyalties={calculateNetRoyalties} />
    </div>;
};