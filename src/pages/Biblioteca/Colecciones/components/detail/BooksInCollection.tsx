
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

interface Book {
  id: number;
  titulo: string;
  autor: string;
  imageUrl?: string;
}

interface BooksInCollectionProps {
  books: Book[];
}

export const BooksInCollection = ({ books }: BooksInCollectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          Libros en esta colección ({books.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {books.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-muted-foreground">
            No hay libros en esta colección
          </div>
        ) : (
          <div className="space-y-4">
            {books.map(libro => (
              <div key={libro.id} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center mr-4">
                    {libro.imageUrl ? (
                      <img 
                        src={libro.imageUrl} 
                        alt={libro.titulo} 
                        className="h-full w-full rounded-md object-cover" 
                      />
                    ) : (
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium">{libro.titulo}</h4>
                    <p className="text-sm text-muted-foreground">{libro.autor}</p>
                  </div>
                </div>
                <div>
                  <Link 
                    to={`/biblioteca/libros/${libro.id}`}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
