import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookFormat } from "../../types/bookTypes";
import { FileSection } from "./Format/FileSection";
import { LinksSection } from "./Format/LinksSection";
import { PricingSection } from "./Format/Pricing";
import { Separator } from "@/components/ui/separator";
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
  if (!format) {
    return <div className="flex h-48 items-center justify-center text-muted-foreground">
        {isEditing ? <div className="text-center">
            <p className="mb-4">No hay información para este formato</p>
            <Button variant="outline" size="sm">
              Añadir información para {formatType === "hardcover" ? "Tapa Dura" : formatType === "paperback" ? "Tapa Blanda" : "eBook"}
            </Button>
          </div> : <div>No hay información para este formato</div>}
      </div>;
  }
  const handleInputChange = (field: keyof BookFormat, value: string | number) => {
    if (onUpdateFormat) {
      const updateData: Partial<BookFormat> = {};
      updateData[field as keyof BookFormat] = value as any;
      onUpdateFormat(formatType, updateData);
    }
  };
  return <div className="grid gap-6">
      <div className="space-y-6">
        <div className="flex items-center">
          <h3 className="text-lg font-semibold text-blue-500">Información General</h3>
          <Separator className="flex-grow ml-3" />
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Dimensiones */}
          {formatType !== "ebook" && <div className="grid gap-3">
              <Label htmlFor={`${formatType}-dimensions`}>Dimensiones</Label>
              {isEditing ? <Input id={`${formatType}-dimensions`} defaultValue={format.dimensions} placeholder="Ej. 15.24 x 22.86 cm" onChange={e => handleInputChange('dimensions', e.target.value)} /> : <div>{format.dimensions || "No definidas"}</div>}
            </div>}

          {/* ISBN */}
          {formatType !== "ebook" && <div className="grid gap-3">
              <Label htmlFor={`${formatType}-isbn`}>ISBN</Label>
              {isEditing ? <Input id={`${formatType}-isbn`} defaultValue={format.isbn} placeholder="ISBN" onChange={e => handleInputChange('isbn', e.target.value)} /> : <div>{format.isbn || "No definido"}</div>}
            </div>}
          
          {/* ASIN - Ahora para todos los formatos */}
          <div className="grid gap-3">
            <Label htmlFor={`${formatType}-asin`}>ASIN</Label>
            {isEditing ? <Input id={`${formatType}-asin`} defaultValue={format.asin} placeholder="ASIN" onChange={e => handleInputChange('asin', e.target.value)} /> : <div>{format.asin || "No definido"}</div>}
          </div>

          {/* Número de páginas */}
          {formatType !== "ebook" && <div className="grid gap-3">
              <Label htmlFor={`${formatType}-pages`}>Número de páginas</Label>
              {isEditing ? <Input id={`${formatType}-pages`} type="number" defaultValue={format.pages} placeholder="Ej. 300" onChange={e => handleInputChange('pages', parseInt(e.target.value))} /> : <div>{format.pages || "No definido"}</div>}
            </div>}
        </div>
      </div>

      {/* Sección de precios */}
      <PricingSection formatType={formatType} format={format} isEditing={isEditing} onUpdateFormat={onUpdateFormat} calculateNetRoyalties={calculateNetRoyalties} />

      {/* Archivos adjuntos */}
      <FileSection formatType={formatType} format={format} isEditing={isEditing} />

      {/* Enlaces */}
      <LinksSection formatType={formatType} format={format} isEditing={isEditing} onUpdateFormat={onUpdateFormat} />

      {/* Estrategia */}
      <div className="space-y-4">
        <div className="flex items-center">
          <h3 className="text-lg font-medium">Estrategia</h3>
          <Separator className="flex-grow ml-3" />
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor={`${formatType}-strategy`}>Estrategia</Label>
          {isEditing ? <Textarea id={`${formatType}-strategy`} defaultValue={format.strategy} placeholder="Describe la estrategia de marketing, posicionamiento, etc." rows={4} onChange={e => handleInputChange('strategy', e.target.value)} /> : <div className="rounded-md bg-muted p-3 text-sm">
              {format.strategy || "No hay estrategia definida"}
            </div>}
        </div>
      </div>
    </div>;
};