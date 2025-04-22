
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { NuevoRegistro } from "../types/finanzasTypes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCurrentMonth } from "../utils/dateUtils";

interface FinancialRecordFormProps {
  title: string;
  record: NuevoRegistro;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof NuevoRegistro) => void;
  onSelectChange: (field: keyof NuevoRegistro, value: string) => void;
  onSubmit: () => void;
}

export const FinancialRecordForm = ({ 
  title,
  record,
  onChange,
  onSelectChange,
  onSubmit
}: FinancialRecordFormProps) => {
  const isGasto = title.includes("Gasto");
  
  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

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
          <label className="mb-1 block text-sm font-medium">Mes</label>
          <Select
            value={record.mes || getCurrentMonth()}
            onValueChange={(value) => onSelectChange("mes", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>{month}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
