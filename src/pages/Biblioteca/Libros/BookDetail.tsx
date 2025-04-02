
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
import { supabaseService } from "@/services/supabase";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Find book from simulated data (in a real app, this would fetch from an API)
  const bookId = parseInt(id || "0");
  const libro = librosSimulados.find((libro) => libro.id === bookId);

  // Extend the book data with additional fields for the detail view
  const [bookData, setBookData] = useState<Book>({
    ...libro!,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    hardcover: {
      dimensions: "15.24 x 22.86 cm",
      isbn: "978-1234567890",
      asin: "B01ABCDEFG",
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
      asin: "B09HIJKLMN",
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
  });

  // Form state for edits
  const [formData, setFormData] = useState<Partial<Book>>({});

  if (!libro) {
    return <div className="p-6">Libro no encontrado</div>;
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleEdit = () => {
    setIsEditing(true);
    // Reset form data when starting to edit
    setFormData({});
  };

  const handleSave = async () => {
    try {
      // Update book data with form changes
      const updatedBook = { ...bookData, ...formData };
      setBookData(updatedBook);
      
      // In a real app, this would save to an API
      // await supabaseService.saveData('libros', updatedBook);
      console.log("Saving book data:", updatedBook);
      
      toast({
        title: "Cambios guardados",
        description: "Los cambios al libro han sido guardados con éxito.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving book data:", error);
      toast({
        title: "Error al guardar",
        description: "Hubo un problema al guardar los cambios. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      // In a real app, this would delete from an API
      // await supabaseService.deleteData('libros', bookId);
      console.log("Deleting book:", bookId);
      
      toast({
        title: "Libro eliminado",
        description: "El libro ha sido eliminado con éxito.",
        variant: "destructive",
      });
      navigate("/biblioteca/libros");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast({
        title: "Error al eliminar",
        description: "Hubo un problema al eliminar el libro. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data when canceling
    setFormData({});
    toast({
      description: "Edición cancelada. Los cambios no han sido guardados.",
    });
  };

  // Handle form data updates from child components
  const handleUpdateBook = (updatedData: Partial<Book>) => {
    setFormData(prevData => ({
      ...prevData,
      ...updatedData
    }));
    console.log("Updated form data:", { ...formData, ...updatedData });
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
              <GeneralInfoSection 
                book={bookData} 
                isEditing={isEditing} 
                onUpdateBook={handleUpdateBook}
              />
            </TabsContent>

            <TabsContent value="formats" className="mt-0">
              <FormatSection 
                book={bookData}
                isEditing={isEditing}
                calculateNetRoyalties={calculateNetRoyalties}
                onUpdateBook={handleUpdateBook}
              />
            </TabsContent>

            <TabsContent value="notes" className="mt-0">
              <NotesSection 
                book={bookData}
                isEditing={isEditing}
                onUpdateBook={handleUpdateBook}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
