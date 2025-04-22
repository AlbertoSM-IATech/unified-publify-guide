
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { NuevoRegistro } from "../types/finanzasTypes";

interface FinancialRecordFormProps {
  title: string;
  record: NuevoRegistro;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof NuevoRegistro) => void;
  onSubmit: () => void;
}

export const FinancialRecordForm = ({ 
  title,
  record,
  onChange,
  onSubmit
}: FinancialRecordFormProps) => {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Mes</label>
          <Input
            name="mes"
            value={record.mes}
            onChange={(e) => onChange(e, "mes")}
            placeholder="Ej: Julio"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Cantidad (€)</label>
          <Input
            name="cantidad"
            type="number"
            value={record[title === "Registrar Nuevo Gasto" ? "gastos" : "ingresos"]}
            onChange={(e) => onChange(e, title === "Registrar Nuevo Gasto" ? "gastos" : "ingresos")}
            placeholder="0"
          />
        </div>
        <div className="flex items-end">
          <Button onClick={onSubmit} className="w-full">
            <Save size={16} className="mr-2" /> Guardar {title.includes("Gasto") ? "Gasto" : "Ingreso"}
          </Button>
        </div>
      </div>
    </div>
  );
};
