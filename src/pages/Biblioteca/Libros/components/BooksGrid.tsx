
import { Book } from "../types/bookTypes";
import { BookGridItem } from "./BookGridItem";
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";

interface BooksGridProps {
  libros: Book[];
  getStatusColor: (status: string) => string;
  getContentColor: (content: string) => string;
}

export const BooksGrid = ({ libros, getStatusColor, getContentColor }: BooksGridProps) => {
  return (
    <ResponsiveGrid 
      columns={{ sm: 1, md: 2, lg: 3 }}
      gap="md"
      className="mt-6"
    >
      {libros.map((libro) => (
        <BookGridItem
          key={libro.id}
          libro={libro}
          getStatusColor={getStatusColor}
          getContentColor={getContentColor}
        />
      ))}
    </ResponsiveGrid>
  );
};
