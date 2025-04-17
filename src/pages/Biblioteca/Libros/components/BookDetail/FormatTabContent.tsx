
import { BookFormat } from "../../types/bookTypes";
import { PricingSection } from "./Format/Pricing/PricingSection";
import { LinksSection } from "./Format/LinksSection";
import { FileSection } from "./Format/FileSection";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

interface FormatTabContentProps {
  formatType: string;
  format?: BookFormat;
  isEditing: boolean;
  calculateNetRoyalties: (format?: BookFormat) => string;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const FormatTabContent = ({
  formatType,
  format,
  isEditing,
  calculateNetRoyalties,
  onUpdateFormat
}: FormatTabContentProps) => {
  // If no format data is available, show a placeholder state
  if (!format) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-8 text-muted-foreground"
      >
        <p>No hay información disponible para este formato.</p>
        {isEditing && (
          <p className="mt-2 text-sm">
            Comienza a editar para agregar detalles de este formato.
          </p>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* Pricing Section */}
      <PricingSection 
        formatType={formatType} 
        format={format} 
        isEditing={isEditing} 
        calculateNetRoyalties={calculateNetRoyalties}
        onUpdateFormat={onUpdateFormat}
      />
      
      <Separator className="my-6" />
      
      {/* Links Section */}
      <LinksSection 
        formatType={formatType}
        format={format}
        isEditing={isEditing}
        onUpdateFormat={onUpdateFormat}
      />
      
      <Separator className="my-6" />
      
      {/* Files Section */}
      <FileSection 
        formatType={formatType}
        format={format}
        isEditing={isEditing}
        onUpdateFormat={onUpdateFormat}
      />
    </motion.div>
  );
};
