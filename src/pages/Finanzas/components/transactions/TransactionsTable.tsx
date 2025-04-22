
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Transaction } from "../../types/finanzasTypes";
import { formatTransactionDate } from "../../utils/dateUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TransactionsTableProps {
  transactions: Transaction[];
  type: 'ingresos' | 'gastos';
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

export const TransactionsTable = ({
  transactions,
  type,
  onEdit,
  onDelete
}: TransactionsTableProps) => {
  return (
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
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {formatTransactionDate(transaction.fecha)}
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
                    onClick={() => onEdit(transaction)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(transaction.id)}
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
  );
};
