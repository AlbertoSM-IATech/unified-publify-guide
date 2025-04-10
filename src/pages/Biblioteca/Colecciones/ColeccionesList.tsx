
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { CollectionsHeader } from "./components/CollectionsHeader";
import { CollectionsToolbar } from "./components/CollectionsToolbar";
import { CollectionsGrid } from "./components/CollectionsGrid";
import { CollectionsListView } from "./components/CollectionsList";
import { CreateCollectionDialog } from "./components/CreateCollectionDialog";
import { coleccionesSimuladas } from "./utils/collectionsUtils";
import { filterObjectsBySearchQuery } from "@/utils/dataUtils";
import { Collection } from "./types/collectionTypes";

const ColeccionesList = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [colecciones, setColecciones] = useState<Collection[]>(coleccionesSimuladas);
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);

  // Filtrar colecciones por búsqueda
  const filteredColecciones = filterObjectsBySearchQuery(
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

  const handleCreateCollection = (newCollection: { nombre: string; descripcion: string }) => {
    // Validar campos requeridos
    if (!newCollection.nombre) {
      toast({
        title: "Campo requerido",
        description: "Por favor introduce un nombre para la colección.",
        variant: "destructive"
      });
      return;
    }

    // Crear nueva colección
    const newId = Math.max(...colecciones.map(col => col.id), 0) + 1;
    const newCol: Collection = {
      id: newId,
      nombre: newCollection.nombre,
      descripcion: newCollection.descripcion,
      cantidadLibros: 0,
      fechaCreacion: new Date().toISOString().split('T')[0],
      libros: []
    };

    // Añadir a colecciones simuladas
    coleccionesSimuladas.push(newCol);
    setColecciones([...coleccionesSimuladas]);

    toast({
      title: "Colección creada",
      description: `La colección "${newCol.nombre}" ha sido creada con éxito.`
    });

    handleCloseCreateDialog();
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

      {viewMode === "grid" ? (
        <CollectionsGrid collections={filteredColecciones} />
      ) : (
        <CollectionsListView collections={filteredColecciones} />
      )}

      <CreateCollectionDialog 
        isOpen={isCreatingCollection}
        onClose={handleCloseCreateDialog}
        onCreate={handleCreateCollection}
      />
    </div>
  );
};

export default ColeccionesList;
