
import { useState } from "react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { NuevoIngresoFijo } from "../../types/finanzasTypes";
import { IngresoFijoForm } from "../forms/IngresoFijoForm";
import { Edit, Trash2 } from "lucide-react";
import { useFinanceData } from "@/data/financesData";
import { useToast } from "@/hooks/use-toast";
import MotionWrapper from "@/components/motion/MotionWrapper";

export const IngresosFijosTab = () => {
  const { toast } = useToast();
  const { ingresosFijos, agregarIngresoFijo, editarIngresoFijo, eliminarIngresoFijo } = useFinanceData();
  const [showForm, setShowForm] = useState(false);
  const [editingIngresoFijo, setEditingIngresoFijo] = useState<NuevoIngresoFijo | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAdd = (ingresoFijo: NuevoIngresoFijo) => {
    agregarIngresoFijo(ingresoFijo);
    toast({
      title: "Ingreso fijo añadido",
      description: `Se ha añadido ${ingresoFijo.concepto} correctamente`,
    });
    setShowForm(false);
  };

  const handleUpdate = (ingresoFijo: NuevoIngresoFijo) => {
    if (editingId !== null) {
      editarIngresoFijo(editingId, ingresoFijo);
      toast({
        title: "Ingreso fijo actualizado",
        description: `Se ha actualizado ${ingresoFijo.concepto} correctamente`,
      });
      setEditingIngresoFijo(null);
      setEditingId(null);
    }
  };

  const handleDelete = (id: number, concepto: string) => {
    eliminarIngresoFijo(id);
    toast({
      title: "Ingreso fijo eliminado",
      description: `Se ha eliminado ${concepto} correctamente`,
    });
  };

  const startEditing = (id: number, ingresoFijo: NuevoIngresoFijo) => {
    setEditingIngresoFijo(ingresoFijo);
    setEditingId(id);
    setShowForm(true);
  };

  const totalMensual = ingresosFijos.reduce((total, ingreso) => {
    if (ingreso.frecuencia === "Mensual") return total + ingreso.cantidad;
    if (ingreso.frecuencia === "Trimestral") return total + (ingreso.cantidad / 3);
    if (ingreso.frecuencia === "Anual") return total + (ingreso.cantidad / 12);
    return total;
  }, 0);

  return (
    <div className="space-y-6">
      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>+ Añadir Ingreso Fijo</Button>
      ) : (
        <MotionWrapper type="fade">
          <IngresoFijoForm 
            ingresoFijo={editingIngresoFijo || { concepto: "", cantidad: 0, frecuencia: "Mensual" }}
            onSubmit={editingId !== null ? handleUpdate : handleAdd}
            onCancel={() => {
              setShowForm(false);
              setEditingIngresoFijo(null);
              setEditingId(null);
            }}
          />
        </MotionWrapper>
      )}

      <div className="rounded-md border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Listado de Ingresos Fijos</h3>
          <p className="text-sm text-muted-foreground">Total mensual: <span className="font-semibold text-green-500">€{totalMensual.toFixed(2)}</span></p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Concepto</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Frecuencia</TableHead>
              <TableHead>Equiv. Mensual</TableHead>
              <TableHead className="w-24">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingresosFijos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No hay ingresos fijos registrados
                </TableCell>
              </TableRow>
            ) : (
              ingresosFijos.map((ingreso) => {
                let mensualizado = ingreso.cantidad;
                if (ingreso.frecuencia === "Trimestral") mensualizado = ingreso.cantidad / 3;
                if (ingreso.frecuencia === "Anual") mensualizado = ingreso.cantidad / 12;
                
                return (
                  <TableRow key={ingreso.id}>
                    <TableCell>{ingreso.concepto}</TableCell>
                    <TableCell className="text-green-500">€{ingreso.cantidad.toFixed(2)}</TableCell>
                    <TableCell>{ingreso.frecuencia}</TableCell>
                    <TableCell className="text-green-500">€{mensualizado.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => startEditing(ingreso.id, ingreso)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(ingreso.id, ingreso.concepto)}>
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
