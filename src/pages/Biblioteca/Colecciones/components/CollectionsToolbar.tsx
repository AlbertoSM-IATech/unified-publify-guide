
import { Filter, GridIcon, List, Search } from "lucide-react";

interface CollectionsToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}

export const CollectionsToolbar = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange
}: CollectionsToolbarProps) => {
  return (
    <div className="mb-6 flex flex-col space-y-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="relative flex-1 md:max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={16} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Buscar por nombre o descripción..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center space-x-2">
        <button className="inline-flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted">
          <Filter size={16} className="mr-2" />
          Filtros
        </button>
        <div className="flex rounded-md border border-input p-1">
          <button
            className={`rounded p-1 ${
              viewMode === "grid" ? "bg-muted" : ""
            }`}
            onClick={() => onViewModeChange("grid")}
            aria-label="Vista de cuadrícula"
          >
            <GridIcon size={16} />
          </button>
          <button
            className={`rounded p-1 ${
              viewMode === "list" ? "bg-muted" : ""
            }`}
            onClick={() => onViewModeChange("list")}
            aria-label="Vista de lista"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
