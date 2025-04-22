
import { FinancialRecord } from "../types/dataTypes";
import { Transaction } from "../types/finanzasTypes";
import { isValid } from "date-fns";

export const mapRecordsToTransactions = (records: FinancialRecord[]): Transaction[] => {
  return records
    .filter(record => record && record.id)
    .map(record => {
      let fecha: Date;
      try {
        fecha = new Date(record.mes);
        if (!isValid(fecha)) {
          const currentYear = new Date().getFullYear();
          const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
          ];
          const monthIndex = months.findIndex(m => m === record.mes);
          fecha = monthIndex !== -1 ? 
            new Date(currentYear, monthIndex, 1) : 
            new Date();
        }
      } catch (e) {
        console.error("Error parsing date:", e, record.mes);
        fecha = new Date();
      }

      return {
        id: record.id,
        fecha: fecha,
        concepto: record.concepto || "Sin concepto",
        ingresos: record.ingresos,
        gastos: record.gastos,
        observaciones: record.observaciones,
        mes: record.mes, // Ensure mes is included
        beneficio: record.beneficio
      };
    });
};

// Update the function to handle the mes property correctly
export const mapTransactionsToRecords = (transactions: Transaction[]): FinancialRecord[] => {
  return transactions.map(transaction => {
    // Extract month name from fecha if available, or use mes if provided, or default to current month
    let monthName = "";
    if (transaction.fecha) {
      const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      monthName = months[transaction.fecha.getMonth()];
    } else if (transaction.mes) {
      monthName = transaction.mes;
    } else {
      const currentDate = new Date();
      const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      monthName = months[currentDate.getMonth()];
    }

    return {
      id: transaction.id,
      mes: monthName,
      ingresos: transaction.ingresos || 0,
      gastos: transaction.gastos || 0,
      beneficio: (transaction.ingresos || 0) - (transaction.gastos || 0),
      concepto: transaction.concepto,
      observaciones: transaction.observaciones,
      fecha: transaction.fecha
    };
  });
};
