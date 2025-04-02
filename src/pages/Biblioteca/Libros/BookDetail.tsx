
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { librosSimulados, getContentColor, getStatusColor } from "./utils/librosUtils";
import { GeneralInfoSection } from "./components/BookDetail/GeneralInfoSection";
import { FormatSection } from "./components/BookDetail/FormatSection";
import { NotesSection } from "./components/BookDetail/NotesSection";
import { BookHeader } from "./components/BookDetail/BookHeader";
import { BookCover } from "./components/BookDetail/BookCover";
import { BookInfo } from "./components/BookDetail/BookInfo";
import { calculateNetRoyalties } from "./utils/bookDetailUtils";
import { Book } from "./types/bookTypes";

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

  return (
    <div className="animate-fade-in">
      <BookHeader 
        isEditing={isEditing}
        onGoBack={handleGoBack}
        onEdit={handleEdit}
        onSave={handleSave}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column: Book cover and basic info card */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden">
            <BookCover book={bookData} isEditing={isEditing} />
            <BookInfo 
              book={bookData} 
              getStatusColor={getStatusColor} 
              getContentColor={getContentColor}
              calculateNetRoyalties={calculateNetRoyalties}
            />
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
