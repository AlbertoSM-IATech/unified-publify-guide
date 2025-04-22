
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Transaction } from "../../types/finanzasTypes";

interface TransactionEditDialogProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  type: 'ingresos' | 'gastos';
}

export const TransactionEditDialog = ({
  transaction,
  isOpen,
  onClose,
  onSave,
  type
}: TransactionEditDialogProps) => {
  if (!transaction) return null;

  const handleSave = () => {
    onSave(transaction);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Registro</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Fecha</label>
            <DatePicker
              date={new Date(transaction.fecha)}
              onSelect={(date) => transaction && date && onSave({
                ...transaction,
                fecha: date
              })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Concepto</label>
            <Input
              value={transaction.concepto}
              onChange={(e) => onSave({
                ...transaction,
                concepto: e.target.value
              })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {type === 'ingresos' ? 'Ingreso' : 'Gasto'} (€)
            </label>
            <Input
              type="number"
              value={type === 'ingresos' ? transaction.ingresos : transaction.gastos}
              onChange={(e) => onSave({
                ...transaction,
                [type]: Number(e.target.value)
              })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Observaciones</label>
            <Input
              value={transaction.observaciones || ''}
              onChange={(e) => onSave({
                ...transaction,
                observaciones: e.target.value
              })}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
