
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { 
  fetchColeccionById, 
  Coleccion
} from "../../../../utils/relationDataService";
import { ViewCollectionDetailsCard } from "./ViewCollectionDetailsCard";
import { Book } from "../../../../types/bookTypes";

interface CollectionDetailsProps {
  book?: Book;
  loadingLists: boolean;
}

export const CollectionDetails = ({
  book,
  loadingLists
}: CollectionDetailsProps) => {
  const [selectedColeccion, setSelectedColeccion] = useState<Coleccion | null>(null);
  const [loadingColeccion, setLoadingColeccion] = useState(false);

  useEffect(() => {
    const fetchRelatedColeccion = async () => {
      if (book?.proyectoId) { 
        setLoadingColeccion(true);
        try {
          const coleccion = await fetchColeccionById(book.proyectoId);
          setSelectedColeccion(coleccion);
        } catch (error) {
          console.error("Error fetching related collection:", error);
        } finally {
          setLoadingColeccion(false);
        }
      } else {
        setSelectedColeccion(null);
      }
    };
    fetchRelatedColeccion();
  }, [book?.proyectoId]);

  return (
    <div className="w-full h-full">
      <Label className="text-base font-medium">Serie Relacionada</Label>
      {loadingLists || loadingColeccion ? (
        <div className="flex items-center space-x-2 mt-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Cargando...</span>
        </div>
      ) : selectedColeccion ? (
        <div className="mt-2">
          <ViewCollectionDetailsCard coleccion={selectedColeccion} />
        </div>
      ) : (
        <div className="rounded-md border border-input px-3 py-2 bg-muted/50 mt-2">
          Ninguna serie seleccionada
        </div>
      )}
    </div>
  );
};
