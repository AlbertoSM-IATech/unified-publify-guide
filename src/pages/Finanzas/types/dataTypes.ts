
export interface FinancialRecord {
  id: number;
  mes: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
  concepto?: string;
  observaciones?: string;
  fecha?: Date;
}

export interface FixedCost {
  id: number;
  concepto: string;
  coste: number;
  frecuencia: string;
  fechaInicio: string;
  notas?: string;
}

export interface FixedIncome {
  id: number;
  concepto: string;
  cantidad: number;
  frecuencia: string;
  fechaInicio: string;
  notas?: string;
}
