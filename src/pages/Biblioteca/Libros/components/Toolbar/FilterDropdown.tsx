
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
        <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
        Borrador
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterState === "en_edicion" ? "bg-muted/50" : ""}
        onClick={() => setFilterState("en_edicion")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
        En revisión
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterState === "publicado" ? "bg-muted/50" : ""}
        onClick={() => setFilterState("publicado")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
        Publicado
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterState === "pausado" ? "bg-muted/50" : ""}
        onClick={() => setFilterState("pausado")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
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
        className={filterContent === "hardcover" ? "bg-muted/50" : ""}
        onClick={() => setFilterContent("hardcover")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
        Tapa dura
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterContent === "paperback" ? "bg-muted/50" : ""}
        onClick={() => setFilterContent("paperback")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
        Tapa blanda
      </DropdownMenuItem>
      <DropdownMenuItem 
        className={filterContent === "ebook" ? "bg-muted/50" : ""}
        onClick={() => setFilterContent("ebook")}
      >
        <span className="mr-2 h-2 w-2 rounded-full bg-sky-500"></span>
        eBook
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};
