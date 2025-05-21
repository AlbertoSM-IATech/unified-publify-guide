
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
    colecciones, // Renamed from series in useCollections for consistency, but variable name kept here
    isLoading,
    loadError,
    createCollection, // Function name kept from useCollections
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

  const handleCreateCollection = async (newCollectionData: { nombre: string; descripcion: string; libros?: number[] }) => {
    // The onCreate prop in CreateCollectionDialog expects 'libros'
    // useCollections createCollection also handles 'libros'
    const success = await createCollection(newCollectionData);
    if (success) {
      handleCloseCreateDialog();
    }
  };

  // Show loading state while collections are loading
  if (isLoading) {
    return <LoadingState text="Cargando series..." />;
  }

  // Show error state if there's an error loading collections
  // isLoading is false here, so if loadError is present, it means loading failed
  if (loadError && !colecciones?.length) {
    return (
      <ErrorState 
        message={loadError}
        onRetry={handleRetryLoading} 
      />
    );
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
        // Las siguientes props fueron eliminadas ya que no existen en CreateCollectionDialogProps
        // y los textos correspondientes ya están actualizados dentro del componente CreateCollectionDialog
        // dialogTitle="Crear Nueva Serie"
        // labelNombre="Nombre de la serie"
        // labelDescripcion="Descripción de la serie"
        // placeholderNombre="Ej: Marketing Digital Avanzado"
        // placeholderDescripcion="Una serie sobre estrategias de marketing digital..."
      />
    </div>
  );
};

export default ColeccionesList;
