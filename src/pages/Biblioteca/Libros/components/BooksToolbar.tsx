
import { useState } from "react";
import { Filter, GridIcon, List, Search, ChevronDown, SortAsc, SortDesc, BookOpen, CalendarDays, Tag } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface BooksToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  sortOrder?: string;
  setSortOrder?: (order: string) => void;
  filterState?: string;
  setFilterState?: (state: string) => void;
  filterContent?: string;
  setFilterContent?: (content: string) => void;
}

export const BooksToolbar = ({ 
  searchQuery, 
  setSearchQuery, 
  viewMode, 
  setViewMode,
  sortOrder = "",
  setSortOrder = () => {},
  filterState = "",
  setFilterState = () => {},
  filterContent = "",
  setFilterContent = () => {}
}: BooksToolbarProps) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  return (
    <div className="mb-6 flex flex-col space-y-4 rounded-lg border bg-card p-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="relative flex-1 md:max-w-md">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search size={16} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          className="w-full rounded-md border border-input bg-background py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Buscar por título, autor, ISBN..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {/* Filters Dropdown */}
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
                className={filterState === "Borrador" ? "bg-muted/50" : ""}
                onClick={() => setFilterState("Borrador")}
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                Borrador
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filterState === "En revisión" ? "bg-muted/50" : ""}
                onClick={() => setFilterState("En revisión")}
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-amber-500"></span>
                En revisión
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filterState === "Publicado" ? "bg-muted/50" : ""}
                onClick={() => setFilterState("Publicado")}
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                Publicado
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filterState === "Archivado" ? "bg-muted/50" : ""}
                onClick={() => setFilterState("Archivado")}
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-red-500"></span>
                Archivado
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            {/* Filter by Content Type */}
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
                className={filterContent === "Alto contenido" ? "bg-muted/50" : ""}
                onClick={() => setFilterContent("Alto contenido")}
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-purple-500"></span>
                Alto contenido
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filterContent === "Medio contenido" ? "bg-muted/50" : ""}
                onClick={() => setFilterContent("Medio contenido")}
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-indigo-500"></span>
                Medio contenido
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filterContent === "Bajo contenido" ? "bg-muted/50" : ""}
                onClick={() => setFilterContent("Bajo contenido")}
              >
                <span className="mr-2 h-2 w-2 rounded-full bg-sky-500"></span>
                Bajo contenido
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm hover:bg-muted">
              {sortOrder.includes("asc") ? (
                <SortAsc size={16} className="mr-2" />
              ) : sortOrder.includes("desc") ? (
                <SortDesc size={16} className="mr-2" />
              ) : (
                <SortAsc size={16} className="mr-2" />
              )}
              Ordenar
              <ChevronDown size={14} className="ml-2" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              className={sortOrder === "titulo_asc" ? "bg-muted/50" : ""}
              onClick={() => setSortOrder("titulo_asc")}
            >
              <BookOpen size={16} className="mr-2" />
              Título (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={sortOrder === "titulo_desc" ? "bg-muted/50" : ""}
              onClick={() => setSortOrder("titulo_desc")}
            >
              <BookOpen size={16} className="mr-2" />
              Título (Z-A)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={sortOrder === "fecha_asc" ? "bg-muted/50" : ""}
              onClick={() => setSortOrder("fecha_asc")}
            >
              <CalendarDays size={16} className="mr-2" />
              Fecha (Antiguo - Nuevo)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={sortOrder === "fecha_desc" ? "bg-muted/50" : ""}
              onClick={() => setSortOrder("fecha_desc")}
            >
              <CalendarDays size={16} className="mr-2" />
              Fecha (Nuevo - Antiguo)
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={sortOrder === "estado_asc" ? "bg-muted/50" : ""}
              onClick={() => setSortOrder("estado_asc")}
            >
              <Tag size={16} className="mr-2" />
              Estado
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* View Toggle */}
        <div className="flex rounded-md border border-input p-1">
          <button
            className={`rounded p-1 ${
              viewMode === "grid" ? "bg-muted" : ""
            }`}
            onClick={() => setViewMode("grid")}
            aria-label="Vista de cuadrícula"
          >
            <GridIcon size={16} />
          </button>
          <button
            className={`rounded p-1 ${
              viewMode === "list" ? "bg-muted" : ""
            }`}
            onClick={() => setViewMode("list")}
            aria-label="Vista de lista"
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
