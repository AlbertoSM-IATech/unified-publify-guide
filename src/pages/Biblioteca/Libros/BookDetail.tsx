
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, Calendar, File, Link, PenTool, Save, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { librosSimulados, getContentColor, getStatusColor } from "./utils/librosUtils";
import { GeneralInfoSection } from "./components/BookDetail/GeneralInfoSection";
import { FormatSection } from "./components/BookDetail/FormatSection";
import { NotesSection } from "./components/BookDetail/NotesSection";

// Book interface - can be moved to a types file later
export interface BookNote {
  id: number;
  text: string;
  date: string;
}

export interface BookFormat {
  dimensions?: string;
  isbn?: string;
  asin?: string;
  pages?: number;
  files?: {id: number; name: string; type: string}[];
  price?: number;
  royaltyPercentage?: number;
  printingCost?: number;
  links?: {
    amazon?: string;
    presale?: string;
    reviews?: string;
    h10Canonical?: string;
    affiliate?: string;
    leadMagnet?: string;
    newsletter?: string;
    landingPage?: string;
    authorCentral?: string;
  };
  strategy?: string;
}

export interface Book {
  id: number;
  titulo: string;
  subtitulo?: string;
  descripcion?: string;
  autor: string;
  isbn: string;
  asin: string;
  estado: string;
  contenido: string;
  fechaPublicacion: string | null;
  imageUrl: string;
  investigacionId?: number;
  proyectoId?: number;
  hardcover?: BookFormat;
  paperback?: BookFormat;
  ebook?: BookFormat;
  notes?: BookNote[];
}

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Find book from simulated data (in a real app, this would fetch from an API)
  const bookId = parseInt(id || "0");
  const libro = librosSimulados.find((libro) => libro.id === bookId);

  // Extend the book data with additional fields for the detail view
  const bookData: Book = {
    ...libro!,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    hardcover: {
      dimensions: "15.24 x 22.86 cm",
      isbn: "978-1234567890",
      pages: 300,
      price: 24.99,
      royaltyPercentage: 0.60,
      printingCost: 5.50,
      files: [
        { id: 1, name: "manuscrito.pdf", type: "document" },
        { id: 2, name: "portada.jpg", type: "image" },
      ],
      links: {
        amazon: "https://amazon.com/book1",
      },
      strategy: "Enfocarse en ventas directas y posicionamiento en Amazon.",
    },
    paperback: {
      dimensions: "12.7 x 20.32 cm",
      isbn: "978-0987654321",
      pages: 300,
      price: 14.99,
      royaltyPercentage: 0.70,
      printingCost: 3.20,
    },
    ebook: {
      asin: "B01234ABCD",
      price: 9.99,
      royaltyPercentage: 0.70,
      printingCost: 0,
    },
    notes: [
      { id: 1, text: "Contactar a diseñador para mejorar la portada", date: "2023-11-15" },
      { id: 2, text: "Verificar disponibilidad en tiendas físicas", date: "2023-10-30" },
    ],
  };

  if (!libro) {
    return <div className="p-6">Libro no encontrado</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios al libro han sido guardados con éxito.",
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    toast({
      title: "Libro eliminado",
      description: "El libro ha sido eliminado con éxito.",
      variant: "destructive",
    });
    navigate("/biblioteca/libros");
  };

  const handleCancel = () => {
    setIsEditing(false);
    toast({
      description: "Edición cancelada. Los cambios no han sido guardados.",
    });
  };

  // Update this function to always return a string
  const calculateNetRoyalties = (format?: BookFormat): string => {
    if (!format || !format.price || !format.royaltyPercentage) return "0.00";
    const priceWithoutVat = format.price / 1.21; // Assuming 21% VAT
    return (priceWithoutVat * format.royaltyPercentage - (format.printingCost || 0)).toFixed(2);
  };

  return (
    <div className="animate-fade-in">
      {/* Header with back button and actions */}
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Volver
          </Button>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">
            {isEditing ? "Editar Libro" : "Detalles del Libro"}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button 
                variant="default" 
                onClick={handleSave}
              >
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={handleEdit}
              >
                <PenTool className="mr-2 h-4 w-4" />
                Editar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDelete}
              >
                <Trash className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: Book cover and basic info card - Make cover smaller */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <div className="bg-muted p-4">
              {bookData.imageUrl ? (
                <div className="mx-auto max-w-[250px]">
                  <AspectRatio ratio={1600/2560} className="overflow-hidden rounded-md border border-border bg-muted">
                    <img
                      src={bookData.imageUrl}
                      alt={bookData.titulo}
                      className="h-full w-full object-cover"
                    />
                  </AspectRatio>
                </div>
              ) : (
                <div className="mx-auto max-w-[250px]">
                  <AspectRatio ratio={1600/2560} className="flex items-center justify-center rounded-md border border-border bg-muted">
                    <BookOpen size={60} className="text-muted-foreground/50" />
                  </AspectRatio>
                </div>
              )}
              {isEditing && (
                <div className="mt-4">
                  <Button className="w-full" variant="secondary" size="sm">
                    <File className="mr-2 h-4 w-4" />
                    Subir Imagen de Portada
                  </Button>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="mb-3 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getStatusColor(bookData.estado)}>
                    {bookData.estado}
                  </Badge>
                  <Badge className={getContentColor(bookData.contenido)}>
                    {bookData.contenido}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  {bookData.fechaPublicacion 
                    ? new Date(bookData.fechaPublicacion).toLocaleDateString() 
                    : "Sin fecha de publicación"}
                </div>
              </div>
              <Separator className="my-3" />
              <div className="space-y-3">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">ISBN</div>
                  <div>{bookData.isbn}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">ASIN</div>
                  <div>{bookData.asin}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Regalías Netas</div>
                  <div className="flex flex-col gap-1 text-sm">
                    {bookData.hardcover && (
                      <div className="flex justify-between">
                        <span>Tapa Dura:</span>
                        <span className="font-medium text-green-600">
                          {calculateNetRoyalties(bookData.hardcover)}€
                        </span>
                      </div>
                    )}
                    {bookData.paperback && (
                      <div className="flex justify-between">
                        <span>Tapa Blanda:</span>
                        <span className="font-medium text-green-600">
                          {calculateNetRoyalties(bookData.paperback)}€
                        </span>
                      </div>
                    )}
                    {bookData.ebook && (
                      <div className="flex justify-between">
                        <span>eBook:</span>
                        <span className="font-medium text-green-600">
                          {calculateNetRoyalties(bookData.ebook)}€
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="w-full">
                  <File className="mr-2 h-4 w-4" />
                  Ver Investigación
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Link className="mr-2 h-4 w-4" />
                  Ver Proyecto
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column: Tabs with detailed information */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="general">Información General</TabsTrigger>
              <TabsTrigger value="formats">Formatos</TabsTrigger>
              <TabsTrigger value="notes">Notas y Observaciones</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="mt-0">
              <GeneralInfoSection book={bookData} isEditing={isEditing} />
            </TabsContent>

            <TabsContent value="formats" className="mt-0">
              <FormatSection 
                book={bookData}
                isEditing={isEditing}
                calculateNetRoyalties={calculateNetRoyalties}
              />
            </TabsContent>

            <TabsContent value="notes" className="mt-0">
              <NotesSection 
                book={bookData}
                isEditing={isEditing}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
