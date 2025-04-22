
export interface NuevoRegistro {
  fecha: Date;
  ingresos: number;
  gastos: number;
  concepto?: string;
  observaciones?: string;
}

export interface NuevoCosteFijo {
  concepto: string;
  coste: number;
  frecuencia: "Mensual" | "Trimestral" | "Anual";
}

export interface NuevoIngresoFijo {
  concepto: string;
  cantidad: number;
  frecuencia: "Mensual" | "Trimestral" | "Anual";
}

export interface Transaction {
  id: number;
  fecha: Date;
  concepto: string;
  ingresos?: number;
  gastos?: number;
  observaciones?: string;
}
