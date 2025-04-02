
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Book, BookFormat } from "../../types/bookTypes";
import { File, Image, Link, Upload, X } from "lucide-react";

interface FormatSectionProps {
  book: Book;
  isEditing: boolean;
  calculateNetRoyalties: (format?: BookFormat) => string;
}

const FormatTabContent = ({ 
  formatType, 
  format, 
  isEditing, 
  calculateNetRoyalties 
}: { 
  formatType: string; 
  format?: BookFormat; 
  isEditing: boolean; 
  calculateNetRoyalties: (format?: BookFormat) => string; 
}) => {
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

  const netRoyalties = calculateNetRoyalties(format);

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
      <Card className="border border-border">
        <CardContent className="p-4">
          <h3 className="mb-4 text-lg font-medium">Información de Precios</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor={`${formatType}-price`}>Precio de venta</Label>
              {isEditing ? (
                <Input 
                  id={`${formatType}-price`} 
                  type="number"
                  step="0.01"
                  defaultValue={format.price} 
                  placeholder="Ej. 24.99" 
                />
              ) : (
                <div>{format.price ? `${format.price}€` : "No definido"}</div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`${formatType}-royalty`}>% de regalías</Label>
              {isEditing ? (
                <Input 
                  id={`${formatType}-royalty`} 
                  type="number"
                  step="0.01"
                  defaultValue={format.royaltyPercentage ? format.royaltyPercentage * 100 : ""} 
                  placeholder="Ej. 60" 
                />
              ) : (
                <div>{format.royaltyPercentage ? `${format.royaltyPercentage * 100}%` : "No definido"}</div>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`${formatType}-printing`}>Costo de impresión</Label>
              {isEditing ? (
                <Input 
                  id={`${formatType}-printing`} 
                  type="number"
                  step="0.01"
                  defaultValue={format.printingCost} 
                  placeholder="Ej. 5.50" 
                />
              ) : (
                <div>{format.printingCost !== undefined ? `${format.printingCost}€` : "No definido"}</div>
              )}
            </div>
          </div>
          <div className="mt-4 rounded-md bg-muted p-3">
            <div className="flex justify-between">
              <span className="font-medium">Regalías netas:</span>
              <span className="font-medium text-green-600">{netRoyalties}€</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Fórmula: Precio venta sin IVA x % de regalías - precio de impresión
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Archivos adjuntos - Improved version */}
      <div className="grid gap-3">
        <Label>Archivos adjuntos</Label>
        {isEditing ? (
          <div className="grid gap-4">
            <div className="rounded-md border border-dashed border-border p-6">
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Arrastra archivos aquí o haz clic para cargar</p>
                  <p className="text-xs text-muted-foreground">Manuscrito, portada, contraportada, ilustraciones, códigos QR</p>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    <File className="mr-2 h-4 w-4" />
                    Manuscrito
                  </Button>
                  <Button size="sm" variant="outline">
                    <Image className="mr-2 h-4 w-4" />
                    Imágenes
                  </Button>
                </div>
              </div>
            </div>
            {format.files && format.files.length > 0 && (
              <div className="space-y-2">
                {format.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between rounded-md border border-border bg-background p-2">
                    <div className="flex items-center">
                      <File className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{file.name}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Eliminar</span>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div>
            {format.files && format.files.length > 0 ? (
              <div className="space-y-2">
                {format.files.map((file) => (
                  <div key={file.id} className="flex items-center rounded-md border border-border bg-background p-2">
                    <File className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No hay archivos adjuntos</div>
            )}
          </div>
        )}
      </div>

      {/* Enlaces - Improved UI */}
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

export const FormatSection = ({ book, isEditing, calculateNetRoyalties }: FormatSectionProps) => {
  return (
    <Tabs defaultValue="hardcover" className="w-full">
      <TabsList className="mb-4 grid w-full grid-cols-3">
        <TabsTrigger value="hardcover">Tapa Dura</TabsTrigger>
        <TabsTrigger value="paperback">Tapa Blanda</TabsTrigger>
        <TabsTrigger value="ebook">eBook</TabsTrigger>
      </TabsList>
      
      <Card>
        <CardContent className="p-6">
          <TabsContent value="hardcover" className="mt-0">
            <FormatTabContent 
              formatType="hardcover" 
              format={book.hardcover} 
              isEditing={isEditing} 
              calculateNetRoyalties={calculateNetRoyalties} 
            />
          </TabsContent>
          
          <TabsContent value="paperback" className="mt-0">
            <FormatTabContent 
              formatType="paperback" 
              format={book.paperback} 
              isEditing={isEditing} 
              calculateNetRoyalties={calculateNetRoyalties} 
            />
          </TabsContent>
          
          <TabsContent value="ebook" className="mt-0">
            <FormatTabContent 
              formatType="ebook" 
              format={book.ebook} 
              isEditing={isEditing} 
              calculateNetRoyalties={calculateNetRoyalties} 
            />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};
