
import { useState, useEffect } from "react";
import { CollectionsHeader } from "./components/CollectionsHeader";
import { CollectionsToolbar } from "./components/CollectionsToolbar";
import { CollectionsContent } from "./components/CollectionsContent";
import { CreateCollectionDialog } from "./components/CreateCollectionDialog";
import { filterObjectsBySearchQuery } from "@/utils/dataUtils";
import { useCollections } from "./hooks/useCollections";
import { useViewMode } from "./hooks/useViewMode";
import { Collection } from "./types/collectionTypes";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";

const ColeccionesList = () => {
  console.log("Rendering ColeccionesList component (now SeriesList)");
  
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

  useEffect(() => {
    console.log("SeriesList effect - series:", colecciones?.length || 0);
  }, [colecciones]);

  // Filtrar colecciones por búsqueda
  const filteredColecciones = filterObjectsBySearchQuery<Collection>(
    colecciones || [],
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

  // Show loading state while collections are loading
  if (isLoading) {
    return <LoadingState text="Cargando series..." />;
  }

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
        isLoading={false} // isLoading is handled above, so pass false here
        loadError={loadError}
        viewMode={viewMode}
        onRetry={handleRetryLoading}
      />

      <CreateCollectionDialog 
        isOpen={isCreatingCollection}
        onClose={handleCloseCreateDialog}
        onCreate={handleCreateCollection}
        dialogTitle="Crear Nueva Serie"
        labelNombre="Nombre de la serie"
        labelDescripcion="Descripción de la serie"
        placeholderNombre="Ej: Marketing Digital Avanzado"
        placeholderDescripcion="Una serie sobre estrategias de marketing digital..."
      />
    </div>
  );
};

export default ColeccionesList;

