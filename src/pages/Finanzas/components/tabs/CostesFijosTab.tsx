
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { NuevoCosteFijo } from "../../types/finanzasTypes";
import { CosteFijoForm } from "../forms/CosteFijoForm";
import { Edit, Trash2 } from "lucide-react";
import { useFinanceData } from "@/data/financesData";
import { useToast } from "@/hooks/use-toast";
import MotionWrapper from "@/components/motion/MotionWrapper";

export const CostesFijosTab = () => {
  const { toast } = useToast();
  const { costesFijos, agregarCosteFijo, editarCosteFijo, eliminarCosteFijo } = useFinanceData();
  const [showForm, setShowForm] = useState(false);
  const [editingCosteFijo, setEditingCosteFijo] = useState<NuevoCosteFijo | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAdd = (costeFijo: NuevoCosteFijo) => {
    agregarCosteFijo(costeFijo);
    toast({
      title: "Coste fijo añadido",
      description: `Se ha añadido ${costeFijo.concepto} correctamente`,
    });
    setShowForm(false);
  };

  const handleUpdate = (costeFijo: NuevoCosteFijo) => {
    if (editingId !== null) {
      editarCosteFijo(editingId, costeFijo);
      toast({
        title: "Coste fijo actualizado",
        description: `Se ha actualizado ${costeFijo.concepto} correctamente`,
      });
      setEditingCosteFijo(null);
      setEditingId(null);
    }
  };

  const handleDelete = (id: number, concepto: string) => {
    eliminarCosteFijo(id);
    toast({
      title: "Coste fijo eliminado",
      description: `Se ha eliminado ${concepto} correctamente`,
    });
  };

  const startEditing = (id: number, costeFijo: NuevoCosteFijo) => {
    setEditingCosteFijo(costeFijo);
    setEditingId(id);
    setShowForm(true);
  };

  const totalMensual = costesFijos.reduce((total, coste) => {
    if (coste.frecuencia === "Mensual") return total + coste.coste;
    if (coste.frecuencia === "Trimestral") return total + (coste.coste / 3);
    if (coste.frecuencia === "Anual") return total + (coste.coste / 12);
    return total;
  }, 0);

  return (
    <div className="space-y-6">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>+ Añadir Coste Fijo</Button>
      ) : (
        <MotionWrapper type="fade">
          <CosteFijoForm 
            costeFijo={editingCosteFijo || { concepto: "", coste: 0, frecuencia: "Mensual" }}
            onSubmit={editingId !== null ? handleUpdate : handleAdd}
            onCancel={() => {
              setShowForm(false);
              setEditingCosteFijo(null);
              setEditingId(null);
            }}
          />
        </MotionWrapper>
      )}

      <div className="rounded-md border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Listado de Costes Fijos</h3>
          <p className="text-sm text-muted-foreground">Total mensual: <span className="font-semibold text-red-500">€{totalMensual.toFixed(2)}</span></p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead>Coste</TableHead>
              <TableHead>Frecuencia</TableHead>
              <TableHead>Equiv. Mensual</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {costesFijos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No hay costes fijos registrados
                </TableCell>
              </TableRow>
            ) : (
              costesFijos.map((coste) => {
                let mensualizado = coste.coste;
                if (coste.frecuencia === "Trimestral") mensualizado = coste.coste / 3;
                if (coste.frecuencia === "Anual") mensualizado = coste.coste / 12;
                
                return (
                  <TableRow key={coste.id}>
                    <TableCell>{coste.concepto}</TableCell>
                    <TableCell className="text-red-500">€{coste.coste.toFixed(2)}</TableCell>
                    <TableCell>{coste.frecuencia}</TableCell>
                    <TableCell className="text-red-500">€{mensualizado.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => startEditing(coste.id, coste)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(coste.id, coste.concepto)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
