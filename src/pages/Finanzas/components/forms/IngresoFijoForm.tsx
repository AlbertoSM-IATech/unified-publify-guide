
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NuevoIngresoFijo } from "../../types/finanzasTypes";
import { Card } from "@/components/ui/card";

interface IngresoFijoFormProps {
  ingresoFijo: NuevoIngresoFijo;
  onSubmit: (ingresoFijo: NuevoIngresoFijo) => void;
  onCancel: () => void;
}

export const IngresoFijoForm = ({ ingresoFijo, onSubmit, onCancel }: IngresoFijoFormProps) => {
  const [formData, setFormData] = useState<NuevoIngresoFijo>(ingresoFijo);
  
  const handleChange = (field: keyof NuevoIngresoFijo, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-4 mb-6">
      <h3 className="text-lg font-medium mb-4">
        {ingresoFijo.concepto ? "Editar Ingreso Fijo" : "Nuevo Ingreso Fijo"}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-sm font-medium">Concepto</label>
            <Input 
              value={formData.concepto} 
              onChange={(e) => handleChange("concepto", e.target.value)}
              placeholder="Nombre del ingreso fijo"
              required
            />
          </div>
          
          <div>
            <label className="mb-1 block text-sm font-medium">Cantidad (€)</label>
            <Input 
              type="number"
              step="0.01" 
              value={formData.cantidad} 
              onChange={(e) => handleChange("cantidad", parseFloat(e.target.value) || 0)}
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
            {ingresoFijo.concepto ? "Actualizar" : "Guardar"} Ingreso Fijo
          </Button>
        </div>
      </form>
    </Card>
  );
};
