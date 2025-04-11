
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../types/bookTypes";
import { Button } from "@/components/ui/button";
import { Link, Copy, Check } from "lucide-react";
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
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  
  const handleLinkChange = (linkKey: string, value: string) => {
    if (onUpdateFormat) {
      const links = { ...(format.links || {}) };
      links[linkKey] = value;
      onUpdateFormat(formatType, { links });
    }
  };
  
  const copyLink = (url: string, key: string) => {
    if (!url) return;
    
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(key);
      toast({
        description: "Enlace copiado al portapapeles"
      });
      
      setTimeout(() => {
        setCopiedLink(null);
      }, 2000);
    }).catch(() => {
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar el enlace",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="grid gap-4">
      <div className="flex items-center">
        <Label className="text-lg font-medium">Enlaces</Label>
        <Separator className="flex-grow ml-3" />
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { key: 'amazon', label: 'Amazon' },
          { key: 'presale', label: 'Preventa' },
          { key: 'reviews', label: 'Reseñas' },
          { key: 'h10Canonical', label: 'H10 Canónico' },
          { key: 'affiliate', label: 'Afiliado' },
          { key: 'leadMagnet', label: 'Lead Magnet' },
          { key: 'newsletter', label: 'Newsletter' },
          { key: 'landingPage', label: 'Landing Page' },
          { key: 'authorCentral', label: 'Author Central' },
        ].map((item) => (
          <div key={item.key} className="grid gap-2">
            <Label htmlFor={`${formatType}-${item.key}`}>{item.label}</Label>
            {isEditing ? (
              <Input
                id={`${formatType}-${item.key}`}
                defaultValue={format.links?.[item.key as keyof typeof format.links]}
                placeholder={`URL de ${item.label}`}
                onChange={(e) => handleLinkChange(item.key, e.target.value)}
              />
            ) : (
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm flex items-center gap-1">
                {format.links?.[item.key as keyof typeof format.links] ? (
                  <>
                    <a
                      href={format.links[item.key as keyof typeof format.links]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary hover:underline flex-1 truncate"
                    >
                      <Link className="mr-1 h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{format.links[item.key as keyof typeof format.links]}</span>
                    </a>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 flex-shrink-0"
                      onClick={() => copyLink(format.links?.[item.key as keyof typeof format.links] || "", item.key)}
                    >
                      {copiedLink === item.key ? <Check size={14} /> : <Copy size={14} />}
                    </Button>
                  </>
                ) : (
                  <span className="text-muted-foreground">No definido</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
