
import { Upload, FilePlus2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FinanzasToolbarProps {
  onNewRecordClick: () => void;
  periodView: string;
  onPeriodChange: (period: string) => void;
}

export const FinanzasToolbar = ({
  onNewRecordClick,
  periodView,
  onPeriodChange
}: FinanzasToolbarProps) => {
  // Handle period change without causing infinite loops
  const handlePeriodChange = (value: string) => {
    if (value !== periodView) {
      onPeriodChange(value);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <Select 
          value={periodView} 
          onValueChange={handlePeriodChange}
        >
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <SelectValue placeholder="Período" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diario">Vista Diaria</SelectItem>
            <SelectItem value="semanal">Vista Semanal</SelectItem>
            <SelectItem value="mensual">Vista Mensual</SelectItem>
            <SelectItem value="anual">Vista Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Button onClick={onNewRecordClick} variant="outline" size="sm">
          <FilePlus2 size={16} className="mr-2" /> Nuevo registro
        </Button>
      </div>
    </div>
  );
};
