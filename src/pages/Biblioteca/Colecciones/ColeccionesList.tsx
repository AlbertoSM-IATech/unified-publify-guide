
import { useState } from "react";
import { CollectionsHeader } from "./components/CollectionsHeader";
import { CollectionsToolbar } from "./components/CollectionsToolbar";
import { CollectionsContent } from "./components/CollectionsContent";
import { CreateCollectionDialog } from "./components/CreateCollectionDialog";
import { filterObjectsBySearchQuery } from "@/utils/dataUtils";
import { useCollections } from "./hooks/useCollections";
import { useViewMode } from "./hooks/useViewMode";
import { Collection } from "./types/collectionTypes";

const ColeccionesList = () => {
  const [viewMode, setViewMode] = useViewMode("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  
  const {
    colecciones,
    isLoading,
    loadError,
    createCollection,
    handleRetryLoading
  } = useCollections();

  // Filtrar colecciones por búsqueda
  const filteredColecciones = filterObjectsBySearchQuery<Collection>(
    colecciones,
    searchQuery,
    ["nombre", "descripcion"]
  );

  const handleOpenCreateDialog = () => {
    setIsCreatingCollection(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreatingCollection(false);
  };

  const handleCreateCollection = async (newCollection: { nombre: string; descripcion: string }) => {
    const success = await createCollection(newCollection);
    if (success) {
      handleCloseCreateDialog();
    }
  };

  return (
    <div className="animate-fade-in">
      <CollectionsHeader onCreateCollection={handleOpenCreateDialog} />
      
      <CollectionsToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <CollectionsContent
        collections={filteredColecciones}
        isLoading={isLoading}
        loadError={loadError}
        viewMode={viewMode}
        onRetry={handleRetryLoading}
      />

      <CreateCollectionDialog 
        isOpen={isCreatingCollection}
        onClose={handleCloseCreateDialog}
        onCreate={handleCreateCollection}
      />
    </div>
  );
};

export default ColeccionesList;
