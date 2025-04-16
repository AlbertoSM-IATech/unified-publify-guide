
import { Separator } from "@/components/ui/separator";
import { PricingInputs } from "./PricingInputs";
import { PricingResults } from "./PricingResults";
import { BookFormat } from "../../../../types/bookTypes";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#FB923C]/10 to-transparent border-b">
          <div className="flex items-center">
            <h3 className="text-lg font-semibold text-[#FB923C]">Información de Precios</h3>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <PricingInputs 
            formatType={formatType} 
            format={format} 
            isEditing={isEditing} 
            onUpdateFormat={onUpdateFormat} 
          />
          
          <PricingResults 
            format={format} 
            calculateNetRoyalties={calculateNetRoyalties} 
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};
