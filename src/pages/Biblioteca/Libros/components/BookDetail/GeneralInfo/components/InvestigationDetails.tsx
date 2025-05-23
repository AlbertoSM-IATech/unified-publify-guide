
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { 
  fetchInvestigacionById, 
  Investigacion
} from "../../../../utils/relationDataService";
import { ViewInvestigationDetailsCard } from "./ViewInvestigationDetailsCard";
import { Book } from "../../../../types/bookTypes";

interface InvestigationDetailsProps {
  book?: Book;
  loadingLists: boolean;
}

export const InvestigationDetails = ({
  book,
  loadingLists
}: InvestigationDetailsProps) => {
  const [selectedInvestigacion, setSelectedInvestigacion] = useState<Investigacion | null>(null);
  const [loadingInvestigacion, setLoadingInvestigacion] = useState(false);

  useEffect(() => {
    const fetchRelatedInvestigacion = async () => {
      if (book?.investigacionId) {
        setLoadingInvestigacion(true);
        try {
          const investigacion = await fetchInvestigacionById(book.investigacionId);
          setSelectedInvestigacion(investigacion);
        } catch (error) {
          console.error("Error fetching related investigation:", error);
        } finally {
          setLoadingInvestigacion(false);
        }
      } else {
        setSelectedInvestigacion(null);
      }
    };
    fetchRelatedInvestigacion();
  }, [book?.investigacionId]);

  return (
    <div className="w-full">
      <Label className="text-base font-medium">Investigación Relacionada</Label>
      {loadingLists || loadingInvestigacion ? (
        <div className="flex items-center space-x-2 mt-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm text-muted-foreground">Cargando...</span>
        </div>
      ) : selectedInvestigacion ? (
        <div className="mt-2">
          <ViewInvestigationDetailsCard investigacion={selectedInvestigacion} />
        </div>
      ) : (
        <div className="rounded-md border border-input px-3 py-2 bg-muted/50 mt-2">
          Ninguna investigación seleccionada
        </div>
      )}
    </div>
  );
};
