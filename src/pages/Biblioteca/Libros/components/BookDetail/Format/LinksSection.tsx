
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../types/bookTypes";
import { Link } from "lucide-react";

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
  
  const handleLinkChange = (linkKey: string, value: string) => {
    if (onUpdateFormat) {
      const links = { ...(format.links || {}) };
      links[linkKey] = value;
      onUpdateFormat(formatType, { links });
    }
  };

  return (
    <div className="grid gap-4">
      <Label>Enlaces</Label>
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
              <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                {format.links?.[item.key as keyof typeof format.links] ? (
                  <a
                    href={format.links[item.key as keyof typeof format.links]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-primary hover:underline"
                  >
                    <Link className="mr-1 h-3 w-3" />
                    {format.links[item.key as keyof typeof format.links]}
                  </a>
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
