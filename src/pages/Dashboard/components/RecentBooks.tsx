
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import MotionWrapper from "@/components/motion/MotionWrapper";
import BookCard from "@/components/dashboard/BookCard";
import { useBookData } from "@/hooks/useBookData";
import { useMemo, useEffect } from "react";

export const RecentBooks = () => {
  // Use the shared book data hook to ensure consistency across the app
  const { books, isLoading, refresh } = useBookData();
  
  // Actualizamos los datos cada vez que se monte el componente
  useEffect(() => {
    // Refrescar libros al montar el componente
    refresh();
    
    // Escuchar cambios en libros
    const handleBooksUpdated = () => refresh();
    window.addEventListener('publify_books_updated', handleBooksUpdated);
    
    return () => {
      window.removeEventListener('publify_books_updated', handleBooksUpdated);
    };
  }, [refresh]);
  
  // Get the 6 most recent books (sorted by id in descending order)
  const recentBooks = useMemo(() => {
    return books
      .slice()  // Create a copy to avoid mutating the original array
      .sort((a, b) => b.id - a.id)
      .slice(0, 6)
      .map(libro => ({
        ...libro,
        imageUrl: libro.imageUrl || libro.portadaUrl || "/placeholders/default-book-cover.png"
      }));
  }, [books]);

  return (
    <MotionWrapper type="fadeUp" delay={0.4}>
      <Card className="border-0 bg-gray-900 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BookOpen size={20} className="text-orange-500" />
            Libros Recientes
          </CardTitle>
          <CardDescription className="text-gray-400">
            Los últimos libros añadidos a tu biblioteca ({books.length} libros)
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground col-span-2">
              Cargando libros...
            </div>
          ) : recentBooks.length > 0 ? (
            recentBooks.map((libro, index) => (
              <BookCard 
                key={`book-${libro.id}-${index}`}
                index={index + 1} 
                title={libro.titulo} 
                author={libro.autor} 
                contentLevel={libro.contenido} 
                status={libro.estado} 
                coverUrl={libro.imageUrl} 
                id={libro.id}
              />
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground col-span-2">
              No hay libros en la biblioteca
            </div>
          )}
        </CardContent>
      </Card>
    </MotionWrapper>
  );
};
