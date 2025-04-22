
import { Upload, FilePlus2 } from "lucide-react";

interface FinanzasToolbarProps {
  onNewRecordClick: () => void;
}

export const FinanzasToolbar = ({ onNewRecordClick }: FinanzasToolbarProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <button className="flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted">
        <Upload size={16} className="mr-2" />
        Importar CSV
      </button>
      <button 
        className="flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-muted"
        onClick={onNewRecordClick}
      >
        <FilePlus2 size={16} className="mr-2" />
        Nuevo Registro
      </button>
    </div>
  );
};
