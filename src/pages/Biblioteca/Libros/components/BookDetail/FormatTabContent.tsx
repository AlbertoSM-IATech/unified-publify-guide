
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BookFormat } from "../../types/bookTypes";
import { FileSection } from "./Format/FileSection";
import { LinksSection } from "./Format/LinksSection";
import { PricingSection } from "./Format/Pricing";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  if (!format) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        {isEditing ? (
          <div className="text-center">
            <p className="mb-4">No hay información para este formato</p>
            <Button variant="outline" size="sm">
              Añadir información para {formatType === "hardcover" ? "Tapa Dura" : formatType === "paperback" ? "Tapa Blanda" : "eBook"}
            </Button>
          </div>
        ) : (
          <div>No hay información para este formato</div>
        )}
      </div>
    );
  }

  const handleInputChange = (field: keyof BookFormat, value: string | number) => {
    if (onUpdateFormat) {
      const updateData: Partial<BookFormat> = {};
      updateData[field as keyof BookFormat] = value as any;
      onUpdateFormat(formatType, updateData);
    }
  };

  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.div 
      className="grid gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {/* Información general */}
      <motion.div variants={sectionVariants}>
        <Card className="shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-transparent border-b">
            <h3 className="text-lg font-semibold text-blue-500">Información General</h3>
          </CardHeader>
          
          <CardContent className="p-6">
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
                      onChange={e => handleInputChange('dimensions', e.target.value)} 
                    />
                  ) : (
                    <div className="border rounded-md p-2 bg-card shadow-sm text-sm">
                      {format.dimensions || "No definidas"}
                    </div>
                  )}
                </div>
              )}

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
                      onChange={e => handleInputChange('pages', parseInt(e.target.value))} 
                    />
                  ) : (
                    <div className="border rounded-md p-2 bg-card shadow-sm text-sm">
                      {format.pages || "No definido"}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Sección de precios */}
      <motion.div variants={sectionVariants}>
        <PricingSection 
          formatType={formatType} 
          format={format} 
          isEditing={isEditing} 
          onUpdateFormat={onUpdateFormat} 
          calculateNetRoyalties={calculateNetRoyalties} 
        />
      </motion.div>

      {/* Archivos adjuntos */}
      <motion.div variants={sectionVariants}>
        <Card className="shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-transparent border-b">
            <h3 className="text-lg font-semibold text-purple-500">Archivos Adjuntos</h3>
          </CardHeader>
          <CardContent className="p-6">
            <FileSection 
              formatType={formatType} 
              format={format} 
              isEditing={isEditing} 
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Enlaces */}
      <motion.div variants={sectionVariants}>
        <Card className="shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-transparent border-b">
            <h3 className="text-lg font-semibold text-green-500">Enlaces</h3>
          </CardHeader>
          <CardContent className="p-6">
            <LinksSection 
              formatType={formatType} 
              format={format} 
              isEditing={isEditing} 
              onUpdateFormat={onUpdateFormat} 
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Estrategia */}
      <motion.div variants={sectionVariants}>
        <Card className="shadow-md border border-slate-200 dark:border-slate-800 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[#FB923C]/10 to-transparent border-b">
            <h3 className="text-lg font-semibold text-[#FB923C]">Estrategia</h3>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-3">
              <Label htmlFor={`${formatType}-strategy`}>Estrategia</Label>
              {isEditing ? (
                <Textarea 
                  id={`${formatType}-strategy`} 
                  defaultValue={format.strategy} 
                  placeholder="Describe la estrategia de marketing, posicionamiento, etc." 
                  rows={4} 
                  onChange={e => handleInputChange('strategy', e.target.value)} 
                />
              ) : (
                <div className="rounded-md border bg-card p-3 text-sm shadow-sm">
                  {format.strategy || "No hay estrategia definida"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
