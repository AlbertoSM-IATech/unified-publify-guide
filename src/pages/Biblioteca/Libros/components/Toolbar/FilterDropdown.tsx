
import { Filter, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface FilterDropdownProps {
  isFiltersOpen: boolean;
  setIsFiltersOpen: (isOpen: boolean) => void;
  filterState: string;
  setFilterState: (state: string) => void;
  filterContent: string;
  setFilterContent: (content: string) => void;
}

export const FilterDropdown = ({
  isFiltersOpen,
  setIsFiltersOpen,
  filterState,
  setFilterState,
  filterContent,
  setFilterContent
}: FilterDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          className={`inline-flex items-center rounded-md border px-3 py-2 text-sm transition-colors
            ${isFiltersOpen 
              ? 'border-primary bg-primary/10 text-primary' 
              : 'border-input bg-background hover:bg-muted'}`}
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <Filter size={16} className="mr-2" />
          Filtros
          {(filterState || filterContent) && (
            <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.6rem] text-primary-foreground">
              {(filterState ? 1 : 0) + (filterContent ? 1 : 0)}
            </span>
          )}
          <ChevronDown size={14} className="ml-2" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Filter by State */}
        <FilterStateGroup
          filterState={filterState}
          setFilterState={setFilterState}
        />
        
        <DropdownMenuSeparator />
        
        {/* Filter by Content Type */}
        <FilterContentGroup
          filterContent={filterContent}
          setFilterContent={setFilterContent}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface FilterGroupProps {
  filterState: string;
  setFilterState: (state: string) => void;
}

const FilterStateGroup = ({ filterState, setFilterState }: FilterGroupProps) => {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
        Estado
      </DropdownMenuLabel>
      <DropdownMenuItem 
        className={!filterState ? "bg-muted/50" : ""}
        onClick={() => setFilterState("")}
      >
        Todos
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterState === "borrador" ? "bg-muted/50" : ""}
        onClick={() => setFilterState("borrador")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-status-draft"></span> {/* Usando color de Tailwind config */}
        Borrador
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterState === "en revisión" ? "bg-muted/50" : ""}
        onClick={() => setFilterState("en revisión")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-status-review"></span> {/* Usando color de Tailwind config */}
        En revisión
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterState === "publicado" ? "bg-muted/50" : ""}
        onClick={() => setFilterState("publicado")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-status-published"></span> {/* Usando color de Tailwind config */}
        Publicado
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterState === "archivado" ? "bg-muted/50" : ""}
        onClick={() => setFilterState("archivado")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-status-archived"></span> {/* Usando color de Tailwind config */}
        Archivado
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

interface FilterContentGroupProps {
  filterContent: string;
  setFilterContent: (content: string) => void;
}

const FilterContentGroup = ({ filterContent, setFilterContent }: FilterContentGroupProps) => {
  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
        Tipo de contenido
      </DropdownMenuLabel>
      <DropdownMenuItem 
        className={!filterContent ? "bg-muted/50" : ""}
        onClick={() => setFilterContent("")}
      >
        Todos
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterContent === "alto contenido" ? "bg-muted/50" : ""}
        onClick={() => setFilterContent("alto contenido")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-content-high"></span> {/* Actualizado */}
        Alto Contenido
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterContent === "medio contenido" ? "bg-muted/50" : ""}
        onClick={() => setFilterContent("medio contenido")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-content-medium"></span> {/* Actualizado */}
        Medio Contenido
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterContent === "bajo contenido" ? "bg-muted/50" : ""}
        onClick={() => setFilterContent("bajo contenido")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-content-low"></span> {/* Actualizado */}
        Bajo Contenido
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

