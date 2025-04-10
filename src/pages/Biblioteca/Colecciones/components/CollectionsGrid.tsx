
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { CollectionGridItem } from "./CollectionGridItem";

interface Collection {
  id: number;
  nombre: string;
  descripcion: string;
  cantidadLibros: number;
  fechaCreacion: string;
  libros: number[];
}

interface CollectionsGridProps {
  collections: Collection[];
}

export const CollectionsGrid = ({ collections }: CollectionsGridProps) => {
  return (
    <ResponsiveGrid 
      columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
      gap="lg"
      className="mt-6"
    >
      {collections.map((collection) => (
        <CollectionGridItem key={collection.id} collection={collection} />
      ))}
    </ResponsiveGrid>
  );
};
