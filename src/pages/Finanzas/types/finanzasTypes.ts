
import { FixedCost, FixedIncome } from './dataTypes';

export type Transaction = {
  id: number;
  concepto?: string;
  ingresos: number;
  gastos: number;
  beneficio: number;
  observaciones?: string;
  fecha?: Date;
  mes?: string; // Added the mes property to fix the type error
};

export type NuevoRegistro = {
  concepto?: string;
  ingresos: number;
  gastos: number;
  observaciones?: string;
  fecha?: Date;
  mes?: string;
};

export type NuevoCosteFijo = Omit<FixedCost, 'id'>;
export type NuevoIngresoFijo = Omit<FixedIncome, 'id'>;

export type PeriodView = 'diario' | 'semanal' | 'mensual' | 'anual';
