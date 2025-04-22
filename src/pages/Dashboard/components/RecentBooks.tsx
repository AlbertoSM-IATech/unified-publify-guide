
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import MotionWrapper from "@/components/motion/MotionWrapper";
import BookCard from "@/components/dashboard/BookCard";
import { useState, useEffect } from "react";

interface RecentBooksProps {
  libros: any[];  // Type should match your libro type
}

export const RecentBooks = ({ libros }: RecentBooksProps) => {
  const [lastUpdatedTimestamp, setLastUpdatedTimestamp] = useState(Date.now());
  
  // Force refresh when library data changes
  useEffect(() => {
    // Set up an interval to check for updates
    const checkInterval = setInterval(() => {
      const storedBooks = localStorage.getItem('librosData');
      if (storedBooks) {
        try {
          setLastUpdatedTimestamp(Date.now()); // Trigger re-render when books change
        } catch (error) {
          console.error('Error parsing library data:', error);
        }
      }
    }, 5000);
    
    return () => clearInterval(checkInterval);
  }, []);

  // Load the latest books from localStorage to ensure we're showing recent data
  const getLatestBooks = () => {
    const storedBooks = localStorage.getItem('librosData');
    if (storedBooks) {
      try {
        return JSON.parse(storedBooks);
      } catch (error) {
        console.error('Error parsing library data:', error);
      }
    }
    return libros; // Fallback to props if localStorage fails
  };
  
  const currentLibros = getLatestBooks();
  
  // Ensure image URLs have default fallbacks if not available
  const processedLibros = currentLibros.map(libro => ({
    ...libro,
    imageUrl: libro.imageUrl || libro.portadaUrl || "/placeholders/default-book-cover.png"
  }));

  // Filter out any books with undefined values that might cause rendering issues
  const validLibros = processedLibros.filter(libro => libro && libro.id);

  return (
    <MotionWrapper type="fadeUp" delay={0.4}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BookOpen size={20} className="text-orange-500" />
            Libros Recientes
          </CardTitle>
          <CardDescription>
            Los últimos libros añadidos a tu biblioteca ({validLibros.length} libros)
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {validLibros.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {validLibros.sort((a, b) => b.id - a.id).slice(0, 6).map((libro, index) => (
                <MotionWrapper key={`${libro.id}-${lastUpdatedTimestamp}`} delay={0.1 * index} type="scale">
                  <BookCard 
                    index={index + 1} 
                    title={libro.titulo} 
                    author={libro.autor} 
                    contentLevel={libro.contenido} 
                    status={libro.estado} 
                    coverUrl={libro.imageUrl} 
                    id={libro.id}
                  />
                </MotionWrapper>
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
