
import { useState } from "react";
import { BookFormat } from "../../types/bookTypes";
import { PricingSection } from "./Format/Pricing/PricingSection";
import { FileSection } from "./Format/FileSection";
import { LinksSection } from "./Format/LinksSection";
import { TechnicalSection } from "./Format/TechnicalSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CircleDollarSign, 
  FileText, 
  Link,
  Settings
} from "lucide-react";

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
  const [subTab, setSubTab] = useState<string>("technical");

  return (
    <div className="space-y-6">
      <Tabs defaultValue="technical" className="w-full" onValueChange={setSubTab}>
        <TabsList className="grid w-full grid-cols-4 mb-5">
          <TabsTrigger value="technical">
            <div className="flex items-center gap-2">
              <Settings size={16} />
              <span className="hidden md:block">Técnico</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="pricing">
            <div className="flex items-center gap-2">
              <CircleDollarSign size={16} />
              <span className="hidden md:block">Precios</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="files">
            <div className="flex items-center gap-2">
              <FileText size={16} />
              <span className="hidden md:block">Archivos</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="links">
            <div className="flex items-center gap-2">
              <Link size={16} />
              <span className="hidden md:block">Enlaces</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="technical" className="mt-0">
          <TechnicalSection
            formatType={formatType}
            format={format}
            isEditing={isEditing}
            onUpdateFormat={onUpdateFormat}
          />
        </TabsContent>
        
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
