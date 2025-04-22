
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Transaction } from "../types/finanzasTypes";
import { TransactionEditDialog } from "./transactions/TransactionEditDialog";
import { TransactionsTable } from "./transactions/TransactionsTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface TransactionsListProps {
  transactions: Transaction[];
  title: string;
  type: 'ingresos' | 'gastos';
  onEdit: (id: number, data: Partial<Transaction>) => void;
  onDelete: (id: number) => void;
}

export const TransactionsList = ({
  transactions,
  title,
  type,
  onEdit,
  onDelete
}: TransactionsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const itemsPerPage = 50;

  const filteredTransactions = transactions.filter(transaction => {
    if (!transaction) return false;
    
    const conceptoStr = transaction.concepto?.toLowerCase() || "";
    const obsStr = transaction.observaciones?.toLowerCase() || "";
    const filterLower = filter.toLowerCase();
    
    return conceptoStr.includes(filterLower) || obsStr.includes(filterLower);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
  };

  const handleSaveEdit = (updatedTransaction: Transaction) => {
    onEdit(updatedTransaction.id, updatedTransaction);
    setEditingTransaction(null);
  };

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

      <TransactionsTable
        transactions={paginatedTransactions}
        type={type}
        onEdit={handleEdit}
        onDelete={onDelete}
      />

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

      <TransactionEditDialog
        transaction={editingTransaction}
        isOpen={!!editingTransaction}
        onClose={() => setEditingTransaction(null)}
        onSave={handleSaveEdit}
        type={type}
      />
    </div>
  );
};
