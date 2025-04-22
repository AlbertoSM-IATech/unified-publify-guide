
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import MotionWrapper from "@/components/motion/MotionWrapper";
import BookCard from "@/components/dashboard/BookCard";

interface RecentBooksProps {
  libros: any[];  // Type should match your libro type
}

export const RecentBooks = ({ libros }: RecentBooksProps) => {
  // Ensure image URLs have default fallbacks if not available
  const processedLibros = libros.map(libro => ({
    ...libro,
    imageUrl: libro.imageUrl || libro.portadaUrl || "/placeholders/default-book-cover.png"
  }));

  return (
    <MotionWrapper type="fadeUp" delay={0.4}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <BookOpen size={20} className="text-orange-500" />
            Libros Recientes
          </CardTitle>
          <CardDescription>
            Los últimos libros añadidos a tu biblioteca
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {processedLibros.sort((a, b) => b.id - a.id).slice(0, 6).map((libro, index) => (
              <MotionWrapper key={libro.id} delay={0.1 * index} type="scale">
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
        </CardContent>
      </Card>
    </MotionWrapper>
  );
};
