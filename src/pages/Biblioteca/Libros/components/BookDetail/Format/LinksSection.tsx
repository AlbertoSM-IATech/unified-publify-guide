
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookFormat } from "../../../types/bookTypes";
import { ExternalLink, Copy, CheckCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
interface LinksSectionProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const LinksSection = ({
  formatType,
  format,
  isEditing,
  onUpdateFormat
}: LinksSectionProps) => {
  const [copied, setCopied] = useState<{[key: string]: boolean}>({});
  
  const handleInputChange = (field: string, value: string) => {
    if (onUpdateFormat) {
      const updateData: Partial<BookFormat> = { links: { ...format.links, [field]: value } };
      onUpdateFormat(formatType, updateData);
    }
  };
  
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied({...copied, [label]: true});
      toast({
        description: `Enlace de ${label} copiado al portapapeles`
      });
      setTimeout(() => {
        setCopied({...copied, [label]: false});
      }, 2000);
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h3 className="text-lg font-semibold text-blue-500">Enlaces</h3>
        <Separator className="flex-grow ml-3" />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Amazon Link */}
        <div className="grid gap-3">
          <Label htmlFor={`${formatType}-amazon-link`}>Enlace de Amazon</Label>
          {isEditing ? (
            <Input 
              id={`${formatType}-amazon-link`} 
              defaultValue={format.links?.amazon || ""} 
              placeholder="https://amazon.com/dp/ASIN"
              onChange={e => handleInputChange('amazon', e.target.value)} 
            />
          ) : (
            <div className="flex items-center gap-2">
              {format.links?.amazon ? (
                <>
                  <a 
                    href={format.links.amazon} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#3B82F6] hover:text-[#FB923C] hover:underline border rounded-md p-2 bg-card shadow-sm flex-grow"
                  >
                    <ExternalLink size={14} className="mr-2" />
                    <span className="text-sm truncate">{format.links.amazon}</span>
                  </a>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="flex-shrink-0"
                    onClick={() => copyToClipboard(format.links.amazon, 'Amazon')}
                  >
                    {copied['Amazon'] ? <CheckCheck size={16} /> : <Copy size={16} />}
                  </Button>
                </>
              ) : (
                <div className="border rounded-md p-2 bg-card shadow-sm text-sm">No definido</div>
              )}
            </div>
          )}
        </div>
        
        {/* Landing Page Link */}
        <div className="grid gap-3">
          <Label htmlFor={`${formatType}-landing-link`}>Enlace de Landing Page</Label>
          {isEditing ? (
            <Input 
              id={`${formatType}-landing-link`} 
              defaultValue={format.links?.landingPage || ""} 
              placeholder="https://mipagina.com/libro"
              onChange={e => handleInputChange('landingPage', e.target.value)} 
            />
          ) : (
            <div className="flex items-center gap-2">
              {format.links?.landingPage ? (
                <>
                  <a 
                    href={format.links.landingPage} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#3B82F6] hover:text-[#FB923C] hover:underline border rounded-md p-2 bg-card shadow-sm flex-grow"
                  >
                    <ExternalLink size={14} className="mr-2" />
                    <span className="text-sm truncate">{format.links.landingPage}</span>
                  </a>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="flex-shrink-0"
                    onClick={() => copyToClipboard(format.links.landingPage, 'Landing Page')}
                  >
                    {copied['Landing Page'] ? <CheckCheck size={16} /> : <Copy size={16} />}
                  </Button>
                </>
              ) : (
                <div className="border rounded-md p-2 bg-card shadow-sm text-sm">No definido</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
