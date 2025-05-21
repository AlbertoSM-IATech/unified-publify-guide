
import { ResponsiveGrid } from "@/components/layout/ResponsiveGrid";
import { Investigacion } from "../../types/investigacionTypes";
import { InvestigacionListCard } from "./InvestigacionListCard";

interface InvestigacionesListGridProps {
  investigaciones: Investigacion[];
  onSelectInvestigacion: (investigacion: Investigacion) => void;
}

export const InvestigacionesListGrid = ({ investigaciones, onSelectInvestigacion }: InvestigacionesListGridProps) => {
  return (
    <ResponsiveGrid 
      columns={{ sm: 1, md: 2, lg: 2, xl: 2 }}
      gap="lg"
      className="mt-6"
    >
      {investigaciones.map(investigacion => (
        <InvestigacionListCard 
          key={investigacion.id} 
          investigacion={investigacion} 
          onSelect={onSelectInvestigacion} 
        />
      ))}
    </ResponsiveGrid>
  );
};
