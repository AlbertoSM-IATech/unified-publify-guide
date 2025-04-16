
import { GridIcon, List } from "lucide-react";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export const ViewToggle = ({ viewMode, setViewMode }: ViewToggleProps) => {
  return (
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
  );
};
