
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import MotionWrapper from "@/components/motion/MotionWrapper";
import BookCard from "@/components/dashboard/BookCard";
import { useBookData } from "@/hooks/useBookData";
import { useMemo } from "react";

export const RecentBooks = () => {
  // Use the shared book data hook to ensure consistency across the app
  const { books, isLoading } = useBookData();
  
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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BookOpen size={20} className="text-orange-500" />
            Libros Recientes
          </CardTitle>
          <CardDescription>
            Los últimos libros añadidos a tu biblioteca ({books.length} libros)
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">
              Cargando libros...
            </div>
          ) : recentBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {recentBooks.map((libro, index) => (
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
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              No hay libros en la biblioteca
            </div>
          )}
        </CardContent>
      </Card>
    </MotionWrapper>
  );
};
