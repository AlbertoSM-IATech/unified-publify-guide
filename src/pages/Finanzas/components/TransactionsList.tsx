
import React, { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Edit2, Trash2, SearchIcon } from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Pagination, PaginationContent, PaginationItem, PaginationLink, 
  PaginationNext, PaginationPrevious 
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "../types/finanzasTypes";

interface TransactionsListProps {
  transactions: Transaction[];
  title: string;
  type: 'ingresos' | 'gastos';
  onEdit: (id: number, data: Partial<Transaction>) => void;
  onDelete: (id: number) => void;
}

export const TransactionsList: React.FC<TransactionsListProps> = ({ 
  transactions, 
  title, 
  type,
  onEdit,
  onDelete 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const { toast } = useToast();
  const itemsPerPage = 50;

  const filteredTransactions = transactions.filter(transaction => 
    format(new Date(transaction.fecha), 'dd/MM/yyyy').includes(filter) || 
    transaction.concepto.toLowerCase().includes(filter.toLowerCase()) ||
    (transaction.observaciones && transaction.observaciones.toLowerCase().includes(filter.toLowerCase()))
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleSaveEdit = () => {
    if (editingTransaction) {
      onEdit(editingTransaction.id, editingTransaction);
      setEditingTransaction(null);
      toast({
        title: "Registro actualizado",
        description: "Los cambios han sido guardados correctamente"
      });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      onDelete(id);
      toast({
        title: "Registro eliminado",
        description: "El registro ha sido eliminado correctamente"
      });
    }
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="relative w-64">
          <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="pl-8"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead className="text-right">Importe (€)</TableHead>
              <TableHead>Observaciones</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(new Date(transaction.fecha), 'dd/MM/yyyy', { locale: es })}
                  </TableCell>
                  <TableCell>{transaction.concepto}</TableCell>
                  <TableCell className="text-right">
                    {type === 'ingresos' 
                      ? `+${transaction.ingresos?.toFixed(2)}` 
                      : `-${transaction.gastos?.toFixed(2)}`
                    }
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {transaction.observaciones || "-"}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(transaction)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No hay transacciones que mostrar
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Registro</DialogTitle>
          </DialogHeader>
          {editingTransaction && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha</label>
                <DatePicker
                  date={new Date(editingTransaction.fecha)}
                  onSelect={(date) => setEditingTransaction(prev => prev ? {
                    ...prev,
                    fecha: date || new Date()
                  } : null)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Concepto</label>
                <Input
                  value={editingTransaction.concepto}
                  onChange={(e) => setEditingTransaction(prev => prev ? {
                    ...prev,
                    concepto: e.target.value
                  } : null)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {type === 'ingresos' ? 'Ingreso' : 'Gasto'} (€)
                </label>
                <Input
                  type="number"
                  value={type === 'ingresos' ? editingTransaction.ingresos : editingTransaction.gastos}
                  onChange={(e) => setEditingTransaction(prev => prev ? {
                    ...prev,
                    [type]: Number(e.target.value)
                  } : null)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Observaciones</label>
                <Input
                  value={editingTransaction.observaciones || ''}
                  onChange={(e) => setEditingTransaction(prev => prev ? {
                    ...prev,
                    observaciones: e.target.value
                  } : null)}
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setEditingTransaction(null)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit}>
                  Guardar cambios
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
