
import { Book } from "../../../types/bookTypes";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form"; // This prop seems unused, but kept as per original
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { 
  fetchInvestigaciones, 
  fetchColecciones, 
  fetchInvestigacionById, 
  fetchColeccionById,
  Investigacion,
  Coleccion
} from "../../../utils/relationDataService";
import { ViewInvestigationDetailsCard } from "./components/ViewInvestigationDetailsCard";
import { ViewCollectionDetailsCard } from "./components/ViewCollectionDetailsCard";

interface RelationFieldsProps {
  form: UseFormReturn<any>; // This prop seems unused in the current logic
  book?: Book;
}

export const RelationFields = ({
  form, // Prop is kept but not actively used in this component's rendering logic
  book
}: RelationFieldsProps) => {
  const [investigaciones, setInvestigaciones] = useState<Investigacion[]>([]);
  const [colecciones, setColecciones] = useState<Coleccion[]>([]);
  const [loadingLists, setLoadingLists] = useState(true); // Renamed for clarity

  const [selectedInvestigacion, setSelectedInvestigacion] = useState<Investigacion | null>(null);
  const [selectedColeccion, setSelectedColeccion] = useState<Coleccion | null>(null);
  const [loadingRelatedDetails, setLoadingRelatedDetails] = useState({ // Renamed for clarity
    investigacion: false,
    coleccion: false
  });
  
  useEffect(() => {
    const fetchData = async () => {
      setLoadingLists(true);
      try {
        // Not strictly needed for display if only showing linked items, but kept from original
        const [investigacionesData, coleccionesData] = await Promise.all([
          fetchInvestigaciones(), 
          fetchColecciones()
        ]);
        setInvestigaciones(investigacionesData);
        setColecciones(coleccionesData);
      } catch (error) {
        console.error("Error fetching relation lists:", error);
      } finally {
        setLoadingLists(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRelatedInvestigacion = async () => {
      if (book?.investigacionId) {
        setLoadingRelatedDetails(prev => ({ ...prev, investigacion: true }));
        try {
          const investigacion = await fetchInvestigacionById(book.investigacionId);
          setSelectedInvestigacion(investigacion);
        } catch (error) {
          console.error("Error fetching related investigation:", error);
        } finally {
          setLoadingRelatedDetails(prev => ({ ...prev, investigacion: false }));
        }
      } else {
        setSelectedInvestigacion(null);
      }
    };
    fetchRelatedInvestigacion();
  }, [book?.investigacionId]);

  useEffect(() => {
    const fetchRelatedColeccion = async () => {
      // Using proyectoId for collection as per original component logic
      if (book?.proyectoId) { 
        setLoadingRelatedDetails(prev => ({ ...prev, coleccion: true }));
        try {
          const coleccion = await fetchColeccionById(book.proyectoId);
          setSelectedColeccion(coleccion);
        } catch (error) {
          console.error("Error fetching related collection:", error);
        } finally {
          setLoadingRelatedDetails(prev => ({ ...prev, coleccion: false }));
        }
      } else {
        setSelectedColeccion(null);
      }
    };
    fetchRelatedColeccion();
  }, [book?.proyectoId]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Investigación Relacionada */}
      <div className="grid gap-3">
        <Label>Investigación Relacionada</Label>
        {loadingLists || loadingRelatedDetails.investigacion ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Cargando...</span>
          </div>
        ) : (
          <div className="rounded-md border border-input px-3 py-2 bg-muted/50">
            {selectedInvestigacion ? selectedInvestigacion.titulo : "Ninguna investigación seleccionada"}
          </div>
        )}
        
        {selectedInvestigacion && !loadingRelatedDetails.investigacion && (
          <ViewInvestigationDetailsCard investigacion={selectedInvestigacion} />
        )}
      </div>

      {/* Colección Relacionada */}
      <div className="grid gap-3">
        <Label>Colección Relacionada</Label>
        {loadingLists || loadingRelatedDetails.coleccion ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">Cargando...</span>
          </div>
        ) : (
          <div className="rounded-md border border-input px-3 py-2 bg-muted/50">
            {selectedColeccion ? selectedColeccion.titulo : "Ninguna colección seleccionada"}
          </div>
        )}
        
        {selectedColeccion && !loadingRelatedDetails.coleccion && (
          <ViewCollectionDetailsCard coleccion={selectedColeccion} />
        )}
      </div>
    </div>
  );
};
