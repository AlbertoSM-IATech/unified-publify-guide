
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookFormat } from "../../../types/bookTypes";
import { isValidASIN, isValidISBN, formatISBN } from "../../../utils/validationUtils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface TechnicalSectionProps {
  formatType: string;
  format: BookFormat;
  isEditing: boolean;
  onUpdateFormat?: (formatType: string, updatedData: Partial<BookFormat>) => void;
}

export const TechnicalSection = ({
  formatType,
  format,
  isEditing,
  onUpdateFormat
}: TechnicalSectionProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    const newErrors = { ...errors };
    
    if (field === 'isbn' && value && !isValidISBN(value)) {
      newErrors.isbn = "El ISBN debe tener 13 dígitos";
    } else if (field === 'isbn') {
      delete newErrors.isbn;
    }
    
    if (field === 'asin' && value && !isValidASIN(value)) {
      newErrors.asin = "El ASIN debe tener 10 caracteres alfanuméricos";
    } else if (field === 'asin') {
      delete newErrors.asin;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: string) => {
    if (validateField(field, value) && onUpdateFormat) {
      onUpdateFormat(formatType, {
        [field]: value
      });
    }
  };

  // Determine if this is an ebook (no dimensions or pages for ebooks)
  const isEbook = formatType === 'ebook';

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* ISBN Field */}
        <div className="grid gap-2">
          <Label htmlFor={`${formatType}-isbn`}>ISBN-13</Label>
          {isEditing ? (
            <div className="space-y-2">
              <Input
                id={`${formatType}-isbn`}
                placeholder="978XXXXXXXXXX"
                value={format.isbn || ""}
                onChange={(e) => handleChange('isbn', e.target.value)}
                className={errors.isbn ? "border-red-500" : ""}
              />
              {errors.isbn && (
                <p className="text-xs text-red-500">{errors.isbn}</p>
              )}
            </div>
          ) : (
            <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.isbn ? formatISBN(format.isbn) : "No definido"}
            </div>
          )}
        </div>
        
        {/* ASIN Field */}
        <div className="grid gap-2">
          <Label htmlFor={`${formatType}-asin`}>ASIN</Label>
          {isEditing ? (
            <div className="space-y-2">
              <Input
                id={`${formatType}-asin`}
                placeholder="B01ABCDEFG"
                value={format.asin || ""}
                onChange={(e) => handleChange('asin', e.target.value)}
                className={errors.asin ? "border-red-500" : ""}
              />
              {errors.asin && (
                <p className="text-xs text-red-500">{errors.asin}</p>
              )}
            </div>
          ) : (
            <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
              {format.asin || "No definido"}
            </div>
          )}
        </div>
      </div>

      {/* Only show dimensions and pages for physical books */}
      {!isEbook && (
        <>
          {/* Dimensions Field */}
          <div className="grid gap-2">
            <Label htmlFor={`${formatType}-dimensions`}>Dimensiones</Label>
            {isEditing ? (
              <Input
                id={`${formatType}-dimensions`}
                placeholder="15.24 x 22.86 cm"
                value={format.dimensions || ""}
                onChange={(e) => onUpdateFormat && onUpdateFormat(formatType, { dimensions: e.target.value })}
              />
            ) : (
              <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
                {format.dimensions || "No definido"}
              </div>
            )}
          </div>

          {/* Pages Field */}
          <div className="grid gap-2">
            <Label htmlFor={`${formatType}-pages`}>Número de páginas</Label>
            {isEditing ? (
              <Input
                id={`${formatType}-pages`}
                type="number"
                placeholder="0"
                value={format.pages || ""}
                onChange={(e) => {
                  const value = e.target.value ? parseInt(e.target.value) : undefined;
                  onUpdateFormat && onUpdateFormat(formatType, { pages: value });
                }}
              />
            ) : (
              <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted/50 flex items-center">
                {format.pages || "No definido"}
              </div>
            )}
          </div>
        </>
      )}

      {/* Strategy Field */}
      <div className="grid gap-2">
        <Label htmlFor={`${formatType}-strategy`}>Estrategia</Label>
        {isEditing ? (
          <Input
            id={`${formatType}-strategy`}
            placeholder="Describe la estrategia para este formato"
            value={format.strategy || ""}
            onChange={(e) => onUpdateFormat && onUpdateFormat(formatType, { strategy: e.target.value })}
          />
        ) : (
          <div className="px-3 py-2 rounded-md border border-input bg-muted/50">
            {format.strategy || "No definida"}
          </div>
        )}
      </div>

      {Object.keys(errors).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <Alert variant="destructive" className="text-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Por favor, corrige los errores antes de guardar.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  );
};
