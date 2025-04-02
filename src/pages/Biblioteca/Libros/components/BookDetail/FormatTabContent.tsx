
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookFormat } from "../../types/bookTypes";
import { File, Image, Link, Upload, X } from "lucide-react";
import { FileSection } from "./Format/FileSection";
import { LinksSection } from "./Format/LinksSection";
import { PricingSection } from "./Format/PricingSection";

interface FormatTabContentProps { 
  formatType: string; 
  format?: BookFormat; 
  isEditing: boolean; 
  calculateNetRoyalties: (format?: BookFormat) => string; 
}

export const FormatTabContent = ({ 
  formatType, 
  format, 
  isEditing, 
  calculateNetRoyalties 
}: FormatTabContentProps) => {
  if (!format) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        {isEditing ? (
          <div className="text-center">
            <p className="mb-4">No hay información para este formato</p>
            <Button variant="outline" size="sm">
              Añadir información para {formatType === "hardcover" ? "Tapa Dura" : 
                formatType === "paperback" ? "Tapa Blanda" : "eBook"}
            </Button>
          </div>
        ) : (
          <div>No hay información para este formato</div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Dimensiones */}
        {formatType !== "ebook" && (
          <div className="grid gap-3">
            <Label htmlFor={`${formatType}-dimensions`}>Dimensiones</Label>
            {isEditing ? (
              <Input 
                id={`${formatType}-dimensions`} 
                defaultValue={format.dimensions} 
                placeholder="Ej. 15.24 x 22.86 cm" 
              />
            ) : (
              <div>{format.dimensions || "No definidas"}</div>
            )}
          </div>
        )}

        {/* ISBN o ASIN */}
        <div className="grid gap-3">
          <Label htmlFor={`${formatType}-code`}>
            {formatType === "ebook" ? "ASIN" : "ISBN"}
          </Label>
          {isEditing ? (
            <Input 
              id={`${formatType}-code`} 
              defaultValue={formatType === "ebook" ? format.asin : format.isbn} 
              placeholder={formatType === "ebook" ? "ASIN" : "ISBN"} 
            />
          ) : (
            <div>{formatType === "ebook" ? format.asin : format.isbn || "No definido"}</div>
          )}
        </div>

        {/* Número de páginas */}
        {formatType !== "ebook" && (
          <div className="grid gap-3">
            <Label htmlFor={`${formatType}-pages`}>Número de páginas</Label>
            {isEditing ? (
              <Input 
                id={`${formatType}-pages`} 
                type="number"
                defaultValue={format.pages} 
                placeholder="Ej. 300" 
              />
            ) : (
              <div>{format.pages || "No definido"}</div>
            )}
          </div>
        )}
      </div>

      {/* Sección de precios */}
      <PricingSection
        formatType={formatType}
        format={format}
        isEditing={isEditing}
        calculateNetRoyalties={calculateNetRoyalties}
      />

      {/* Archivos adjuntos */}
      <FileSection 
        formatType={formatType} 
        format={format} 
        isEditing={isEditing} 
      />

      {/* Enlaces */}
      <LinksSection 
        formatType={formatType} 
        format={format} 
        isEditing={isEditing} 
      />

      {/* Estrategia */}
      <div className="grid gap-3">
        <Label htmlFor={`${formatType}-strategy`}>Estrategia</Label>
        {isEditing ? (
          <Textarea
            id={`${formatType}-strategy`}
            defaultValue={format.strategy}
            placeholder="Describe la estrategia de marketing, posicionamiento, etc."
            rows={4}
          />
        ) : (
          <div className="rounded-md bg-muted p-3 text-sm">
            {format.strategy || "No hay estrategia definida"}
          </div>
        )}
      </div>
    </div>
  );
};
