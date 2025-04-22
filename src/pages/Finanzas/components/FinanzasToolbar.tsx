
import { Upload, FilePlus2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FinanzasToolbarProps {
  onNewRecordClick: () => void;
}

export const FinanzasToolbar = ({
  onNewRecordClick
}: FinanzasToolbarProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <Button variant="outline" onClick={onNewRecordClick} className="flex items-center gap-2">
        <FilePlus2 size={16} />
        Nuevo Registro
      </Button>
      
      <Button variant="outline" className="flex items-center">
        <Upload size={16} className="mr-2" />
        Importar CSV
      </Button>
    </div>
  );
};
