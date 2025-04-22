
export interface FinancialRecord {
  id: number;
  mes: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
  concepto?: string;
  observaciones?: string;
}

export interface CosteFijo {
  id: number;
  concepto: string;
  coste: number;
  frecuencia: "Mensual" | "Trimestral" | "Anual";
}

export interface IngresoFijo {
  id: number;
  concepto: string;
  cantidad: number;
  frecuencia: "Mensual" | "Trimestral" | "Anual";
}
