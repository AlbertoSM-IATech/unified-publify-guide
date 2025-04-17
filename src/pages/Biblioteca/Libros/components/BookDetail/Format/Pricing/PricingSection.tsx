
import { Separator } from "@/components/ui/separator";
import { PricingInputs } from "./PricingInputs";
import { PricingResults } from "./PricingResults";
import { BookFormat } from "../../../../types/bookTypes";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";

interface PricingSectionProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const PricingSection = ({
  formatType,
  format,
  isEditing,
  onUpdateFormat
}: PricingSectionProps) => {
  const [shouldCalculate, setShouldCalculate] = useState(false);
  
  // This will force the PricingResults to recalculate
  const triggerCalculation = () => {
    setShouldCalculate(prev => !prev);
  };
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
        <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
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
            triggerCalculation={triggerCalculation}
          />
          
          <PricingResults 
            format={format}
            calculationKey={shouldCalculate}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};
