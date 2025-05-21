
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/common/Button";

interface InvestigacionesListToolbarProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  // onFilterClick: () => void; // Placeholder for future filter functionality
}

export const InvestigacionesListToolbar = ({ 
  searchQuery, 
  onSearchQueryChange,
  // onFilterClick 
}: InvestigacionesListToolbarProps) => {
  return (
    <div className="mb-6 flex flex-col space-y-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="relative flex-1 md:max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={16} className="text-muted-foreground" />
        </div>
        <input 
          type="text" 
          className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
          placeholder="Buscar por título o libro..." 
          value={searchQuery} 
          onChange={e => onSearchQueryChange(e.target.value)} 
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" className="items-center" disabled> {/* Filtro deshabilitado por ahora */}
          <Filter size={16} className="mr-2" />
          Filtros
        </Button>
      </div>
    </div>
  );
};
