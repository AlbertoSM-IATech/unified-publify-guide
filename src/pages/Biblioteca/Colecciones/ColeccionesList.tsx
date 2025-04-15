
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { CollectionsHeader } from "./components/CollectionsHeader";
import { CollectionsToolbar } from "./components/CollectionsToolbar";
import { CollectionsGrid } from "./components/CollectionsGrid";
import { CollectionsListView } from "./components/CollectionsList";
import { CreateCollectionDialog } from "./components/CreateCollectionDialog";
import { coleccionesSimuladas } from "./utils/collectionsUtils";
import { filterObjectsBySearchQuery } from "@/utils/dataUtils";
import { Collection } from "./types/collectionTypes";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { useSyncedData } from "@/hooks/useSyncedData";
import { supabaseService } from "@/services/supabase";

const ColeccionesList = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">(() => {
    const savedMode = localStorage.getItem("coleccionViewMode");
    return (savedMode === "list" || savedMode === "grid") ? savedMode : "grid";
  });
  
  const [searchQuery, setSearchQuery] = useState("");
  const [colecciones, setColecciones] = useSyncedData<Collection[]>([] as Collection[], "coleccionesData");
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Persist view mode in localStorage
  useEffect(() => {
    localStorage.setItem("coleccionViewMode", viewMode);
  }, [viewMode]);

  // Load collections
  useEffect(() => {
    const loadCollections = async () => {
      setIsLoading(true);
      setLoadError(null);
      
      try {
        // Try to fetch from Supabase
        const supabaseCollections = await supabaseService.collections.getAll();
        
        // If we get collections from Supabase, use them
        if (supabaseCollections && supabaseCollections.length > 0) {
          console.log("Collections loaded from Supabase:", supabaseCollections);
          setColecciones(supabaseCollections as Collection[]);
        } else {
          console.log("No collections found in Supabase, using mock data");
          // Check localStorage first
          const storedCollections = localStorage.getItem('coleccionesData');
          if (storedCollections) {
            setColecciones(JSON.parse(storedCollections) as Collection[]);
          } else {
            setColecciones(coleccionesSimuladas);
            // Save mock data to localStorage for persistence
            localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
          }
        }
      } catch (error) {
        console.error("Error loading collections:", error);
        setLoadError("No se pudieron cargar las colecciones. Usando datos locales.");
        
        // Fallback to localStorage and then to mock data
        const storedCollections = localStorage.getItem('coleccionesData');
        if (storedCollections) {
          setColecciones(JSON.parse(storedCollections) as Collection[]);
        } else {
          setColecciones(coleccionesSimuladas);
          localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCollections();
  }, [setColecciones]);

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

  const handleCreateCollection = async (newCollection: { nombre: string; descripcion: string }) => {
    // Validar campos requeridos
    if (!newCollection.nombre) {
      toast({
        title: "Campo requerido",
        description: "Por favor introduce un nombre para la colección.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create new collection
      const newId = Math.max(...colecciones.map(col => col.id), 0) + 1;
      const newCol: Collection = {
        id: newId,
        nombre: newCollection.nombre,
        descripcion: newCollection.descripcion,
        cantidadLibros: 0,
        fechaCreacion: new Date().toISOString().split('T')[0],
        libros: []
      };

      // Try to create in Supabase
      const createdCollection = await supabaseService.collections.create(newCol);
      
      let collectionToAdd = newCol;
      if (createdCollection) {
        console.log("Collection created in Supabase:", createdCollection);
        collectionToAdd = createdCollection as Collection;
      }
      
      // Update local state
      const updatedCollections = [...colecciones, collectionToAdd];
      setColecciones(updatedCollections);
      
      // Update localStorage for persistence
      localStorage.setItem('coleccionesData', JSON.stringify(updatedCollections));

      toast({
        title: "Colección creada",
        description: `La colección "${newCol.nombre}" ha sido creada con éxito.`
      });
    } catch (error) {
      console.error("Error creating collection:", error);
      // Create locally if Supabase fails
      const newId = Math.max(...colecciones.map(col => col.id), 0) + 1;
      const newCol: Collection = {
        id: newId,
        nombre: newCollection.nombre,
        descripcion: newCollection.descripcion,
        cantidadLibros: 0,
        fechaCreacion: new Date().toISOString().split('T')[0],
        libros: []
      };
      
      // Update local state
      const updatedCollections = [...colecciones, newCol];
      setColecciones(updatedCollections);
      
      // Update localStorage for persistence
      localStorage.setItem('coleccionesData', JSON.stringify(updatedCollections));

      toast({
        title: "Colección creada (modo local)",
        description: `La colección "${newCol.nombre}" ha sido creada localmente.`
      });
    }

    handleCloseCreateDialog();
  };

  // Handle retry loading
  const handleRetryLoading = () => {
    setLoadError(null);
    setIsLoading(true);
    // Use setTimeout to avoid infinite loop if error persists
    setTimeout(() => {
      // Set collections directly from mock data
      setColecciones(coleccionesSimuladas);
      // Save mock data to localStorage for persistence
      localStorage.setItem('coleccionesData', JSON.stringify(coleccionesSimuladas));
      setIsLoading(false);
    }, 500);
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

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <LoadingState text="Cargando colecciones..." size="lg" />
        </div>
      ) : loadError ? (
        <ErrorState 
          title="Error al cargar datos"
          message="No se pudieron cargar las colecciones. Se usarán datos locales."
          onRetry={handleRetryLoading}
          fullPage={false}
          className="my-8"
        />
      ) : viewMode === "grid" ? (
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
