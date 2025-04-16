
import { SortAsc, SortDesc, ChevronDown, BookOpen, CalendarDays, Tag } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

interface SortDropdownProps {
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

export const SortDropdown = ({ sortOrder, setSortOrder }: SortDropdownProps) => {
  return (
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
  );
};
