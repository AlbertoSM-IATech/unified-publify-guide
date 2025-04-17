
import { useState } from "react";
import { BookFormat } from "../../types/bookTypes";
import { PricingSection } from "./Format/Pricing/PricingSection";
import { FileSection } from "./Format/FileSection";
import { LinksSection } from "./Format/LinksSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FormatTabContentProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const FormatTabContent = ({
  formatType,
  format,
  isEditing,
  onUpdateFormat,
}: FormatTabContentProps) => {
  const [subTab, setSubTab] = useState<string>("pricing");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pricing" className="w-full" onValueChange={setSubTab}>
        <TabsList className="grid w-full grid-cols-3 mb-5">
          <TabsTrigger value="pricing">
            Precio y Regalías
          </TabsTrigger>
          <TabsTrigger value="files">
            Archivos
          </TabsTrigger>
          <TabsTrigger value="links">
            Enlaces
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pricing" className="mt-0">
          <PricingSection
            formatType={formatType}
            format={format}
            isEditing={isEditing}
            onUpdateFormat={onUpdateFormat}
          />
        </TabsContent>
        
        <TabsContent value="files" className="mt-0">
          <FileSection
            formatType={formatType}
            format={format}
            isEditing={isEditing}
            onUpdateFormat={onUpdateFormat}
          />
        </TabsContent>
        
        <TabsContent value="links" className="mt-0">
          <LinksSection
            formatType={formatType}
            format={format}
            isEditing={isEditing}
            onUpdateFormat={onUpdateFormat}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
