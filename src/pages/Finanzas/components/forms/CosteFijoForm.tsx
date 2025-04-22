
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NuevoCosteFijo } from "../../types/finanzasTypes";
import { Card } from "@/components/ui/card";

interface CosteFijoFormProps {
  costeFijo: NuevoCosteFijo;
  onSubmit: (costeFijo: NuevoCosteFijo) => void;
  onCancel: () => void;
}

export const CosteFijoForm = ({ costeFijo, onSubmit, onCancel }: CosteFijoFormProps) => {
  const [formData, setFormData] = useState<NuevoCosteFijo>(costeFijo);
  
  const handleChange = (field: keyof NuevoCosteFijo, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">
        {costeFijo.concepto ? "Editar Coste Fijo" : "Nuevo Coste Fijo"}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Concepto</label>
            <Input 
              value={formData.concepto} 
              onChange={(e) => handleChange("concepto", e.target.value)}
              placeholder="Nombre del coste fijo"
              required
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Coste (€)</label>
            <Input 
              type="number"
              step="0.01" 
              value={formData.coste} 
              onChange={(e) => handleChange("coste", parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              required
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Frecuencia</label>
            <Select 
              value={formData.frecuencia}
              onValueChange={(value) => handleChange("frecuencia", value as "Mensual" | "Trimestral" | "Anual")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar frecuencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mensual">Mensual</SelectItem>
                <SelectItem value="Trimestral">Trimestral</SelectItem>
                <SelectItem value="Anual">Anual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {costeFijo.concepto ? "Actualizar" : "Guardar"} Coste Fijo
          </Button>
        </div>
      </form>
    </Card>
  );
};
