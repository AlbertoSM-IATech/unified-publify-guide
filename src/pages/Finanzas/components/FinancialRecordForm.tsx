
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { DatePicker } from "@/components/ui/date-picker";
import { NuevoRegistro } from "../types/finanzasTypes";

interface FinancialRecordFormProps {
  title: string;
  record: NuevoRegistro;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof NuevoRegistro) => void;
  onDateChange: (date: Date) => void;
  onSubmit: () => void;
}

export const FinancialRecordForm = ({ 
  title,
  record,
  onChange,
  onDateChange,
  onSubmit
}: FinancialRecordFormProps) => {
  const isGasto = title.includes("Gasto");
  
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Concepto</label>
          <Input
            name="concepto"
            value={record.concepto || ""}
            onChange={(e) => onChange(e, "concepto")}
            placeholder="Concepto del registro"
            required
          />
        </div>
        
        <div>
          <label className="mb-1 block text-sm font-medium">Fecha</label>
          <DatePicker
            date={record.fecha}
            onSelect={(date) => onDateChange(date || new Date())}
          />
        </div>
        
        <div>
          <label className="mb-1 block text-sm font-medium">Cantidad (€)</label>
          <Input
            name="cantidad"
            type="number"
            step="0.01"
            value={record[isGasto ? "gastos" : "ingresos"]}
            onChange={(e) => onChange(e, isGasto ? "gastos" : "ingresos")}
            placeholder="0.00"
            required
          />
        </div>
        
        <div>
          <label className="mb-1 block text-sm font-medium">Observaciones</label>
          <Textarea
            name="observaciones"
            value={record.observaciones || ""}
            onChange={(e) => onChange(e, "observaciones")}
            placeholder="Detalles adicionales (opcional)"
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button onClick={onSubmit} className="w-auto">
          <Save size={16} className="mr-2" /> Guardar {isGasto ? "Gasto" : "Ingreso"}
        </Button>
      </div>
    </div>
  );
};
