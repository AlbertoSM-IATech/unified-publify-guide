
import { Collection } from "../types/collectionTypes";
import { CollectionsGrid } from "./CollectionsGrid";
import { CollectionsListView } from "./CollectionsList";
import { LoadingState } from "@/components/common/LoadingState";
import { ErrorState } from "@/components/common/ErrorState";

interface CollectionsContentProps {
  collections: Collection[];
  isLoading: boolean;
  loadError: string | null;
  viewMode: "grid" | "list";
  onRetry: () => void;
}

export const CollectionsContent = ({ 
  collections, 
  isLoading, 
  loadError, 
  viewMode,
  onRetry 
}: CollectionsContentProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <LoadingState text="Cargando colecciones..." size="lg" />
      </div>
    );
  }
  
  if (loadError) {
    return (
      <ErrorState 
        title="Error al cargar datos"
        message="No se pudieron cargar las colecciones. Se usarán datos locales."
        onRetry={onRetry}
        fullPage={false}
        className="my-8"
      />
    );
  }
  
  return viewMode === "grid" ? (
    <CollectionsGrid collections={collections} />
  ) : (
    <CollectionsListView collections={collections} />
  );
};
