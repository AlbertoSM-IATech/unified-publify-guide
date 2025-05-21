
import { Plus } from "lucide-react";
import { Button } from "@/components/common/Button";

interface InvestigacionesListHeaderProps {
  onNuevaInvestigacionClick: () => void;
}

export const InvestigacionesListHeader = ({ onNuevaInvestigacionClick }: InvestigacionesListHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
      <div>
        <h1 className="font-heading text-2xl font-bold md:text-3xl">Investigaciones</h1>
        <p className="mt-1 text-muted-foreground">
          Tus notas de investigación para cada libro
        </p>
      </div>
      <Button 
        onClick={onNuevaInvestigacionClick}
        className="mt-4 md:mt-0"
      >
        <Plus size={18} className="mr-2" />
        Nueva Investigación
      </Button>
    </div>
  );
};
