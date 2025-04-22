
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TransactionSearchProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

export const TransactionSearch = ({ filter, onFilterChange }: TransactionSearchProps) => {
  return (
    <div className="relative w-64">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar..."
        className="pl-8"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
}
