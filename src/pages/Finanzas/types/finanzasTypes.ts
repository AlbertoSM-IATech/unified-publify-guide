
export interface NuevoRegistro {
  mes: string;
  ingresos: number;
  gastos: number;
}

export interface NuevoCosteFijo {
  concepto: string;
  coste: number;
  frecuencia: "Mensual" | "Trimestral" | "Anual";
}
