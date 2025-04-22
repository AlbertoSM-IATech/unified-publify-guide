
import { FinancialRecord } from "@/data/financesData";
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
        observaciones: record.observaciones
      };
    });
};
